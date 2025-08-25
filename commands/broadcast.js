const fs = require('fs');
const path = require('path');
const settings = require('../settings');

// Store broadcast lists
const BROADCAST_FILE = './data/broadcast.json';

async function broadcastCommand(sock, chatId, message) {
    try {
        // Verify owner (only owner can broadcast)
        const ownerNumber = settings.ownerNumber.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
        const sender = message.key.participant || message.key.remoteJid;
        
        if (sender !== ownerNumber) {
            return sock.sendMessage(chatId, {
                text: '❌ Only the bot owner can use broadcast!'
            });
        }

        // Load broadcast lists
        let broadcastData = {};
        try {
            broadcastData = JSON.parse(fs.readFileSync(BROADCAST_FILE));
        } catch {
            broadcastData = { lists: {} };
        }

        const args = message.message?.extendedTextMessage?.text?.split(' ') || 
                    message.message?.conversation?.split(' ') || [];
        const subcmd = args[1]?.toLowerCase();

        // Handle subcommands
        switch(subcmd) {
            case 'list':
                return showBroadcastLists(sock, chatId, broadcastData);
                
            case 'create':
                return createBroadcastList(sock, chatId, args, broadcastData);
                
            case 'add':
                return addToBroadcastList(sock, chatId, message, broadcastData);
                
            case 'send':
                return sendBroadcast(sock, chatId, message, broadcastData);
                
            default:
                return showUsage(sock, chatId);
        }
    } catch (error) {
        console.error('Broadcast error:', error);
        return sock.sendMessage(chatId, {
            text: '❌ Broadcast failed: ' + error.message
        });
    }
}

// Helper functions
async function showUsage(sock, chatId) {
    const text = `📢 *Broadcast Commands*\n\n` +
                 `.broadcast list - Show all lists\n` +
                 `.broadcast create <name> - Create new list\n` +
                 `.broadcast add <list> @user - Add user to list\n` +
                 `.broadcast send <list> <message> - Send to list\n\n` +
                 `Example:\n.broadcast send premium "Sale starts today!"`;
    
    await sock.sendMessage(chatId, { text });
}

async function showBroadcastLists(sock, chatId, data) {
    if (!data.lists || Object.keys(data.lists).length === 0) {
        return sock.sendMessage(chatId, { text: 'No broadcast lists created yet!' });
    }

    let text = '📋 *Your Broadcast Lists*\n\n';
    for (const [name, list] of Object.entries(data.lists)) {
        text += `• ${name} (${list.members.length} recipients)\n`;
    }

    await sock.sendMessage(chatId, { text });
}

async function createBroadcastList(sock, chatId, args, data) {
    const listName = args[2];
    if (!listName) {
        return sock.sendMessage(chatId, { text: '❌ Please specify list name' });
    }

    data.lists[listName] = data.lists[listName] || { members: [] };
    fs.writeFileSync(BROADCAST_FILE, JSON.stringify(data, null, 2));
    
    await sock.sendMessage(chatId, { 
        text: `✅ Created broadcast list "${listName}"` 
    });
}

async function addToBroadcastList(sock, chatId, message, data) {
    const args = message.message.extendedTextMessage.text.split(' ');
    const listName = args[2];
    const mentioned = message.message.extendedTextMessage.contextInfo?.mentionedJid || [];

    if (!listName || mentioned.length === 0) {
        return sock.sendMessage(chatId, { 
            text: '❌ Usage: .broadcast add <list> @user1 @user2' 
        });
    }

    if (!data.lists[listName]) {
        return sock.sendMessage(chatId, { 
            text: `❌ List "${listName}" doesn't exist!` 
        });
    }

    // Add new members (avoid duplicates)
    const existing = new Set(data.lists[listName].members);
    const newMembers = mentioned.filter(jid => !existing.has(jid));
    
    data.lists[listName].members.push(...newMembers);
    fs.writeFileSync(BROADCAST_FILE, JSON.stringify(data, null, 2));
    
    await sock.sendMessage(chatId, { 
        text: `✅ Added ${newMembers.length} members to "${listName}"`,
        mentions: newMembers
    });
}

async function sendBroadcast(sock, chatId, message, data) {
    const quoted = message.message.extendedTextMessage?.contextInfo?.quotedMessage;
    const args = message.message.extendedTextMessage.text.split(' ');
    const listName = args[2];
    const broadcastMessage = args.slice(3).join(' ') || 
                           quoted?.conversation || 
                           quoted?.extendedTextMessage?.text;

    if (!listName || !broadcastMessage) {
        return sock.sendMessage(chatId, { 
            text: '❌ Usage: .broadcast send <list> <message> or reply to a message' 
        });
    }

    if (!data.lists[listName]) {
        return sock.sendMessage(chatId, { 
            text: `❌ List "${listName}" doesn't exist!` 
        });
    }

    const recipients = data.lists[listName].members;
    if (recipients.length === 0) {
        return sock.sendMessage(chatId, { 
            text: `❌ List "${listName}" is empty!` 
        });
    }

    // Send with progress
    await sock.sendMessage(chatId, { 
        text: `📤 Sending to ${recipients.length} recipients...` 
    });

    let success = 0;
    for (const jid of recipients) {
        try {
            await sock.sendMessage(jid, { 
                text: `📢 *Broadcast*\n\n${broadcastMessage}` 
            });
            success++;
        } catch (error) {
            console.error(`Failed to send to ${jid}:`, error);
        }
    }

    await sock.sendMessage(chatId, { 
        text: `✅ Broadcast complete!\n\n` +
              `• Success: ${success}\n` +
              `• Failed: ${recipients.length - success}` 
    });
}

module.exports = broadcastCommand;