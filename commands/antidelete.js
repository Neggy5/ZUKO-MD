/**
 * Anti-Delete Command - Detect and log deleted messages
 * ES Module version with button support
 * Works for both private chats and groups
 * Forwards deleted messages to bot owner
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';
import config from '../config.js';

// Store recent messages to detect deletions
const messageCache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default {
    name: 'antidelete',
    description: 'Detect and log deleted messages (forwards to owner)',
    aliases: ['ad', 'antidel', 'detectdelete'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isAdmin, isOwner } = context;
        const buttons = new ButtonManager(sock);
        
        // Get current settings
        const groupSettings = database.getGroupSettings(from);
        const isEnabled = groupSettings.antidelete || false;
        
        // Parse command args
        const action = args[0]?.toLowerCase();
        
        // For groups: only admins can change settings
        // For private chats: always allowed (only owner usually)
        if (isGroup) {
            const userIsAdmin = await isAdmin;
            if (!userIsAdmin && !isOwner) {
                return reply('❌ Only group admins can use this command in groups!');
            }
        }
        
        if (action === 'on' || action === 'enable') {
            // Enable antidelete
            database.updateGroupSettings(from, { antidelete: true });
            
            const mode = isGroup ? 'group' : 'private chat';
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＮＴＩ-ＤＥＬＥＴＥ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📍 *Mode:* ${isGroup ? 'ＧＲＯＵＰ' : 'ＰＲＩＶＡＴＥ ＣＨＡＴ'}\n` +
                      `┃\n` +
                      `┃ 🔍 Deleted messages will be:\n` +
                      `┃ • Logged in this ${mode}\n` +
                      `┃ • Forwarded to bot owner\n` +
                      `┃ • Sender will be mentioned\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⚙️ SETTINGS', id: 'antidelete_settings', type: 'reply' },
                    { text: '❌ DISABLE', id: 'antidelete_off', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            // Disable antidelete
            database.updateGroupSettings(from, { antidelete: false });
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＮＴＩ-ＤＥＬＥＴＥ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🔍 Deleted messages will no longer be tracked\n` +
                      `┃ in this ${isGroup ? 'group' : 'chat'}.\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'antidelete_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'settings') {
            // Show current settings
            await buttons.sendButtons(from, {
                text: `⚙️ *ＡＮＴＩ-ＤＥＬＥＴＥ ＳＥＴＴＩＮＧＳ* ⚙️\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📍 *Location:* ${isGroup ? 'ＧＲＯＵＰ' : 'ＰＲＩＶＡＴＥ ＣＨＡＴ'}\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃ ⏱️ *Cache TTL:* ${CACHE_TTL / 1000} seconds\n` +
                      `┃ 📤 *Forward to:* Bot Owner\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `*Commands:*\n` +
                      `• .antidelete on - Enable detection\n` +
                      `• .antidelete off - Disable detection\n` +
                      `• .antidelete settings - Show this menu`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antidelete_off' : 'antidelete_on', type: 'reply' },
                    { text: '📊 VIEW LOGS', id: 'antidelete_logs', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show current status
            await buttons.sendButtons(from, {
                text: `🛡️ *ＡＮＴＩ-ＤＥＬＥＴＥ ＰＲＯＴＥＣＴＩＯＮ* 🛡️\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📍 *Location:* ${isGroup ? 'ＧＲＯＵＰ' : 'ＰＲＩＶＡＴＥ ＣＨＡＴ'}\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                      `┃\n` +
                      `┃ 🔍 *What it does:*\n` +
                      `┃ • Detects deleted messages\n` +
                      `┃ • Shows who deleted what\n` +
                      `┃ • Forwards to bot owner\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `*Commands:*\n` +
                      `• .antidelete on - Enable\n` +
                      `• .antidelete off - Disable\n` +
                      `• .antidelete settings - Configure`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antidelete_off' : 'antidelete_on', type: 'reply' },
                    { text: '⚙️ SETTINGS', id: 'antidelete_settings', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
        }
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false, // Changed to false - works in private chats too
    adminOnly: false, // Changed to false - handled internally
    botAdminNeeded: false
};

// Export message cache for use in handler
export { messageCache };