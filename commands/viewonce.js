/**
 * ViewOnce Command - Read, convert, and bypass view-once messages
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import { downloadContentFromMessage } from '@kelvdra/baileys';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    name: 'viewonce',
    description: 'Read, convert, or bypass view-once messages',
    aliases: ['vo', 'viewonce', 'readonce', 'bypass', 'unviewonce'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        await react('👁️');
        
        // Check if replying to a message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        
        if (!quotedMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＭＥＳＳＡＧＥ ＲＥＰＬＩＥＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ 1. Forward a view-once message\n` +
                      `┃    to this bot\n` +
                      `┃ 2. Reply to that message with:\n` +
                      `┃    ${prefix}viewonce\n` +
                      `┃\n` +
                      `┃ *What it does:*\n` +
                      `┃ • Reads view-once images\n` +
                      `┃ • Converts view-once videos\n` +
                      `┃ • Bypasses view-once limit\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'viewonce_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Check for view-once message in different possible structures
        let viewOnceImage = null;
        let viewOnceVideo = null;
        
        // Method 1: Direct viewOnceMessageV2
        if (quotedMsg.viewOnceMessageV2) {
            const viewOnceMsg = quotedMsg.viewOnceMessageV2.message;
            if (viewOnceMsg?.imageMessage) {
                viewOnceImage = viewOnceMsg.imageMessage;
            } else if (viewOnceMsg?.videoMessage) {
                viewOnceVideo = viewOnceMsg.videoMessage;
            }
        }
        
        // Method 2: Direct viewOnceMessage
        if (!viewOnceImage && !viewOnceVideo && quotedMsg.viewOnceMessage) {
            const viewOnceMsg = quotedMsg.viewOnceMessage.message;
            if (viewOnceMsg?.imageMessage) {
                viewOnceImage = viewOnceMsg.imageMessage;
            } else if (viewOnceMsg?.videoMessage) {
                viewOnceVideo = viewOnceMsg.videoMessage;
            }
        }
        
        // Method 3: Check for message with viewOnce flag
        if (!viewOnceImage && !viewOnceVideo) {
            // Check if it's an image with viewOnce flag
            if (quotedMsg.imageMessage && quotedMsg.imageMessage.viewOnce === true) {
                viewOnceImage = quotedMsg.imageMessage;
            }
            // Check if it's a video with viewOnce flag
            if (quotedMsg.videoMessage && quotedMsg.videoMessage.viewOnce === true) {
                viewOnceVideo = quotedMsg.videoMessage;
            }
        }
        
        // Method 4: Check nested ephemeral messages
        if (!viewOnceImage && !viewOnceVideo && quotedMsg.ephemeralMessage) {
            const ephemeralMsg = quotedMsg.ephemeralMessage.message;
            if (ephemeralMsg?.viewOnceMessageV2?.message?.imageMessage) {
                viewOnceImage = ephemeralMsg.viewOnceMessageV2.message.imageMessage;
            } else if (ephemeralMsg?.viewOnceMessageV2?.message?.videoMessage) {
                viewOnceVideo = ephemeralMsg.viewOnceMessageV2.message.videoMessage;
            }
        }
        
        if (!viewOnceImage && !viewOnceVideo) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯＴ Ａ ＶＩＥＷ-ＯＮＣＥ ＭＥＳＳＡＧＥ*\n\n` +
                      `Please reply to a view-once (disappearing) message.\n\n` +
                      `*Tip:* Forward the view-once message to the bot first,\n` +
                      `then reply with .viewonce\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'viewonce_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            await react('❌');
            return;
        }
        
        await react('⏳');
        
        try {
            let mediaBuffer = null;
            let isVideo = false;
            let caption = '';
            let mimeType = '';
            
            if (viewOnceImage) {
                // Handle view-once image
                isVideo = false;
                caption = viewOnceImage.caption || 'View-Once Image';
                mimeType = viewOnceImage.mimetype || 'image/jpeg';
                
                const stream = await downloadContentFromMessage(viewOnceImage, 'image');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
                
            } else if (viewOnceVideo) {
                // Handle view-once video
                isVideo = true;
                caption = viewOnceVideo.caption || 'View-Once Video';
                mimeType = viewOnceVideo.mimetype || 'video/mp4';
                
                const stream = await downloadContentFromMessage(viewOnceVideo, 'video');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
            }
            
            if (!mediaBuffer || mediaBuffer.length === 0) {
                throw new Error('Failed to download media');
            }
            
            const fileSizeMB = (mediaBuffer.length / (1024 * 1024)).toFixed(2);
            
            // Send the media (bypassing view-once)
            if (isVideo) {
                await sock.sendMessage(from, {
                    video: mediaBuffer,
                    caption: `🎥 *ＶＩＥＷ-ＯＮＣＥ ＶＩＤＥＯ*\n\n` +
                            `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                            `┃\n` +
                            `┃ 📝 *Caption:* ${caption.substring(0, 50)}\n` +
                            `┃ 📦 *Size:* ${fileSizeMB} MB\n` +
                            `┃\n` +
                            `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                            `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
                }, { quoted: msg });
            } else {
                // Process image with sharp for better quality
                let processedBuffer = mediaBuffer;
                try {
                    // Convert to JPEG for better compatibility
                    processedBuffer = await sharp(mediaBuffer)
                        .jpeg({ quality: 90 })
                        .toBuffer();
                } catch (sharpError) {
                    console.log('Sharp processing failed, using original');
                }
                
                await sock.sendMessage(from, {
                    image: processedBuffer,
                    caption: `🖼️ *ＶＩＥＷ-ＯＮＣＥ ＩＭＡＧＥ*\n\n` +
                            `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                            `┃\n` +
                            `┃ 📝 *Caption:* ${caption.substring(0, 50)}\n` +
                            `┃ 📦 *Size:* ${fileSizeMB} MB\n` +
                            `┃\n` +
                            `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                            `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
                }, { quoted: msg });
            }
            
            await buttons.sendButtons(from, {
                text: `✅ *ＶＩＥＷ-ＯＮＣＥ ＢＹＰＡＳＳＥＤ* ✅\n\n` +
                      `The ${isVideo ? 'video' : 'image'} has been saved and sent above.\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 CONVERT AGAIN', id: 'viewonce', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('ViewOnce error:', error);
            await buttons.sendButtons(from, {
                text: `❌ *ＶＩＥＷ-ＯＮＣＥ ＣＯＮＶＥＲＳＩＯＮ ＦＡＩＬＥＤ* ❌\n\n` +
                      `Error: ${error.message}\n\n` +
                      `*Possible reasons:*\n` +
                      `• Message already viewed\n` +
                      `• Media corrupted\n` +
                      `• Network issue\n` +
                      `• Unsupported format\n\n` +
                      `*Tip:* Try forwarding the view-once message\n` +
                      `to the bot again before opening it.\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'viewonce', type: 'reply' },
                    { text: '📖 HELP', id: 'viewonce_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};