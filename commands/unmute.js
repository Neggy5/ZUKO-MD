/**
 * Unmute Command - Unlock group (alias for mute off)
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'unmute',
    description: 'Unlock the group (all members can chat)',
    aliases: ['unlock', 'open', 'unlockgc'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isGroup, isAdmin, isBotAdmin, isOwner } = context;
        const buttons = new ButtonManager(sock);
        
        // Check if in group
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        // Check admin permission
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can unlock the group!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to unlock the group!');
            return;
        }
        
        try {
            await sock.groupSettingUpdate(from, 'not_announcement');
            
            await buttons.sendButtons(from, {
                text: `🔓 *ＧＲＯＵＰ ＵＮＬＯＣＫＥＤ* 🔓\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🔓 The group has been unlocked\n` +
                      `┃\n` +
                      `┃ 👥 *All members can send messages*\n` +
                      `┃\n` +
                      `┃ 💡 Use .mute on to lock the group\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔒 LOCK GROUP', id: 'mute_on', type: 'reply' },
                    { text: '📋 GROUP INFO', id: 'group_info', type: 'reply' },
                    { text: '🏠 MAIN MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('🔓');
            
        } catch (error) {
            await buttons.sendButtons(from, {
                text: `❌ *ＵＮＬＯＣＫ ＦＡＩＬＥＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ ❌ Error: ${error.message}\n` +
                      `┃\n` +
                      `┃ 💡 Make sure I am an admin\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'unmute', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};