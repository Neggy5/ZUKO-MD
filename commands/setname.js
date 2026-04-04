/**
 * Set Group Name Command - Change group name/subject
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'setname',
    description: 'Change the group name',
    aliases: ['setgroupname', 'gname', 'groupname', 'rename'],
    
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
            await reply('❌ Only group admins can change the group name!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to change the group name!');
            return;
        }
        
        const newName = args.join(' ');
        
        if (!newName) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＮＡＭＥ ＰＲＯＶＩＤＥＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Usage:*\n` +
                      `┃ ${prefix}setname <new group name>\n` +
                      `┃\n` +
                      `┃ *Example:*\n` +
                      `┃ ${prefix}setname ZUKO MD Family\n` +
                      `┃\n` +
                      `┃ *Note:*\n` +
                      `┃ • Max 25 characters\n` +
                      `┃ • Only group admins can use\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: 'ℹ️ GROUP INFO', id: 'group_info', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Check name length
        if (newName.length > 25) {
            await reply('❌ Group name too long! Maximum 25 characters.');
            return;
        }
        
        await react('✏️');
        
        try {
            // Get current group metadata
            const groupMetadata = await sock.groupMetadata(from);
            const oldName = groupMetadata.subject;
            
            // Update group name
            await sock.groupUpdateSubject(from, newName);
            
            await buttons.sendButtons(from, {
                text: `✅ *ＧＲＯＵＰ ＮＡＭＥ ＵＰＤＡＴＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📛 *Old Name:* ${oldName}\n` +
                      `┃ 📛 *New Name:* ${newName}\n` +
                      `┃\n` +
                      `┃ 👤 *Updated by:* @${sender.split('@')[0]}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: 'ℹ️ GROUP INFO', id: 'group_info', type: 'reply' },
                    { text: '✏️ RENAME AGAIN', id: 'setname', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('SetName error:', error);
            await reply(`❌ Failed to update group name: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};