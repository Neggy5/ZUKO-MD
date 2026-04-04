/**
 * ToURL Command - Convert media to direct URL using CatBox API
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import { downloadContentFromMessage } from '@kelvdra/baileys';
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CatBox API endpoints
const CATBOX_API = 'https://catbox.moe/user/api.php';
const LITTLETRANSFER_API = 'https://littletransfer.com/api/upload';

export default {
    name: 'tourl',
    description: 'Convert media to direct URL using CatBox',
    aliases: ['upload', 'tourl', 'getlink', 'catbox', 'url'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        await react('☁️');
        
        // Get quoted message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const targetMsg = quotedMsg || msg.message;
        
        // Check for media
        const imageMsg = targetMsg?.imageMessage;
        const videoMsg = targetMsg?.videoMessage;
        const audioMsg = targetMsg?.audioMessage;
        const documentMsg = targetMsg?.documentMessage;
        const stickerMsg = targetMsg?.stickerMessage;
        
        if (!imageMsg && !videoMsg && !audioMsg && !documentMsg && !stickerMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＭＥＤＩＡ ＦＯＵＮＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ 1️⃣ Send or forward a media file\n` +
                      `┃ 2️⃣ Reply to that media with:\n` +
                      `┃    ${prefix}tourl\n` +
                      `┃\n` +
                      `┃ *Supported media:*\n` +
                      `┃ • Images (JPG, PNG, GIF, WEBP)\n` +
                      `┃ • Videos (MP4, MOV, AVI)\n` +
                      `┃ • Audio (MP3, AAC, OGG)\n` +
                      `┃ • Documents (PDF, ZIP, APK)\n` +
                      `┃ • Stickers (WEBP)\n` +
                      `┃\n` +
                      `┃ *Max file size:* 200MB\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'tourl_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('⏳');
        
        try {
            let mediaBuffer = null;
            let fileType = '';
            let fileName = '';
            let mimeType = '';
            
            // Download media based on type
            if (imageMsg) {
                const stream = await downloadContentFromMessage(imageMsg, 'image');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
                fileType = imageMsg.mimetype?.split('/')[1] || 'jpg';
                fileName = `image_${Date.now()}.${fileType}`;
                mimeType = imageMsg.mimetype || 'image/jpeg';
                
            } else if (videoMsg) {
                const stream = await downloadContentFromMessage(videoMsg, 'video');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
                fileType = videoMsg.mimetype?.split('/')[1] || 'mp4';
                fileName = `video_${Date.now()}.${fileType}`;
                mimeType = videoMsg.mimetype || 'video/mp4';
                
            } else if (audioMsg) {
                const stream = await downloadContentFromMessage(audioMsg, 'audio');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
                fileType = audioMsg.mimetype?.split('/')[1] || 'mp3';
                fileName = `audio_${Date.now()}.${fileType}`;
                mimeType = audioMsg.mimetype || 'audio/mpeg';
                
            } else if (documentMsg) {
                const stream = await downloadContentFromMessage(documentMsg, 'document');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
                fileType = documentMsg.fileName?.split('.').pop() || 'file';
                fileName = documentMsg.fileName || `document_${Date.now()}.${fileType}`;
                mimeType = documentMsg.mimetype || 'application/octet-stream';
                
            } else if (stickerMsg) {
                const stream = await downloadContentFromMessage(stickerMsg, 'sticker');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
                fileType = 'webp';
                fileName = `sticker_${Date.now()}.webp`;
                mimeType = 'image/webp';
            }
            
            if (!mediaBuffer || mediaBuffer.length === 0) {
                throw new Error('Failed to download media');
            }
            
            // Check file size (200MB max for CatBox)
            const fileSizeMB = (mediaBuffer.length / (1024 * 1024)).toFixed(2);
            if (mediaBuffer.length > 200 * 1024 * 1024) {
                await reply(`❌ File too large! ${fileSizeMB}MB (Max: 200MB)`);
                await react('❌');
                return;
            }
            
            // Save temp file
            const tempDir = path.join(__dirname, '../temp');
            if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
            
            const tempPath = path.join(tempDir, fileName);
            fs.writeFileSync(tempPath, mediaBuffer);
            
            // Upload to CatBox
            const formData = new FormData();
            formData.append('fileToUpload', fs.createReadStream(tempPath));
            formData.append('reqtype', 'fileupload');
            
            const uploadResponse = await axios.post(CATBOX_API, formData, {
                headers: {
                    ...formData.getHeaders(),
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: 120000
            });
            
            let fileUrl = uploadResponse.data;
            
            // Clean up temp file
            try {
                if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            } catch (e) {}
            
            if (!fileUrl || !fileUrl.startsWith('https://')) {
                throw new Error('Upload failed - invalid response');
            }
            
            // Determine media type icon
            let typeIcon = '📁';
            let mediaType = 'File';
            if (imageMsg) {
                typeIcon = '🖼️';
                mediaType = 'Image';
            } else if (videoMsg) {
                typeIcon = '🎥';
                mediaType = 'Video';
            } else if (audioMsg) {
                typeIcon = '🎵';
                mediaType = 'Audio';
            } else if (stickerMsg) {
                typeIcon = '🏷️';
                mediaType = 'Sticker';
            } else if (documentMsg) {
                typeIcon = '📄';
                mediaType = 'Document';
            }
            
            // Send the URL
            await buttons.sendButtons(from, {
                text: `✅ *ＵＰＬＯＡＤ ＳＵＣＣＥＳＳＦＵＬ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ ${typeIcon} *Type:* ${mediaType}\n` +
                      `┃ 📦 *Size:* ${fileSizeMB} MB\n` +
                      `┃ 📁 *Format:* ${fileType.toUpperCase()}\n` +
                      `┃\n` +
                      `┃ 🔗 *Direct URL:*\n` +
                      `┃ ${fileUrl}\n` +
                      `┃\n` +
                      `┃ ⏱️ *Expires:* Never (permanent)\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 COPY URL', id: `copy_${fileUrl}`, type: 'reply' },
                    { text: '☁️ UPLOAD AGAIN', id: 'tourl', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('Upload error:', error);
            
            await buttons.sendButtons(from, {
                text: `❌ *ＵＰＬＯＡＤ ＦＡＩＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Error: ${error.message}\n` +
                      `┃\n` +
                      `┃ *Possible reasons:*\n` +
                      `┃ • File too large (>200MB)\n` +
                      `┃ • Unsupported format\n` +
                      `┃ • Network timeout\n` +
                      `┃ • CatBox API down\n` +
                      `┃\n` +
                      `┃ *Try:*\n` +
                      `┃ • Use smaller file\n` +
                      `┃ • Try again later\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'tourl', type: 'reply' },
                    { text: '📖 HELP', id: 'tourl_help', type: 'reply' },
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