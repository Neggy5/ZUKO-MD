/**
 * AutoSaveStatus Command - Automatically save status updates
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';
import { downloadContentFromMessage } from '@kelvdra/baileys';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Store auto-save status for groups/chats
const autoSaveStatus = new Map();

// Function to save status media
export async function saveStatusMedia(sock, status) {
    try {
        const from = 'status@broadcast';
        const timestamp = Date.now();
        const tempDir = path.join(__dirname, '../temp/status');
        if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
        
        let mediaBuffer = null;
        let fileName = '';
        let mimeType = '';
        
        // Check for image status
        if (status.imageMessage) {
            const stream = await downloadContentFromMessage(status.imageMessage, 'image');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            mediaBuffer = buffer;
            fileName = `status_img_${timestamp}.jpg`;
            mimeType = 'image/jpeg';
        }
        // Check for video status
        else if (status.videoMessage) {
            const stream = await downloadContentFromMessage(status.videoMessage, 'video');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            mediaBuffer = buffer;
            fileName = `status_vid_${timestamp}.mp4`;
            mimeType = 'video/mp4';
        }
        
        if (mediaBuffer) {
            const filePath = path.join(tempDir, fileName);
            fs.writeFileSync(filePath, mediaBuffer);
            
            // Forward to saved statuses chat (you can set a specific chat ID)
            // For now, save to temp folder
            console.log(`📸 Status saved: ${fileName}`);
            
            // Clean old files (older than 24 hours)
            const files = fs.readdirSync(tempDir);
            for (const file of files) {
                const filePath = path.join(tempDir, file);
                const stats = fs.statSync(filePath);
                if (Date.now() - stats.mtimeMs > 24 * 60 * 60 * 1000) {
                    fs.unlinkSync(filePath);
                }
            }
        }
    } catch (error) {
        console.error('Error saving status:', error);
    }
}

export default {
    name: 'autosavestatus',
    description: 'Automatically save status updates',
    aliases: ['autosave', 'savestatus', 'autostatus'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Only owner can use this command
        if (!isOwner) {
            await reply('❌ Only bot owner can use this command!');
            return;
        }
        
        const action = args[0]?.toLowerCase();
        const isEnabled = autoSaveStatus.get('global') || false;
        
        if (action === 'on' || action === 'enable') {
            autoSaveStatus.set('global', true);
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＵＴＯ-ＳＡＶＥ ＳＴＡＴＵＳ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📸 All status updates will be saved\n` +
                      `┃\n` +
                      `┃ *Saved to:* temp/status folder\n` +
                      `┃ *Auto-cleanup:* 24 hours\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '❌ DISABLE', id: 'autosavestatus_off', type: 'reply' },
                    { text: '📊 STATUS', id: 'autosavestatus_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            autoSaveStatus.set('global', false);
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＵＴＯ-ＳＡＶＥ ＳＴＡＴＵＳ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Status updates will no longer be saved\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'autosavestatus_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'status') {
            await buttons.sendButtons(from, {
                text: `📊 *ＡＵＴＯ-ＳＡＶＥ ＳＴＡＴＵＳ* 📊\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃ 📁 *Save location:* temp/status\n` +
                      `┃ ⏱️ *Retention:* 24 hours\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'autosavestatus_off' : 'autosavestatus_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            await buttons.sendButtons(from, {
                text: `📸 *ＡＵＴＯ-ＳＡＶＥ ＳＴＡＴＵＳ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}autosavestatus on - Enable\n` +
                      `┃ • ${prefix}autosavestatus off - Disable\n` +
                      `┃ • ${prefix}autosavestatus status - Check\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'autosavestatus_on', type: 'reply' },
                    { text: '📊 STATUS', id: 'autosavestatus_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
        }
        
        await react('✅');
    },
    
    ownerOnly: true,
    groupOnly: false,
    adminOnly: false
};

export { autoSaveStatus };