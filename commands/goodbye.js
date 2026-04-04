/**
 * Goodbye Command - Configure goodbye messages for leaving members
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';

export default {
    name: 'goodbye',
    description: 'Configure goodbye messages for leaving members',
    aliases: ['bye', 'leave', 'goodbyemsg'],
    
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
            await reply('❌ Only group admins can configure goodbye messages!');
            return;
        }
        
        // Get current settings
        const groupSettings = database.getGroupSettings(from);
        const isEnabled = groupSettings.goodbye || false;
        const currentMessage = groupSettings.goodbyeMessage || config.defaultGroupSettings.goodbyeMessage;
        
        // Parse command args
        const action = args[0]?.toLowerCase();
        const customMessage = args.slice(1).join(' ');
        
        if (action === 'on' || action === 'enable') {
            // Enable goodbye
            database.updateGroupSettings(from, { goodbye: true });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＧＯＯＤＢＹＥ ＭＥＳＳＡＧＥ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 👋 Leaving members will be bid farewell!\n` +
                      `┃\n` +
                      `┃ *Variables you can use:*\n` +
                      `┃ • @user - Mention the user\n` +
                      `┃ • @group - Group name\n` +
                      `┃ • #memberCount - Remaining members\n` +
                      `┃ • #time - Current time\n` +
                      `┃ • #date - Current date\n` +
                      `┃\n` +
                      `┃ *Example:*\n` +
                      `┃ Goodbye @user! We'll miss you! 👋\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✏️ SET CUSTOM', id: 'goodbye_set', type: 'reply' },
                    { text: '📋 PREVIEW', id: 'goodbye_preview', type: 'reply' },
                    { text: '❌ DISABLE', id: 'goodbye_off', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            // Disable goodbye
            database.updateGroupSettings(from, { goodbye: false });
            
            await buttons.sendButtons(from, {
                text: `❌ *ＧＯＯＤＢＹＥ ＭＥＳＳＡＧＥ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Leaving members will no longer be bid farewell.\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'goodbye_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'set' && customMessage) {
            // Set custom goodbye message
            database.updateGroupSettings(from, { goodbyeMessage: customMessage });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＣＵＳＴＯＭ ＧＯＯＤＢＹＥ ＭＥＳＳＡＧＥ ＳＥＴ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *New message:*\n` +
                      `┃ ${customMessage}\n` +
                      `┃\n` +
                      `┃ *Preview:*\n` +
                      `┃ ${formatGoodbyePreview(customMessage, 'Leaving User', 'Test Group', 99)}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 PREVIEW', id: 'goodbye_preview', type: 'reply' },
                    { text: '🔄 RESET', id: 'goodbye_reset', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'reset') {
            // Reset to default
            const defaultMessage = config.defaultGroupSettings.goodbyeMessage;
            database.updateGroupSettings(from, { goodbyeMessage: defaultMessage });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＧＯＯＤＢＹＥ ＭＥＳＳＡＧＥ ＲＥＳＥＴ* ✅\n\n` +
                      `Reset to default message.\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 PREVIEW', id: 'goodbye_preview', type: 'reply' },
                    { text: '✏️ SET CUSTOM', id: 'goodbye_set', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'preview' || action === 'test') {
            // Preview goodbye message
            const groupMetadata = await sock.groupMetadata(from);
            const groupName = groupMetadata.subject;
            const memberCount = groupMetadata.participants?.length || 0;
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString();
            
            const preview = formatGoodbyeMessage(currentMessage, 'TestUser', groupName, memberCount - 1, timeString, dateString);
            
            await buttons.sendButtons(from, {
                text: `📋 *ＧＯＯＤＢＹＥ ＭＥＳＳＡＧＥ ＰＲＥＶＩＥＷ* 📋\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ ${preview}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✏️ EDIT', id: 'goodbye_set', type: 'reply' },
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'goodbye_off' : 'goodbye_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'variables' || action === 'help') {
            // Show variables help
            await buttons.sendButtons(from, {
                text: `📖 *ＧＯＯＤＢＹＥ ＭＥＳＳＡＧＥ ＶＡＲＩＡＢＬＥＳ* 📖\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Available variables:*\n` +
                      `┃\n` +
                      `┃ • @user - Mention the leaving member\n` +
                      `┃ • @group - Group name\n` +
                      `┃ • #memberCount - Remaining members\n` +
                      `┃ • #time - Current time (HH:MM AM/PM)\n` +
                      `┃ • #date - Current date (DD/MM/YYYY)\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃\n` +
                      `┃ Goodbye @user! We'll miss you! 👋\n` +
                      `┃\n` +
                      `┃ @user has left @group.\n` +
                      `┃ Remaining members: #memberCount\n` +
                      `┃\n` +
                      `┃ 👋 @user left at #time\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✏️ SET MESSAGE', id: 'goodbye_set', type: 'reply' },
                    { text: '📋 PREVIEW', id: 'goodbye_preview', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show current status
            await buttons.sendButtons(from, {
                text: `👋 *ＧＯＯＤＢＹＥ ＭＥＳＳＡＧＥ ＳＥＴＴＩＮＧＳ* 👋\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃\n` +
                      `┃ *Current message:*\n` +
                      `┃ ${currentMessage.substring(0, 100)}${currentMessage.length > 100 ? '...' : ''}\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}goodbye on - Enable\n` +
                      `┃ • ${prefix}goodbye off - Disable\n` +
                      `┃ • ${prefix}goodbye set <message> - Custom message\n` +
                      `┃ • ${prefix}goodbye reset - Reset to default\n` +
                      `┃ • ${prefix}goodbye preview - Preview message\n` +
                      `┃ • ${prefix}goodbye variables - Show variables\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'goodbye_off' : 'goodbye_on', type: 'reply' },
                    { text: '✏️ SET CUSTOM', id: 'goodbye_set', type: 'reply' },
                    { text: '📋 PREVIEW', id: 'goodbye_preview', type: 'reply' },
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

// Helper function to format goodbye message
function formatGoodbyeMessage(message, userName, groupName, memberCount, timeString, dateString) {
    let formatted = message
        .replace(/@user/g, `@${userName}`)
        .replace(/@group/g, groupName)
        .replace(/#memberCount/g, memberCount.toString())
        .replace(/#time/g, timeString)
        .replace(/#date/g, dateString);
    
    return formatted;
}

function formatGoodbyePreview(message, userName, groupName, memberCount) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString();
    return formatGoodbyeMessage(message, userName, groupName, memberCount, timeString, dateString);
}