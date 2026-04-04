/**
 * ToStatus Command - Send media as status update
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import { downloadContentFromMessage } from '@kelvdra/baileys';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    name: 'tostatus',
    description: 'Send media as status update',
    aliases: ['poststatus', 'uploadstatus', 'statuspost'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Only owner can post status
        if (!isOwner) {
            await reply('❌ Only bot owner can post status updates!');
            return;
        }
        
        // Get quoted message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const targetMsg = quotedMsg || msg.message;
        
        // Check for media
        const imageMsg = targetMsg?.imageMessage;
        const videoMsg = targetMsg?.videoMessage;
        
        if (!imageMsg && !videoMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＭＥＤＩＡ ＦＯＵＮＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ 1️⃣ Send or forward an image/video\n` +
                      `┃ 2️⃣ Reply to that media with:\n` +
                      `┃    ${prefix}tostatus\n` +
                      `┃\n` +
                      `┃ *Supports:*\n` +
                      `┃ • Images (JPG, PNG, GIF)\n` +
                      `┃ • Videos (MP4, max 30 seconds)\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'tostatus_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('📤');
        
        try {
            let mediaBuffer = null;
            let isVideo = false;
            let caption = '';
            
            if (imageMsg) {
                // Handle image
                caption = imageMsg.caption || '📸 Status Update';
                const stream = await downloadContentFromMessage(imageMsg, 'image');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
                
            } else if (videoMsg) {
                // Handle video
                isVideo = true;
                caption = videoMsg.caption || '🎥 Status Update';
                
                // Check video duration (max 30 seconds for status)
                if (videoMsg.seconds > 30) {
                    await reply('❌ Video too long! Status videos must be under 30 seconds.');
                    await react('❌');
                    return;
                }
                
                const stream = await downloadContentFromMessage(videoMsg, 'video');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
            }
            
            if (!mediaBuffer || mediaBuffer.length === 0) {
                throw new Error('Failed to download media');
            }
            
            // Send as status
            if (isVideo) {
                await sock.sendMessage('status@broadcast', {
                    video: mediaBuffer,
                    caption: caption
                });
            } else {
                await sock.sendMessage('status@broadcast', {
                    image: mediaBuffer,
                    caption: caption
                });
            }
            
            await buttons.sendButtons(from, {
                text: `✅ *ＳＴＡＴＵＳ ＰＯＳＴＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📸 Status has been posted successfully!\n` +
                      `┃ 📝 Caption: ${caption.substring(0, 50)}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📤 POST ANOTHER', id: 'tostatus', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('ToStatus error:', error);
            await reply(`❌ Failed to post status: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: true,
    groupOnly: false,
    adminOnly: false
};