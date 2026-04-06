/**
 * Goodbye Command - Configure goodbye messages for leaving members with profile picture
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

const ZUKO_IMAGE_PATH = path.join(__dirname, '../utils/bot_image.jpg');

export default {
    name: 'goodbye',
    description: 'Configure goodbye messages for leaving members with profile picture',
    aliases: ['bye', 'leave', 'goodbyemsg'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can configure goodbye messages!');
            return;
        }
        
        const groupSettings = database.getGroupSettings(from);
        const isEnabled = groupSettings.goodbye || false;
        const currentMessage = groupSettings.goodbyeMessage || config.defaultGroupSettings.goodbyeMessage;
        
        const action = args[0]?.toLowerCase();
        const customMessage = args.slice(1).join(' ');
        
        if (action === 'on' || action === 'enable') {
            database.updateGroupSettings(from, { goodbye: true });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＧＯＯＤＢＹＥ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 👋 Leaving members will be bid farewell with their profile pic!\n` +
                      `┃\n` +
                      `┃ *Variables:* @user, @group, #memberCount, #time, #date\n` +
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
            database.updateGroupSettings(from, { goodbye: false });
            
            await buttons.sendButtons(from, {
                text: `❌ *ＧＯＯＤＢＹＥ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `Leaving members will no longer be bid farewell.\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'goodbye_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'set' && customMessage) {
            database.updateGroupSettings(from, { goodbyeMessage: customMessage });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＣＵＳＴＯＭ ＧＯＯＤＢＹＥ ＳＥＴ* ✅\n\nMessage saved!\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 PREVIEW', id: 'goodbye_preview', type: 'reply' },
                    { text: '🔄 RESET', id: 'goodbye_reset', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'reset') {
            const defaultMessage = config.defaultGroupSettings.goodbyeMessage;
            database.updateGroupSettings(from, { goodbyeMessage: defaultMessage });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＧＯＯＤＢＹＥ ＲＥＳＥＴ* ✅\n\nReset to default message.\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 PREVIEW', id: 'goodbye_preview', type: 'reply' },
                    { text: '✏️ SET CUSTOM', id: 'goodbye_set', type: 'reply' },
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
            
            const previewText = formatGoodbyeMessage(currentMessage, 'TestUser', groupName, memberCount - 1, timeString, dateString);
            
            let imageBuffer = null;
            if (fs.existsSync(ZUKO_IMAGE_PATH)) {
                imageBuffer = fs.readFileSync(ZUKO_IMAGE_PATH);
            }
            
            if (imageBuffer) {
                await sock.sendMessage(from, {
                    image: imageBuffer,
                    caption: `📋 *ＧＯＯＤＢＹＥ ＰＲＥＶＩＥＷ*\n\n${previewText}\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
                }, { quoted: msg });
            } else {
                await sock.sendMessage(from, { text: `📋 *ＧＯＯＤＢＹＥ ＰＲＥＶＩＥＷ*\n\n${previewText}\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡` }, { quoted: msg });
            }
            
        } else if (action === 'variables' || action === 'help') {
            await buttons.sendButtons(from, {
                text: `📖 *ＧＯＯＤＢＹＥ ＶＡＲＩＡＢＬＥＳ* 📖\n\n` +
                      `• @user - Mention leaving member\n` +
                      `• @group - Group name\n` +
                      `• #memberCount - Remaining members\n` +
                      `• #time - Current time\n` +
                      `• #date - Current date\n\n` +
                      `*Example:* Goodbye @user! We'll miss you! 👋\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✏️ SET MESSAGE', id: 'goodbye_set', type: 'reply' },
                    { text: '📋 PREVIEW', id: 'goodbye_preview', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            await buttons.sendButtons(from, {
                text: `👋 *ＧＯＯＤＢＹＥ ＳＥＴＴＩＮＧＳ*\n\n` +
                      `Status: ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n\n` +
                      `• ${prefix}goodbye on - Enable\n` +
                      `• ${prefix}goodbye off - Disable\n` +
                      `• ${prefix}goodbye set <msg> - Custom message\n` +
                      `• ${prefix}goodbye reset - Reset to default\n` +
                      `• ${prefix}goodbye preview - Preview\n` +
                      `• ${prefix}goodbye variables - Show variables\n\n` +
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