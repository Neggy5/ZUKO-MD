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
        const { from, sender, reply, react, isGroup, isAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Get quoted message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        if (!quotedMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＭＥＳＳＡＧＥ ＲＥＰＬＩＥＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ 1️⃣ Reply to a bot message\n` +
                      `┃ 2️⃣ Type: ${prefix}delete\n` +
                      `┃\n` +
                      `┃ *Permissions:*\n` +
                      `┃ • Delete own messages\n` +
                      `┃ • Admins can delete any bot message\n` +
                      `┃ • Owner can delete any bot message\n` +
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
        
        // Check if the message is from the bot
        const isBotMessage = quotedMsg.key?.fromMe === true;
        
        if (!isBotMessage) {
            await reply('❌ You can only delete bot messages!');
            return;
        }
        
        // Check permissions
        const userIsAdmin = await isAdmin;
        const isMessageSender = quotedMsg.key?.participant === sender || quotedMsg.key?.remoteJid === sender;
        
        if (!isMessageSender && !userIsAdmin && !isOwner) {
            await reply('❌ You can only delete your own messages or need admin permission!');
            return;
        }
        
        await react('🗑️');
        
        try {
            // Delete the message
            await sock.sendMessage(from, { delete: quotedMsg.key });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＭＥＳＳＡＧＥ ＤＥＬＥＴＥＤ* ✅\n\n` +
                      `The message has been successfully deleted.\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🗑️ DELETE AGAIN', id: 'delete', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('Delete error:', error);
            await reply(`❌ Failed to delete message: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};