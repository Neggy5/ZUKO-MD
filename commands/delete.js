/**
 * Delete Command - Delete bot's own messages
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'delete',
    description: 'Delete bot\'s own messages',
    aliases: ['del', 'remove', 'rm'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Get the quoted message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        if (!quotedMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＤＥＬＥＴＥ ＣＯＭＭＡＮＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ 1️⃣ LONG PRESS on a bot message\n` +
                      `┃ 2️⃣ Tap "REPLY"\n` +
                      `┃ 3️⃣ Type: ${prefix}delete\n` +
                      `┃ 4️⃣ Send\n` +
                      `┃\n` +
                      `┃ *Permissions:*\n` +
                      `┃ • Delete your own bot messages\n` +
                      `┃ • Admins can delete any bot message\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'delete_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Extract the message key correctly
        let messageKey = null;
        
        // Method 1: Direct key from quoted message
        if (quotedMsg.key) {
            messageKey = quotedMsg.key;
        }
        // Method 2: Build key from stanzaId
        else if (msg.message?.extendedTextMessage?.contextInfo?.stanzaId) {
            messageKey = {
                id: msg.message.extendedTextMessage.contextInfo.stanzaId,
                remoteJid: from,
                fromMe: true
            };
        }
        // Method 3: Build key from quoted message id
        else if (quotedMsg.id) {
            messageKey = {
                id: quotedMsg.id,
                remoteJid: from,
                fromMe: true
            };
        }
        
        if (!messageKey || !messageKey.id) {
            await reply('❌ Could not find the message to delete. Make sure you replied to a bot message.');
            return;
        }
        
        // Make sure remoteJid is set
        if (!messageKey.remoteJid) {
            messageKey.remoteJid = from;
        }
        
        // Get bot's JID
        const botJid = sock.user.id;
        const botNumber = botJid.split(':')[0];
        
        // Check if the message is from the bot
        let isBotMessage = false;
        
        // Check by fromMe flag
        if (messageKey.fromMe === true) {
            isBotMessage = true;
        }
        // Check by participant
        else if (messageKey.participant && messageKey.participant.includes(botNumber)) {
            isBotMessage = true;
        }
        // Check by remoteJid
        else if (messageKey.remoteJid && messageKey.remoteJid.includes(botNumber)) {
            isBotMessage = true;
        }
        // Check quoted message sender
        else if (quotedMsg.participant && quotedMsg.participant.includes(botNumber)) {
            isBotMessage = true;
        }
        // Check if the quoted message has fromMe flag
        else if (quotedMsg.fromMe === true) {
            isBotMessage = true;
        }
        
        if (!isBotMessage) {
            await reply('❌ You can only delete messages sent by ZUKO MD!');
            return;
        }
        
        // Check permissions
        const userIsAdmin = await isAdmin;
        const msgSender = messageKey.participant || messageKey.remoteJid || quotedMsg.participant;
        const isOwnMessage = msgSender === sender;
        
        if (!isOwnMessage && !userIsAdmin && !isOwner) {
            await reply('❌ You can only delete your own messages or need admin permission!');
            return;
        }
        
        await react('🗑️');
        
        try {
            // Delete the message
            await sock.sendMessage(from, { delete: messageKey });
            
            await reply('✅ Message deleted successfully!');
            await react('✅');
            
        } catch (error) {
            console.error('Delete error:', error);
            
            let errorMsg = error.message;
            if (errorMsg.includes('405')) {
                errorMsg = 'Message is too old (older than 24 hours)';
            } else if (errorMsg.includes('403')) {
                errorMsg = 'Permission denied';
            } else {
                errorMsg = 'Could not delete message. It may have been deleted already.';
            }
            
            await reply(`❌ Failed: ${errorMsg}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};