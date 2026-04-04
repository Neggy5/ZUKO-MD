/**
 * Anti-Group Mention Command - Block forwarded status/group mention messages
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';

export default {
    name: 'antigroupmention',
    description: 'Block forwarded status/group mention messages',
    aliases: ['antigpmention', 'blockgpmention', 'antigp', 'nogpmention'],
    
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
        const isEnabled = groupSettings.antigroupmention || false;
        const currentAction = groupSettings.antigroupmentionAction || 'delete';
        
        // Parse command args
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            // Enable antigroupmention
            database.updateGroupSettings(from, { antigroupmention: true });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＮＴＩ-ＧＲＯＵＰ ＭＥＮＴＩＯＮ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🚫 Forwarded status/group mentions will be blocked\n` +
                      `┃\n` +
                      `┃ *Action:* ${currentAction === 'kick' ? '🔨 KICK' : '🗑️ DELETE'}\n` +
                      `┃\n` +
                      `┃ *What it blocks:*\n` +
                      `┃ • Forwarded group status messages\n` +
                      `┃ • @group mentions\n` +
                      `┃ • Newsletter forwards\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⚙️ CHANGE ACTION', id: 'antigroupmention_action', type: 'reply' },
                    { text: '❌ DISABLE', id: 'antigroupmention_off', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            // Disable antigroupmention
            database.updateGroupSettings(from, { antigroupmention: false });
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＮＴＩ-ＧＲＯＵＰ ＭＥＮＴＩＯＮ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Forwarded status/group mentions will no longer be blocked\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'antigroupmention_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'action') {
            // Show action selection menu
            await buttons.sendButtons(from, {
                text: `⚙️ *ＡＮＴＩ-ＧＲＯＵＰ ＭＥＮＴＩＯＮ ＡＣＴＩＯＮ*\n\n` +
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
                    { text: '🗑️ DELETE', id: 'antigroupmention_action_delete', type: 'reply' },
                    { text: '🔨 KICK', id: 'antigroupmention_action_kick', type: 'reply' },
                    { text: '⬅️ BACK', id: 'antigroupmention_settings', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'settings' || action === 'status') {
            // Show current settings
            const actionIcon = currentAction === 'kick' ? '🔨' : '🗑️';
            const actionName = currentAction === 'kick' ? 'KICK' : 'DELETE';
            
            await buttons.sendButtons(from, {
                text: `⚙️ *ＡＮＴＩ-ＧＲＯＵＰ ＭＥＮＴＩＯＮ ＳＥＴＴＩＮＧＳ* ⚙️\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃ ${actionIcon} *Action:* ${actionName}\n` +
                      `┃\n` +
                      `┃ *Blocked Patterns:*\n` +
                      `┃ • Forwarded status updates\n` +
                      `┃ • Group mention messages\n` +
                      `┃ • Newsletter forwards\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}antigroupmention on - Enable\n` +
                      `┃ • ${prefix}antigroupmention off - Disable\n` +
                      `┃ • ${prefix}antigroupmention action - Change action\n` +
                      `┃ • ${prefix}antigroupmention settings - Show this\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antigroupmention_off' : 'antigroupmention_on', type: 'reply' },
                    { text: '⚙️ CHANGE ACTION', id: 'antigroupmention_action', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show main menu
            const actionIcon = currentAction === 'kick' ? '🔨' : '🗑️';
            
            await buttons.sendButtons(from, {
                text: `🚫 *ＡＮＴＩ-ＧＲＯＵＰ ＭＥＮＴＩＯＮ ＰＲＯＴＥＣＴＩＯＮ* 🚫\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                      `┃ ${actionIcon} *Action:* ${currentAction.toUpperCase()}\n` +
                      `┃\n` +
                      `┃ *What it blocks:*\n` +
                      `┃ • Forwarded status messages\n` +
                      `┃ • Group mention forwards\n` +
                      `┃ • Newsletter content\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}antigroupmention on - Enable\n` +
                      `┃ • ${prefix}antigroupmention off - Disable\n` +
                      `┃ • ${prefix}antigroupmention action - Change action\n` +
                      `┃ • ${prefix}antigroupmention settings - Configure\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antigroupmention_off' : 'antigroupmention_on', type: 'reply' },
                    { text: '⚙️ SETTINGS', id: 'antigroupmention_settings', type: 'reply' },
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