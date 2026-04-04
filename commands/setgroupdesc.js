/**
 * Set Group Description Command - Change group description/subject
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'setdesc',
    description: 'Change the group description',
    aliases: ['setdescription', 'gdesc', 'groupdesc', 'setabout'],
    
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
            await reply('❌ Only group admins can change the group description!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to change the group description!');
            return;
        }
        
        const newDescription = args.join(' ');
        
        if (!newDescription) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＤＥＳＣＲＩＰＴＩＯＮ ＰＲＯＶＩＤＥＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Usage:*\n` +
                      `┃ ${prefix}setdesc <new description>\n` +
                      `┃\n` +
                      `┃ *Example:*\n` +
                      `┃ ${prefix}setdesc Welcome to our group!\n` +
                      `┃\n` +
                      `┃ *Note:*\n` +
                      `┃ • Max 500 characters\n` +
                      `┃ • Only group admins can use\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 VIEW DESC', id: 'group_info', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Check description length
        if (newDescription.length > 500) {
            await reply('❌ Description too long! Maximum 500 characters.');
            return;
        }
        
        await react('📝');
        
        try {
            // Get current group metadata
            const groupMetadata = await sock.groupMetadata(from);
            const oldDescription = groupMetadata.desc || 'No description';
            
            // Update group description
            await sock.groupUpdateDescription(from, newDescription);
            
            await buttons.sendButtons(from, {
                text: `✅ *ＧＲＯＵＰ ＤＥＳＣＲＩＰＴＩＯＮ ＵＰＤＡＴＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📝 *New Description:*\n` +
                      `┃ ${newDescription}\n` +
                      `┃\n` +
                      `┃ 👤 *Updated by:* @${sender.split('@')[0]}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📋 VIEW DESC', id: 'group_info', type: 'reply' },
                    { text: '✏️ EDIT AGAIN', id: 'setdesc', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('SetDesc error:', error);
            await reply(`❌ Failed to update group description: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};