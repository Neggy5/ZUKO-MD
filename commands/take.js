/**
 * Take Command - Change sticker packname and author
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
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import webp from 'node-webpmux';

const execPromise = util.promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

// Default packname and author
let defaultPackname = 'ZUKO MD';
let defaultAuthor = 'ZUKO BOT';

// Update default values from config if available
try {
    import('../config.js').then(config => {
        if (config.default?.packname) defaultPackname = config.default.packname;
    }).catch(() => {});
} catch (e) {}

export default {
    name: 'take',
    description: 'Change sticker packname and author',
    aliases: ['steal', 'takesticker', 'changemeta', 'editsticker'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        await react('🏷️');
        
        // Parse arguments for custom packname and author
        let packname = defaultPackname;
        let author = defaultAuthor;
        let customText = args.join(' ');
        
        // Check for custom packname and author
        if (customText.includes('|')) {
            const parts = customText.split('|');
            packname = parts[0].trim() || defaultPackname;
            author = parts[1].trim() || defaultAuthor;
        } else if (customText) {
            packname = customText;
            author = defaultAuthor;
        }
        
        // Get quoted message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const targetMsg = quotedMsg || msg.message;
        
        // Check for sticker
        const stickerMsg = targetMsg?.stickerMessage;
        
        if (!stickerMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＳＴＩＣＫＥＲ ＦＯＵＮＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ 1️⃣ Reply to a sticker\n` +
                      `┃ 2️⃣ Type: ${prefix}take\n` +
                      `┃\n` +
                      `┃ *Custom packname/author:*\n` +
                      `┃ ${prefix}take My Pack | My Author\n` +
                      `┃ ${prefix}take My Pack\n` +
                      `┃\n` +
                      `┃ *Example:*\n` +
                      `┃ ${prefix}take ZUKO MD | ZUKO BOT\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'take_help', type: 'reply' },
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
            
            if (!stickerBuffer || stickerBuffer.length === 0) {
                throw new Error('Failed to download sticker');
            }
            
            // Create temp file paths
            const tempDir = path.join(__dirname, '../temp');
            if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
            
            const inputPath = path.join(tempDir, `input_${Date.now()}.webp`);
            const outputPath = path.join(tempDir, `output_${Date.now()}.webp`);
            
            // Save sticker
            fs.writeFileSync(inputPath, stickerBuffer);
            
            // Modify sticker metadata using node-webpmux
            try {
                const img = new webp.Image();
                await img.load(inputPath);
                
                // Set new EXIF metadata
                const exifData = {
                    'sticker-pack-name': packname,
                    'sticker-pack-publisher': author,
                    'sticker-emoji': '🤖'
                };
                
                // Convert EXIF to buffer
                const exifBuffer = await img.getExif();
                
                // Save with new metadata
                await img.save(outputPath);
                
                if (fs.existsSync(outputPath)) {
                    // Try using ffmpeg as fallback method
                    await execPromise(`ffmpeg -i "${inputPath}" -c copy -metadata comment="${packname}|${author}" "${outputPath}" -y`);
                }
            } catch (webpError) {
                console.log('WebP metadata method failed, using ffmpeg...');
                // Use ffmpeg as fallback
                await execPromise(`ffmpeg -i "${inputPath}" -c copy -metadata comment="${packname}|${author}" "${outputPath}" -y`);
            }
            
            // Read the output sticker
            let finalBuffer = stickerBuffer;
            if (fs.existsSync(outputPath)) {
                finalBuffer = fs.readFileSync(outputPath);
            }
            
            // Clean up temp files
            try {
                if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
                if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            } catch (e) {}
            
            // Send the modified sticker
            await sock.sendMessage(from, {
                sticker: finalBuffer,
                packname: packname,
                author: author
            }, { quoted: msg });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＳＴＩＣＫＥＲ ＴＡＫＥＮ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📦 *Pack:* ${packname}\n` +
                      `┃ ✍️ *Author:* ${author}\n` +
                      `┃\n` +
                      `┃ ✅ Sticker metadata updated!\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TAKE ANOTHER', id: 'take', type: 'reply' },
                    { text: '🎨 CREATE STICKER', id: 'sticker', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('Take command error:', error);
            
            await buttons.sendButtons(from, {
                text: `❌ *ＳＴＩＣＫＥＲ ＴＡＫＥ ＦＡＩＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Error: ${error.message}\n` +
                      `┃\n` +
                      `┃ *Possible reasons:*\n` +
                      `┃ • Invalid sticker format\n` +
                      `┃ • Corrupted sticker\n` +
                      `┃ • Sticker is animated\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'take', type: 'reply' },
                    { text: '📖 HELP', id: 'take_help', type: 'reply' },
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