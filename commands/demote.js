/**
 * Demote Command - Remove admin status from a member
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'demote',
    description: 'Demote an admin to regular member',
    aliases: ['removeadmin', 'unadmin', 'demoteadmin'],
    
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
            await reply('❌ Only group admins can demote members!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to demote members!');
            return;
        }
        
        // Get target
        let target = args[0];
        let targetName = '';
        
        if (!target) {
            // Check if replying to a message
            const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            if (quotedMsg && (quotedMsg.participant || quotedMsg.key?.participant)) {
                target = quotedMsg.participant || quotedMsg.key?.participant;
                targetName = 'replied user';
            } else {
                await buttons.sendButtons(from, {
                    text: `❌ *ＮＯ ＴＡＲＧＥＴ ＳＥＬＥＣＴＥＤ*\n\n` +
                          `*Usage:*\n` +
                          `• ${prefix}demote @user\n` +
                          `• Reply to their message with ${prefix}demote\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '📖 HELP', id: 'demote_help', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                return;
            }
        } else {
            target = target.replace('@', '').split('@')[0];
            target = `${target}@s.whatsapp.net`;
            targetName = `@${target.split('@')[0]}`;
        }
        
        // Validate target
        if (target === sender) {
            await reply('❌ You cannot demote yourself!');
            return;
        }
        
        if (target === sock.user.id) {
            await reply('❌ You cannot demote the bot!');
            return;
        }
        
        await react('⬇️');
        
        try {
            // Check if target is an admin
            const groupMetadata = await sock.groupMetadata(from);
            const isCurrentlyAdmin = groupMetadata.participants.some(p => 
                p.id === target && (p.admin === 'admin' || p.admin === 'superadmin')
            );
            
            if (!isCurrentlyAdmin) {
                await buttons.sendButtons(from, {
                    text: `⚠️ *ＮＯＴ ＡＮ ＡＤＭＩＮ*\n\n` +
                          `${targetName} is not an admin!\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '⬆️ PROMOTE', id: `promote_${target}`, type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                await react('⚠️');
                return;
            }
            
            // Demote the user
            await sock.groupParticipantsUpdate(from, [target], 'demote');
            
            await buttons.sendButtons(from, {
                text: `✅ *ＤＥＭＯＴＥＤ ＳＵＣＣＥＳＳＦＵＬＬＹ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 👤 ${targetName} is no longer an admin!\n` +
                      `┃ 👑 Demoted by: @${sender.split('@')[0]}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⬇️ DEMOTE ANOTHER', id: 'demote', type: 'reply' },
                    { text: '⬆️ PROMOTE', id: `promote_${target}`, type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('Demote error:', error);
            await reply(`❌ Failed to demote ${targetName}: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};