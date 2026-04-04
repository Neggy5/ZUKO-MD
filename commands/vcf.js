/**
 * VCF Command - Export group members as VCF contact file
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    name: 'vcf',
    description: 'Export group members as VCF contact file',
    aliases: ['export', 'savecontacts', 'getvcf'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isGroup, isAdmin, isOwner, groupMetadata, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Check if in group
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        // Check admin permission
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can export contacts!');
            return;
        }
        
        if (!groupMetadata || !groupMetadata.participants) {
            await reply('❌ Failed to fetch group members!');
            return;
        }
        
        await react('📇');
        
        const participants = groupMetadata.participants;
        const groupName = groupMetadata.subject || 'Group';
        
        // Generate VCF content
        let vcfContent = '';
        let validContacts = 0;
        
        for (const participant of participants) {
            const jid = participant.id;
            const number = jid.split('@')[0];
            const name = participant.notify || participant.name || number;
            
            // Only add if it's a valid phone number (not a LID or special ID)
            if (number && number.match(/^\d+$/) && number.length >= 10) {
                vcfContent += `BEGIN:VCARD\n`;
                vcfContent += `VERSION:3.0\n`;
                vcfContent += `FN:${name}\n`;
                vcfContent += `TEL;TYPE=CELL:${number}\n`;
                vcfContent += `END:VCARD\n`;
                validContacts++;
            }
        }
        
        if (validContacts === 0) {
            await reply('❌ No valid contacts found in this group!');
            return;
        }
        
        // Save VCF file
        const tempDir = path.join(__dirname, '../temp');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        
        const fileName = `${groupName.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.vcf`;
        const filePath = path.join(tempDir, fileName);
        fs.writeFileSync(filePath, vcfContent);
        
        // Send VCF file
        await sock.sendMessage(from, {
            document: fs.readFileSync(filePath),
            mimetype: 'text/vcard',
            fileName: fileName,
            caption: `📇 *ＣＯＮＴＡＣＴＳ ＥＸＰＯＲＴＥＤ*\n\n` +
                    `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                    `┃\n` +
                    `┃ 📛 *Group:* ${groupName}\n` +
                    `┃ 👥 *Members:* ${participants.length}\n` +
                    `┃ ✅ *Valid Contacts:* ${validContacts}\n` +
                    `┃ 📁 *File:* ${fileName}\n` +
                    `┃\n` +
                    `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                    `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
        }, { quoted: msg });
        
        // Clean up temp file
        fs.unlinkSync(filePath);
        
        await buttons.sendButtons(from, {
            text: `✅ *ＶＣＦ ＥＸＰＯＲＴ ＣＯＭＰＬＥＴＥ* ✅\n\n` +
                  `📇 ${validContacts} contacts exported successfully!`,
            buttons: [
                { text: '📇 EXPORT AGAIN', id: 'vcf', type: 'reply' },
                { text: '👥 TOTAL MEMBERS', id: 'total_members', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: false
};