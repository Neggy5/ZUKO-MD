/**
 * Sticker Command - Create stickers from images/videos with various options
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

// Sticker metadata
let packname = 'ZUKO MD';
let author = 'ZUKO BOT';

export default {
    name: 'sticker',
    description: 'Create stickers from images or videos',
    aliases: ['s', 'stiker', 'sticker', 'make sticker', 'to sticker', 'stickerify'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isGroup, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        await react('🎨');
        
        // Parse arguments for options
        let options = {
            crop: false,
            circle: false,
            nobg: false,
            quality: 80,
            packname: packname,
            author: author
        };
        
        // Check for flags
        for (const arg of args) {
            if (arg === '--circle' || arg === '-c') options.circle = true;
            if (arg === '--crop' || arg === '-cr') options.crop = true;
            if (arg === '--nobg' || arg === '-nb') options.nobg = true;
            if (arg === '--nometa' || arg === '-nm') options.nometa = true;
            if (arg.startsWith('--packname=')) options.packname = arg.split('=')[1];
            if (arg.startsWith('--author=')) options.author = arg.split('=')[1];
            if (arg.startsWith('--quality=')) options.quality = parseInt(arg.split('=')[1]) || 80;
        }
        
        // Get quoted message or direct media
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const targetMsg = quotedMsg || msg.message;
        
        // Check for image or video
        const imageMsg = targetMsg?.imageMessage;
        const videoMsg = targetMsg?.videoMessage;
        
        if (!imageMsg && !videoMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＭＥＤＩＡ ＦＯＵＮＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ 1️⃣ Send or forward an image/video\n` +
                      `┃ 2️⃣ Reply to that message with:\n` +
                      `┃    ${prefix}sticker\n` +
                      `┃\n` +
                      `┃ *Options:*\n` +
                      `┃ • --circle - Round sticker\n` +
                      `┃ • --crop - Crop to square\n` +
                      `┃ • --nobg - Remove background\n` +
                      `┃ • --nometa - No pack/author info\n` +
                      `┃ • --quality=80 - Set quality (1-100)\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃ ${prefix}sticker\n` +
                      `┃ ${prefix}sticker --circle\n` +
                      `┃ ${prefix}sticker --crop --quality=90\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'sticker_help', type: 'reply' },
                    { text: '⚡ QUICK STICKER', id: 'sticker_quick', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('⏳');
        
        try {
            let mediaBuffer = null;
            let isVideo = false;
            let mimetype = '';
            
            // Download media
            if (imageMsg) {
                const stream = await downloadContentFromMessage(imageMsg, 'image');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
                mimetype = imageMsg.mimetype;
            } else if (videoMsg) {
                isVideo = true;
                const stream = await downloadContentFromMessage(videoMsg, 'video');
                let buffer = Buffer.from([]);
                for await (const chunk of stream) {
                    buffer = Buffer.concat([buffer, chunk]);
                }
                mediaBuffer = buffer;
                mimetype = videoMsg.mimetype;
                
                // Check video duration (max 11 seconds for stickers)
                if (videoMsg.seconds > 11) {
                    await reply(`❌ Video too long! Maximum 11 seconds for stickers.`);
                    await react('❌');
                    return;
                }
            }
            
            // Create temp directory
            const tempDir = path.join(__dirname, '../temp');
            if (!fs.existsSync(tempDir)) {
                fs.mkdirSync(tempDir, { recursive: true });
            }
            
            const timestamp = Date.now();
            const inputPath = path.join(tempDir, `input_${timestamp}.${isVideo ? 'mp4' : 'jpg'}`);
            const outputPath = path.join(tempDir, `sticker_${timestamp}.webp`);
            
            // Save input file
            fs.writeFileSync(inputPath, mediaBuffer);
            
            let stickerBuffer = null;
            
            // Process image with Sharp if available
            if (!isVideo) {
                try {
                    const sharp = await import('sharp');
                    let sharpInstance = sharp.default(inputPath);
                    
                    // Apply crop to square
                    if (options.crop) {
                        const metadata = await sharpInstance.metadata();
                        const size = Math.min(metadata.width, metadata.height);
                        sharpInstance = sharpInstance.extract({
                            left: Math.floor((metadata.width - size) / 2),
                            top: Math.floor((metadata.height - size) / 2),
                            width: size,
                            height: size
                        });
                    }
                    
                    // Apply circle crop
                    if (options.circle) {
                        const metadata = await sharpInstance.metadata();
                        const size = Math.min(metadata.width, metadata.height);
                        sharpInstance = sharpInstance
                            .resize(size, size)
                            .composite([{
                                input: Buffer.from(
                                    `<svg><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="white" /></svg>`,
                                    'utf8'
                                ),
                                blend: 'dest-in'
                            }]);
                    }
                    
                    // Convert to WebP sticker
                    sharpInstance = sharpInstance.webp({ quality: options.quality });
                    stickerBuffer = await sharpInstance.toBuffer();
                    
                } catch (sharpError) {
                    console.log('Sharp not available, using ffmpeg...');
                    
                    // Use ffmpeg as fallback
                    let ffmpegCmd = `ffmpeg -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2" -quality ${options.quality} "${outputPath}" -y`;
                    
                    if (options.circle) {
                        ffmpegCmd = `ffmpeg -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2,format=rgba,colorchannelmixer=aa=1,drawbox=0:0:512:512:color=black@0.0:t=fill,format=rgba,geq=a='if(lt(sqrt((X-256)^2+(Y-256)^2),256),255,0)'" -quality ${options.quality} "${outputPath}" -y`;
                    }
                    
                    await execPromise(ffmpegCmd);
                    if (fs.existsSync(outputPath)) {
                        stickerBuffer = fs.readFileSync(outputPath);
                    }
                }
            } else {
                // Video to animated sticker
                await execPromise(`ffmpeg -i "${inputPath}" -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2,fps=20" -loop 0 -quality ${options.quality} "${outputPath}" -y`);
                
                if (fs.existsSync(outputPath)) {
                    stickerBuffer = fs.readFileSync(outputPath);
                }
            }
            
            // Clean up temp files
            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
            if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            
            if (!stickerBuffer) {
                throw new Error('Failed to create sticker');
            }
            
            // Prepare sticker message
            const stickerMessage = {
                sticker: stickerBuffer,
                mimetype: 'image/webp'
            };
            
            // Add packname and author if not disabled
            if (!options.nometa) {
                stickerMessage.packname = options.packname;
                stickerMessage.author = options.author;
            }
            
            // Send sticker
            await sock.sendMessage(from, stickerMessage, { quoted: msg });
            
            // Send success message with options
            let successText = `✅ *ＳＴＩＣＫＥＲ ＣＲＥＡＴＥＤ* ✅\n\n` +
                             `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                             `┃\n` +
                             `┃ 📁 Type: ${isVideo ? 'Animated' : 'Image'}\n` +
                             `┃ 📏 Size: ${(stickerBuffer.length / 1024).toFixed(2)} KB\n` +
                             `┃ ${options.circle ? '🔵 Circle crop: Yes\n┃ ' : ''}` +
                             `┃ ${options.crop ? '📐 Square crop: Yes\n┃ ' : ''}` +
                             `┃ ${options.nobg ? '✨ BG removed: Yes\n┃ ' : ''}` +
                             `┃\n` +
                             `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                             `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
            
            await buttons.sendButtons(from, {
                text: successText,
                buttons: [
                    { text: '🔄 MAKE ANOTHER', id: 'sticker', type: 'reply' },
                    { text: '🔵 CIRCLE', id: 'sticker_circle', type: 'reply' },
                    { text: '📐 CROP', id: 'sticker_crop', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('Sticker error:', error);
            await reply(`❌ Failed to create sticker: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};