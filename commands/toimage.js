/**
 * ToImage Command - Convert sticker to image
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import { downloadContentFromMessage } from '@kelvdra/baileys';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    name: 'toimage',
    description: 'Convert sticker to image',
    aliases: ['img', 'toimg', 'stickertoimage'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isGroup } = context;
        const buttons = new ButtonManager(sock);
        
        await react('🖼️');
        
        // Get quoted message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const targetMsg = quotedMsg || msg.message;
        
        // Check if replying to a sticker
        const stickerMsg = targetMsg?.stickerMessage;
        
        if (!stickerMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＳＴＩＣＫＥＲ ＦＯＵＮＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Please reply to a sticker with:\n` +
                      `┃ ${context.prefix || '.'}toimage\n` +
                      `┃\n` +
                      `┃ *Supported formats:*\n` +
                      `┃ • WebP Stickers\n` +
                      `┃ • Animated Stickers\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HOW TO USE', id: 'toimage_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('⏳');
        
        try {
            // Download sticker
            const stream = await downloadContentFromMessage(stickerMsg, 'sticker');
            let stickerBuffer = Buffer.from([]);
            for await (const chunk of stream) {
                stickerBuffer = Buffer.concat([stickerBuffer, chunk]);
            }
            
            // Create temp file paths
            const tempDir = path.join(__dirname, '../temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            
            const inputPath = path.join(tempDir, `sticker_${Date.now()}.webp`);
            const outputPath = path.join(tempDir, `image_${Date.now()}.png`);
            
            // Save sticker
            fs.writeFileSync(inputPath, stickerBuffer);
            
            // Convert webp to PNG using ffmpeg or sharp
            let imageBuffer;
            let converted = false;
            
            // Try using sharp first
            try {
                const sharp = await import('sharp');
                imageBuffer = await sharp.default(inputPath)
                    .png()
                    .toBuffer();
                converted = true;
            } catch (sharpError) {
                console.log('Sharp not available, trying ffmpeg...');
                
                // Try using ffmpeg
                try {
                    await execPromise(`ffmpeg -i "${inputPath}" "${outputPath}" -y`);
                    if (fs.existsSync(outputPath)) {
                        imageBuffer = fs.readFileSync(outputPath);
                        converted = true;
                    }
                } catch (ffmpegError) {
                    console.log('FFmpeg failed, trying direct webp to png...');
                }
            }
            
            // Clean up temp files
            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
            if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            
            if (!converted || !imageBuffer) {
                throw new Error('Failed to convert sticker to image');
            }
            
            // Send as image
            await sock.sendMessage(from, {
                image: imageBuffer,
                caption: `✅ *ＳＴＩＣＫＥＲ ＣＯＮＶＥＲＴＥＤ*\n\n` +
                        `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                        `┃\n` +
                        `┃ 🖼️ Sticker converted to image\n` +
                        `┃ 📏 Size: ${(imageBuffer.length / 1024).toFixed(2)} KB\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                        `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
            }, { quoted: msg });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＣＯＮＶＥＲＳＩＯＮ ＣＯＭＰＬＥＴＥ*`,
                buttons: [
                    { text: '🔄 CONVERT AGAIN', id: 'toimage', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('ToImage error:', error);
            await reply(`❌ Failed to convert sticker: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};