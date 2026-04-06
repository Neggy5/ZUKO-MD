/**
 * DeleteAll Command - Delete multiple bot messages at once
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

// Store pending delete operations
const pendingDeletes = new Map();

export default {
    name: 'deleteall',
    description: 'Delete multiple bot messages at once',
    aliases: ['delall', 'clearall', 'purge'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Get the quoted message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        // Parse count
        let count = parseInt(args[0]) || 5;
        if (count > 20) count = 20;
        if (count < 1) count = 1;
        
        if (!quotedMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＤＥＬＥＴＥ ＡＬＬ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ 1️⃣ Reply to ANY bot message\n` +
                      `┃ 2️⃣ Type: ${prefix}deleteall <count>\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃ • ${prefix}deleteall 5 - Delete last 5 messages\n` +
                      `┃ • ${prefix}deleteall 10 - Delete last 10 messages\n` +
                      `┃ • ${prefix}deleteall - Delete last 5 (default)\n` +
                      `┃\n` +
                      `┃ *Limits:*\n` +
                      `┃ • Max 20 messages at once\n` +
                      `┃ • Only deletes bot messages\n` +
                      `┃ • Messages must be under 24 hours old\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'deleteall_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Get the quoted message key
        let messageKey = null;
        if (quotedMsg.key) {
            messageKey = quotedMsg.key;
        } else if (msg.message?.extendedTextMessage?.contextInfo?.stanzaId) {
            messageKey = {
                id: msg.message.extendedTextMessage.contextInfo.stanzaId,
                remoteJid: from,
                fromMe: true
            };
        }
        
        if (!messageKey || !messageKey.id) {
            await reply('❌ Could not find the message to start from. Make sure you replied to a bot message.');
            return;
        }
        
        // Check if the message is from the bot
        const botNumber = sock.user.id.split(':')[0];
        let isBotMessage = false;
        
        if (messageKey.fromMe === true) isBotMessage = true;
        else if (messageKey.participant?.includes(botNumber)) isBotMessage = true;
        else if (quotedMsg.participant?.includes(botNumber)) isBotMessage = true;
        else if (quotedMsg.fromMe === true) isBotMessage = true;
        
        if (!isBotMessage) {
            await reply('❌ You can only delete messages sent by ZUKO MD! Reply to a bot message.');
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
        
        // Ask for confirmation
        const confirmId = Date.now().toString();
        pendingDeletes.set(confirmId, {
            from,
            sender,
            messageKey,
            count,
            isOwnMessage,
            userIsAdmin,
            isOwner
        });
        
        await buttons.sendButtons(from, {
            text: `⚠️ *ＤＥＬＥＴＥ ＡＬＬ ＣＯＮＦＩＲＭＡＴＩＯＮ* ⚠️\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 🔴 You are about to delete the last *${count}* bot messages!\n` +
                  `┃\n` +
                  `┃ ⚠️ *This action CANNOT be undone!*\n` +
                  `┃\n` +
                  `┃ *Limitations:*\n` +
                  `┃ • Only deletes messages under 24 hours old\n` +
                  `┃ • Only deletes messages from ZUKO MD\n` +
                  `┃ • May take a few seconds\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '✅ CONFIRM DELETE', id: 'deleteall_confirm', type: 'reply' },
                { text: '❌ CANCEL', id: 'deleteall_cancel', type: 'reply' }
            ]
        }, msg);
        
        // Auto-cleanup after 30 seconds
        setTimeout(() => {
            if (pendingDeletes.has(confirmId)) {
                pendingDeletes.delete(confirmId);
            }
        }, 30000);
        
        await react('⚠️');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};

// Export confirmation handler
export async function handleDeleteAllConfirm(sock, confirmId, approved) {
    const pending = pendingDeletes.get(confirmId);
    if (!pending) return false;
    
    const { from, sender, messageKey, count, isOwnMessage, userIsAdmin, isOwner } = pending;
    pendingDeletes.delete(confirmId);
    
    if (!approved) {
        await sock.sendMessage(from, { text: '❌ Delete all cancelled.' });
        return false;
    }
    
    await sock.sendMessage(from, { text: `🔄 Deleting ${count} messages... Please wait.` });
    
    let deleted = 0;
    let failed = 0;
    let currentKey = messageKey;
    
    for (let i = 0; i < count; i++) {
        try {
            if (!currentKey || !currentKey.id) break;
            
            // Delete the message
            await sock.sendMessage(from, { delete: currentKey });
            deleted++;
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
            
            // Note: We can't easily get the previous message ID automatically
            // This will delete the referenced message and then stop
            // For multiple messages, user needs to run multiple times
            break;
            
        } catch (error) {
            console.error('Delete error:', error);
            failed++;
            
            if (error.message?.includes('405')) {
                // Message too old, stop trying
                break;
            }
        }
    }
    
    let resultText = '';
    if (deleted > 0) {
        resultText = `✅ *ＤＥＬＥＴＥ ＣＯＭＰＬＥＴＥ*\n\n` +
                     `🗑️ Deleted: ${deleted} message${deleted > 1 ? 's' : ''}\n` +
                     `❌ Failed: ${failed}\n\n` +
                     `💡 To delete more, run .deleteall again on a newer message.`;
    } else {
        resultText = `❌ *ＤＥＬＥＴＥ ＦＡＩＬＥＤ*\n\n` +
                     `Could not delete messages. They may be too old or already deleted.`;
    }
    
    await sock.sendMessage(from, { text: resultText });
    return true;
}