/**
 * Anti-Link Command - Block WhatsApp group links and other URLs
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';

export default {
    name: 'antilink',
    description: 'Block WhatsApp group links and other URLs',
    aliases: ['al', 'linkblock', 'blocklink', 'antilink'],
    
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
        const isEnabled = groupSettings.antilink || false;
        const currentAction = groupSettings.antilinkAction || 'delete';
        
        // Parse command args
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            // Enable antilink
            database.updateGroupSettings(from, { antilink: true });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＮＴＩ-ＬＩＮＫ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🔗 WhatsApp group links will be blocked\n` +
                      `┃\n` +
                      `┃ *Action:* ${currentAction === 'kick' ? '🔨 KICK' : '🗑️ DELETE'}\n` +
                      `┃\n` +
                      `┃ *Blocked patterns:*\n` +
                      `┃ • chat.whatsapp.com\n` +
                      `┃ • WhatsApp group invites\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⚙️ CHANGE ACTION', id: 'antilink_action', type: 'reply' },
                    { text: '❌ DISABLE', id: 'antilink_off', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            // Disable antilink
            database.updateGroupSettings(from, { antilink: false });
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＮＴＩ-ＬＩＮＫ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Links will no longer be blocked\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'antilink_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'action') {
            // Show action selection menu
            await buttons.sendButtons(from, {
                text: `⚙️ *ＡＮＴＩ-ＬＩＮＫ ＡＣＴＩＯＮ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Current Action:* ${currentAction.toUpperCase()}\n` +
                      `┃\n` +
                      `┃ *Select new action:*\n` +
                      `┃\n` +
                      `┃ 🗑️ *DELETE* - Only delete the message\n` +
                      `┃ 🔨 *KICK* - Delete AND kick user\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🗑️ DELETE', id: 'antilink_action_delete', type: 'reply' },
                    { text: '🔨 KICK', id: 'antilink_action_kick', type: 'reply' },
                    { text: '⬅️ BACK', id: 'antilink_settings', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'settings' || action === 'status') {
            // Show current settings
            const actionIcon = currentAction === 'kick' ? '🔨' : '🗑️';
            const actionName = currentAction === 'kick' ? 'KICK' : 'DELETE';
            
            await buttons.sendButtons(from, {
                text: `⚙️ *ＡＮＴＩ-ＬＩＮＫ ＳＥＴＴＩＮＧＳ* ⚙️\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃ ${actionIcon} *Action:* ${actionName}\n` +
                      `┃\n` +
                      `┃ *Blocked Patterns:*\n` +
                      `┃ • chat.whatsapp.com\n` +
                      `┃ • WhatsApp group invites\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}antilink on - Enable\n` +
                      `┃ • ${prefix}antilink off - Disable\n` +
                      `┃ • ${prefix}antilink action - Change action\n` +
                      `┃ • ${prefix}antilink settings - Show this\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antilink_off' : 'antilink_on', type: 'reply' },
                    { text: '⚙️ CHANGE ACTION', id: 'antilink_action', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show main menu
            const actionIcon = currentAction === 'kick' ? '🔨' : '🗑️';
            
            await buttons.sendButtons(from, {
                text: `🔗 *ＡＮＴＩ-ＬＩＮＫ ＰＲＯＴＥＣＴＩＯＮ* 🔗\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                      `┃ ${actionIcon} *Action:* ${currentAction.toUpperCase()}\n` +
                      `┃\n` +
                      `┃ *What it blocks:*\n` +
                      `┃ • WhatsApp Group Links\n` +
                      `┃ • Group Invite Links\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}antilink on - Enable\n` +
                      `┃ • ${prefix}antilink off - Disable\n` +
                      `┃ • ${prefix}antilink action - Change action\n` +
                      `┃ • ${prefix}antilink settings - Configure\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antilink_off' : 'antilink_on', type: 'reply' },
                    { text: '⚙️ SETTINGS', id: 'antilink_settings', type: 'reply' },
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