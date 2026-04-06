/**
 * Welcome Command - Configure welcome messages for new members with profile picture
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';
import config from '../config.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get ZUKO MD image path
const ZUKO_IMAGE_PATH = path.join(__dirname, '../utils/bot_image.jpg');

export default {
    name: 'welcome',
    description: 'Configure welcome messages for new members with profile picture',
    aliases: ['welc', 'greet', 'joinmessage'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can configure welcome messages!');
            return;
        }
        
        const groupSettings = database.getGroupSettings(from);
        const isEnabled = groupSettings.welcome || false;
        const currentMessage = groupSettings.welcomeMessage || config.defaultGroupSettings.welcomeMessage;
        
        const action = args[0]?.toLowerCase();
        const customMessage = args.slice(1).join(' ');
        
        if (action === 'on' || action === 'enable') {
            database.updateGroupSettings(from, { welcome: true });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＷＥＬＣＯＭＥ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 👋 New members will be welcomed with their profile pic!\n` +
                      `┃\n` +
                      `┃ *Variables:* @user, @group, #memberCount, #time, #date\n` +
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
            database.updateGroupSettings(from, { welcome: false });
            
            await buttons.sendButtons(from, {
                text: `❌ *ＷＥＬＣＯＭＥ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `New members will no longer be welcomed.\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'welcome_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'set' && customMessage) {
            database.updateGroupSettings(from, { welcomeMessage: customMessage });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＣＵＳＴＯＭ ＷＥＬＣＯＭＥ ＳＥＴ* ✅\n\n` +
                      `Message saved!\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 PREVIEW', id: 'welcome_preview', type: 'reply' },
                    { text: '🔄 RESET', id: 'welcome_reset', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'reset') {
            const defaultMessage = config.defaultGroupSettings.welcomeMessage;
            database.updateGroupSettings(from, { welcomeMessage: defaultMessage });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＷＥＬＣＯＭＥ ＲＥＳＥＴ* ✅\n\nReset to default message.\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 PREVIEW', id: 'welcome_preview', type: 'reply' },
                    { text: '✏️ SET CUSTOM', id: 'welcome_set', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'preview' || action === 'test') {
            const groupMetadata = await sock.groupMetadata(from);
            const groupName = groupMetadata.subject;
            const memberCount = groupMetadata.participants?.length || 0;
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString();
            
            const previewText = formatWelcomeMessage(currentMessage, 'TestUser', groupName, memberCount, timeString, dateString);
            
            // Get ZUKO MD image for preview
            let imageBuffer = null;
            if (fs.existsSync(ZUKO_IMAGE_PATH)) {
                imageBuffer = fs.readFileSync(ZUKO_IMAGE_PATH);
            }
            
            if (imageBuffer) {
                await sock.sendMessage(from, {
                    image: imageBuffer,
                    caption: `📋 *ＷＥＬＣＯＭＥ ＰＲＥＶＩＥＷ*\n\n${previewText}\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
                }, { quoted: msg });
            } else {
                await sock.sendMessage(from, { text: `📋 *ＷＥＬＣＯＭＥ ＰＲＥＶＩＥＷ*\n\n${previewText}\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡` }, { quoted: msg });
            }
            
        } else if (action === 'variables' || action === 'help') {
            await buttons.sendButtons(from, {
                text: `📖 *ＷＥＬＣＯＭＥ ＶＡＲＩＡＢＬＥＳ* 📖\n\n` +
                      `• @user - Mention new member\n` +
                      `• @group - Group name\n` +
                      `• #memberCount - Total members\n` +
                      `• #time - Current time\n` +
                      `• #date - Current date\n\n` +
                      `*Example:* Welcome @user to @group! 🎉\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✏️ SET MESSAGE', id: 'welcome_set', type: 'reply' },
                    { text: '📋 PREVIEW', id: 'welcome_preview', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            await buttons.sendButtons(from, {
                text: `👋 *ＷＥＬＣＯＭＥ ＳＥＴＴＩＮＧＳ*\n\n` +
                      `Status: ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n\n` +
                      `• ${prefix}welcome on - Enable\n` +
                      `• ${prefix}welcome off - Disable\n` +
                      `• ${prefix}welcome set <msg> - Custom message\n` +
                      `• ${prefix}welcome reset - Reset to default\n` +
                      `• ${prefix}welcome preview - Preview\n` +
                      `• ${prefix}welcome variables - Show variables\n\n` +
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