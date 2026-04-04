/**
 * Anti-Tag Command - Block mass mentions/tagall in groups
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';

export default {
    name: 'antitag',
    description: 'Block mass mentions/tagall in groups',
    aliases: ['antitagall', 'blocktag', 'tagprotect'],
    
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
        const isEnabled = groupSettings.antitag || false;
        const currentAction = groupSettings.antitagAction || 'delete';
        
        // Parse command args
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            // Enable antitag
            database.updateGroupSettings(from, { antitag: true });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＮＴＩ-ＴＡＧ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🚫 Mass mentions/tagall will be blocked\n` +
                      `┃\n` +
                      `┃ *Action:* ${currentAction === 'kick' ? '🔨 KICK' : '🗑️ DELETE'}\n` +
                      `┃\n` +
                      `┃ *What it blocks:*\n` +
                      `┃ • Tagging 3+ members\n` +
                      `┃ • @everyone mentions\n` +
                      `┃ • Mass @username tags\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⚙️ CHANGE ACTION', id: 'antitag_action', type: 'reply' },
                    { text: '❌ DISABLE', id: 'antitag_off', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            // Disable antitag
            database.updateGroupSettings(from, { antitag: false });
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＮＴＩ-ＴＡＧ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Mass mentions will no longer be blocked\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'antitag_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'action') {
            // Show action selection menu
            await buttons.sendButtons(from, {
                text: `⚙️ *ＡＮＴＩ-ＴＡＧ ＡＣＴＩＯＮ*\n\n` +
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
                    { text: '🗑️ DELETE', id: 'antitag_action_delete', type: 'reply' },
                    { text: '🔨 KICK', id: 'antitag_action_kick', type: 'reply' },
                    { text: '⬅️ BACK', id: 'antitag_settings', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'settings' || action === 'status') {
            // Show current settings
            const actionIcon = currentAction === 'kick' ? '🔨' : '🗑️';
            const actionName = currentAction === 'kick' ? 'KICK' : 'DELETE';
            
            await buttons.sendButtons(from, {
                text: `⚙️ *ＡＮＴＩ-ＴＡＧ ＳＥＴＴＩＮＧＳ* ⚙️\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃ ${actionIcon} *Action:* ${actionName}\n` +
                      `┃\n` +
                      `┃ *Blocked Patterns:*\n` +
                      `┃ • 3+ members tagged\n` +
                      `┃ • @everyone mention\n` +
                      `┃ • Mass @username\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}antitag on - Enable\n` +
                      `┃ • ${prefix}antitag off - Disable\n` +
                      `┃ • ${prefix}antitag action - Change action\n` +
                      `┃ • ${prefix}antitag settings - Show this\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antitag_off' : 'antitag_on', type: 'reply' },
                    { text: '⚙️ CHANGE ACTION', id: 'antitag_action', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show main menu
            const actionIcon = currentAction === 'kick' ? '🔨' : '🗑️';
            
            await buttons.sendButtons(from, {
                text: `🚫 *ＡＮＴＩ-ＴＡＧ ＰＲＯＴＥＣＴＩＯＮ* 🚫\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                      `┃ ${actionIcon} *Action:* ${currentAction.toUpperCase()}\n` +
                      `┃\n` +
                      `┃ *What it blocks:*\n` +
                      `┃ • Tagging 3+ members\n` +
                      `┃ • @everyone mentions\n` +
                      `┃ • Mass tagall attempts\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}antitag on - Enable\n` +
                      `┃ • ${prefix}antitag off - Disable\n` +
                      `┃ • ${prefix}antitag action - Change action\n` +
                      `┃ • ${prefix}antitag settings - Configure\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antitag_off' : 'antitag_on', type: 'reply' },
                    { text: '⚙️ SETTINGS', id: 'antitag_settings', type: 'reply' },
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