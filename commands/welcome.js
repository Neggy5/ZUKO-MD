/**
 * Welcome Command - Configure welcome messages for new members
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';

export default {
    name: 'welcome',
    description: 'Configure welcome messages for new members',
    aliases: ['welc', 'greet', 'joinmessage'],
    
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
            await reply('❌ Only group admins can configure welcome messages!');
            return;
        }
        
        // Get current settings
        const groupSettings = database.getGroupSettings(from);
        const isEnabled = groupSettings.welcome || false;
        const currentMessage = groupSettings.welcomeMessage || config.defaultGroupSettings.welcomeMessage;
        
        // Parse command args
        const action = args[0]?.toLowerCase();
        const customMessage = args.slice(1).join(' ');
        
        if (action === 'on' || action === 'enable') {
            // Enable welcome
            database.updateGroupSettings(from, { welcome: true });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＷＥＬＣＯＭＥ ＭＥＳＳＡＧＥ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 👋 New members will be welcomed!\n` +
                      `┃\n` +
                      `┃ *Variables you can use:*\n` +
                      `┃ • @user - Mention the user\n` +
                      `┃ • @group - Group name\n` +
                      `┃ • #memberCount - Total members\n` +
                      `┃ • #time - Current time\n` +
                      `┃ • #date - Current date\n` +
                      `┃\n` +
                      `┃ *Example:*\n` +
                      `┃ Welcome @user to @group! 🎉\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✏️ SET CUSTOM', id: 'welcome_set', type: 'reply' },
                    { text: '📋 PREVIEW', id: 'welcome_preview', type: 'reply' },
                    { text: '❌ DISABLE', id: 'welcome_off', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            // Disable welcome
            database.updateGroupSettings(from, { welcome: false });
            
            await buttons.sendButtons(from, {
                text: `❌ *ＷＥＬＣＯＭＥ ＭＥＳＳＡＧＥ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ New members will no longer be welcomed.\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'welcome_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'set' && customMessage) {
            // Set custom welcome message
            database.updateGroupSettings(from, { welcomeMessage: customMessage });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＣＵＳＴＯＭ ＷＥＬＣＯＭＥ ＭＥＳＳＡＧＥ ＳＥＴ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *New message:*\n` +
                      `┃ ${customMessage}\n` +
                      `┃\n` +
                      `┃ *Preview:*\n` +
                      `┃ ${formatWelcomePreview(customMessage, 'New Member', 'Test Group', 100)}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 PREVIEW', id: 'welcome_preview', type: 'reply' },
                    { text: '🔄 RESET', id: 'welcome_reset', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'reset') {
            // Reset to default
            const defaultMessage = config.defaultGroupSettings.welcomeMessage;
            database.updateGroupSettings(from, { welcomeMessage: defaultMessage });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＷＥＬＣＯＭＥ ＭＥＳＳＡＧＥ ＲＥＳＥＴ* ✅\n\n` +
                      `Reset to default message.\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 PREVIEW', id: 'welcome_preview', type: 'reply' },
                    { text: '✏️ SET CUSTOM', id: 'welcome_set', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'preview' || action === 'test') {
            // Preview welcome message
            const groupMetadata = await sock.groupMetadata(from);
            const groupName = groupMetadata.subject;
            const memberCount = groupMetadata.participants?.length || 0;
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString();
            
            const preview = formatWelcomeMessage(currentMessage, 'TestUser', groupName, memberCount, timeString, dateString);
            
            await buttons.sendButtons(from, {
                text: `📋 *ＷＥＬＣＯＭＥ ＭＥＳＳＡＧＥ ＰＲＥＶＩＥＷ* 📋\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ ${preview}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✏️ EDIT', id: 'welcome_set', type: 'reply' },
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'welcome_off' : 'welcome_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'variables' || action === 'help') {
            // Show variables help
            await buttons.sendButtons(from, {
                text: `📖 *ＷＥＬＣＯＭＥ ＭＥＳＳＡＧＥ ＶＡＲＩＡＢＬＥＳ* 📖\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Available variables:*\n` +
                      `┃\n` +
                      `┃ • @user - Mention the new member\n` +
                      `┃ • @group - Group name\n` +
                      `┃ • #memberCount - Total members\n` +
                      `┃ • #time - Current time (HH:MM AM/PM)\n` +
                      `┃ • #date - Current date (DD/MM/YYYY)\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃\n` +
                      `┃ Welcome @user to @group! 🎉\n` +
                      `┃\n` +
                      `┃ New member @user joined!\n` +
                      `┃ Now we have #memberCount members!\n` +
                      `┃\n` +
                      `┃ 👋 @user just joined @group at #time\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✏️ SET MESSAGE', id: 'welcome_set', type: 'reply' },
                    { text: '📋 PREVIEW', id: 'welcome_preview', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show current status
            await buttons.sendButtons(from, {
                text: `👋 *ＷＥＬＣＯＭＥ ＭＥＳＳＡＧＥ ＳＥＴＴＩＮＧＳ* 👋\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃\n` +
                      `┃ *Current message:*\n` +
                      `┃ ${currentMessage.substring(0, 100)}${currentMessage.length > 100 ? '...' : ''}\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}welcome on - Enable\n` +
                      `┃ • ${prefix}welcome off - Disable\n` +
                      `┃ • ${prefix}welcome set <message> - Custom message\n` +
                      `┃ • ${prefix}welcome reset - Reset to default\n` +
                      `┃ • ${prefix}welcome preview - Preview message\n` +
                      `┃ • ${prefix}welcome variables - Show variables\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'welcome_off' : 'welcome_on', type: 'reply' },
                    { text: '✏️ SET CUSTOM', id: 'welcome_set', type: 'reply' },
                    { text: '📋 PREVIEW', id: 'welcome_preview', type: 'reply' },
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

// Helper function to format welcome message
function formatWelcomeMessage(message, userName, groupName, memberCount, timeString, dateString) {
    let formatted = message
        .replace(/@user/g, `@${userName}`)
        .replace(/@group/g, groupName)
        .replace(/#memberCount/g, memberCount.toString())
        .replace(/#time/g, timeString)
        .replace(/#date/g, dateString);
    
    return formatted;
}

function formatWelcomePreview(message, userName, groupName, memberCount) {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const dateString = now.toLocaleDateString();
    return formatWelcomeMessage(message, userName, groupName, memberCount, timeString, dateString);
}