/**
 * Anti-Sticker Command - Block stickers in groups
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';

export default {
    name: 'antisticker',
    description: 'Block stickers in the group',
    aliases: ['nosticker', 'blocksticker', 'antistick'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Check if in group
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        // Check admin permission
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can use this command!');
            return;
        }
        
        // Get current settings
        const groupSettings = database.getGroupSettings(from);
        const isEnabled = groupSettings.antisticker || false;
        
        // Parse command args
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            // Enable antisticker
            database.updateGroupSettings(from, { antisticker: true });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＮＴＩ-ＳＴＩＣＫＥＲ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🚫 Stickers will be deleted automatically\n` +
                      `┃\n` +
                      `┃ *What gets blocked:*\n` +
                      `┃ • All stickers\n` +
                      `┃ • Animated stickers\n` +
                      `┃ • Static stickers\n` +
                      `┃\n` +
                      `┃ *Admins are exempt*\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '❌ DISABLE', id: 'antisticker_off', type: 'reply' },
                    { text: '📋 STATUS', id: 'antisticker_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            // Disable antisticker
            database.updateGroupSettings(from, { antisticker: false });
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＮＴＩ-ＳＴＩＣＫＥＲ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Stickers will no longer be blocked\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'antisticker_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'status') {
            // Show current status
            await buttons.sendButtons(from, {
                text: `📋 *ＡＮＴＩ-ＳＴＩＣＫＥＲ ＳＴＡＴＵＳ* 📋\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}antisticker on - Enable\n` +
                      `┃ • ${prefix}antisticker off - Disable\n` +
                      `┃ • ${prefix}antisticker status - Show this\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antisticker_off' : 'antisticker_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show main menu
            await buttons.sendButtons(from, {
                text: `🚫 *ＡＮＴＩ-ＳＴＩＣＫＥＲ* 🚫\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}antisticker on - Enable\n` +
                      `┃ • ${prefix}antisticker off - Disable\n` +
                      `┃ • ${prefix}antisticker status - Check\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antisticker_off' : 'antisticker_on', type: 'reply' },
                    { text: '📋 STATUS', id: 'antisticker_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
        }
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: false
};