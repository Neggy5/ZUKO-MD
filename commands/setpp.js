/**
 * Set Profile Picture Command - Set bot or group profile picture
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
    name: 'setpp',
    description: 'Set profile picture for bot or group',
    aliases: ['setprofile', 'setavatar', 'changepp'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isGroup, isAdmin, isBotAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        const target = args[0]?.toLowerCase();
        let isGroupPp = false;
        
        // Check if setting group PP
        if (target === 'group' || target === 'gc') {
            if (!isGroup) {
                await reply('❌ You can only set group icon from within a group!');
                return;
            }
            const userIsAdmin = await isAdmin;
            if (!userIsAdmin && !isOwner) {
                await reply('❌ Only group admins can change the group icon!');
                return;
            }
            const botIsAdmin = await isBotAdmin;
            if (!botIsAdmin) {
                await reply('❌ I need to be an admin to change the group icon!');
                return;
            }
            isGroupPp = true;
        } else {
            // Setting bot PP
            if (!isOwner) {
                await reply('❌ Only bot owner can change the bot profile picture!');
                return;
            }
        }
        
        // Get quoted message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const targetMsg = quotedMsg || msg.message;
        
        // Check for image
        const imageMsg = targetMsg?.imageMessage;
        
        if (!imageMsg) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＩＭＡＧＥ ＦＯＵＮＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ 1️⃣ Send an image\n` +
                      `┃ 2️⃣ Reply to that image with:\n` +
                      `┃    ${prefix}setpp - Bot PP\n` +
                      `┃    ${prefix}setpp group - Group icon\n` +
                      `┃\n` +
                      `┃ *Requirements:*\n` +
                      `┃ • Image: JPG, PNG, WEBP\n` +
                      `┃ • Max size: 1MB\n` +
                      `┃ • Bot needs admin for group\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'setpp_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('🔄');
        
        try {
            // Download image
            const stream = await downloadContentFromMessage(imageMsg, 'image');
            let imageBuffer = Buffer.from([]);
            for await (const chunk of stream) {
                imageBuffer = Buffer.concat([imageBuffer, chunk]);
            }
            
            if (!imageBuffer || imageBuffer.length === 0) {
                throw new Error('Failed to download image');
            }
            
            // Check file size (1MB max)
            const fileSizeMB = (imageBuffer.length / (1024 * 1024)).toFixed(2);
            if (imageBuffer.length > 1 * 1024 * 1024) {
                await reply(`❌ Image too large! ${fileSizeMB}MB (Max: 1MB)`);
                await react('❌');
                return;
            }
            
            // Process image with sharp
            let processedBuffer = imageBuffer;
            try {
                // Resize to 640x640 (WhatsApp recommended)
                processedBuffer = await sharp(imageBuffer)
                    .resize(640, 640, { 
                        fit: 'cover',
                        position: 'center'
                    })
                    .jpeg({ quality: 90 })
                    .toBuffer();
                console.log('Image processed with sharp');
            } catch (sharpError) {
                console.log('Sharp processing failed, using original:', sharpError.message);
                // Keep original buffer
            }
            
            // Update profile picture
            if (isGroupPp) {
                // Update group icon
                await sock.updateProfilePicture(from, processedBuffer);
                await reply(`✅ *ＧＲＯＵＰ ＩＣＯＮ ＵＰＤＡＴＥＤ* ✅\n\n` +
                           `📦 Size: ${(processedBuffer.length / 1024).toFixed(2)} KB\n\n` +
                           `*Note:* It may take a few minutes to update for everyone`);
            } else {
                // Update bot profile picture
                const botJid = sock.user.id;
                await sock.updateProfilePicture(botJid, processedBuffer);
                await reply(`✅ *ＢＯＴ ＰＲＯＦＩＬＥ ＰＩＣＴＵＲＥ ＵＰＤＡＴＥＤ* ✅\n\n` +
                           `📦 Size: ${(processedBuffer.length / 1024).toFixed(2)} KB\n\n` +
                           `*Note:* It may take a few minutes to update everywhere`);
            }
            
            await buttons.sendButtons(from, {
                text: `✅ *ＰＲＯＦＩＬＥ ＰＩＣＴＵＲＥ ＵＰＤＡＴＥＤ* ✅\n\n` +
                      `The ${isGroupPp ? 'group icon' : 'bot profile picture'} has been updated successfully!`,
                buttons: [
                    { text: '📸 VIEW NEW PP', id: isGroupPp ? 'getpp_group' : 'getpp', type: 'reply' },
                    { text: '🔄 CHANGE AGAIN', id: 'setpp', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('SetPP Error:', error);
            
            let errorMsg = error.message;
            if (errorMsg.includes('406')) {
                errorMsg = 'Invalid image format. Use JPG, PNG, or WEBP.';
            } else if (errorMsg.includes('413')) {
                errorMsg = 'Image too large. Maximum size is 1MB.';
            }
            
            await buttons.sendButtons(from, {
                text: `❌ *ＦＡＩＬＥＤ ＴＯ ＳＥＴ ＰＲＯＦＩＬＥ ＰＩＣＴＵＲＥ*\n\n` +
                      `Error: ${errorMsg}\n\n` +
                      `*Try:*\n` +
                      `• Use a smaller image (max 1MB)\n` +
                      `• Use JPG or PNG format\n` +
                      `• Make sure bot has permissions\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'setpp', type: 'reply' },
                    { text: '📖 HELP', id: 'setpp_help', type: 'reply' },
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