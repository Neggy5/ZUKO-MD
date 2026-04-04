/**
 * Set Group Profile Picture Command - Change group icon
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
    name: 'setgpp',
    description: 'Change the group profile picture',
    aliases: ['setgroupicon', 'setgrouppp', 'gpp', 'groupicon', 'setgpic'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isAdmin, isBotAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Check if in group
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        // Check admin permission
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can change the group icon!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to change the group icon!');
            return;
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
                      `┃ 1. Send an image to the group\n` +
                      `┃ 2. Reply to that image with:\n` +
                      `┃    ${prefix}setgpp\n` +
                      `┃\n` +
                      `┃ *Requirements:*\n` +
                      `┃ • Image must be JPG, PNG, or WEBP\n` +
                      `┃ • Max size: 1MB\n` +
                      `┃ • Bot needs to be admin\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'setgpp_help', type: 'reply' },
                    { text: '📸 GET CURRENT', id: 'getpp_group', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('🖼️');
        
        try {
            // Download image
            const stream = await downloadContentFromMessage(imageMsg, 'image');
            let imageBuffer = Buffer.from([]);
            for await (const chunk of stream) {
                imageBuffer = Buffer.concat([imageBuffer, chunk]);
            }
            
            // Validate image size
            const maxSize = 1 * 1024 * 1024; // 1MB
            if (imageBuffer.length > maxSize) {
                await reply(`❌ Image too large! ${(imageBuffer.length / 1024).toFixed(2)} KB (Max 1024 KB)`);
                await react('❌');
                return;
            }
            
            // Process image with sharp
            let processedBuffer = imageBuffer;
            try {
                // Resize to 640x640 (WhatsApp recommended)
                processedBuffer = await sharp(imageBuffer)
                    .resize(640, 640, { fit: 'cover' })
                    .jpeg({ quality: 90 })
                    .toBuffer();
            } catch (sharpError) {
                console.log('Sharp processing failed, using original');
            }
            
            // Update group profile picture
            await sock.updateProfilePicture(from, processedBuffer);
            
            await buttons.sendButtons(from, {
                text: `✅ *ＧＲＯＵＰ ＩＣＯＮ ＵＰＤＡＴＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 👑 *Updated by:* @${sender.split('@')[0]}\n` +
                      `┃ 📦 *Size:* ${(processedBuffer.length / 1024).toFixed(2)} KB\n` +
                      `┃\n` +
                      `┃ *Note:* It may take a few minutes\n` +
                      `┃ for the icon to update for everyone\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📸 VIEW ICON', id: 'getpp_group', type: 'reply' },
                    { text: '🔄 CHANGE AGAIN', id: 'setgpp', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('SetGPP error:', error);
            await reply(`❌ Failed to update group icon: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};