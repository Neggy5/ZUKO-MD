/**
 * Promote Command - Make a member an admin
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'promote',
    description: 'Promote a member to admin',
    aliases: ['makeadmin', 'admin', 'setadmin'],
    
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
            await reply('❌ Only group admins can promote members!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to promote members!');
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
                          `• ${prefix}promote @user\n` +
                          `• Reply to their message with ${prefix}promote\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '📖 HELP', id: 'promote_help', type: 'reply' },
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
            await reply('❌ You cannot promote yourself!');
            return;
        }
        
        if (target === sock.user.id) {
            await reply('❌ I am already an admin!');
            return;
        }
        
        await react('⬆️');
        
        try {
            // Check if target is already admin
            const groupMetadata = await sock.groupMetadata(from);
            const isAlreadyAdmin = groupMetadata.participants.some(p => 
                p.id === target && (p.admin === 'admin' || p.admin === 'superadmin')
            );
            
            if (isAlreadyAdmin) {
                await buttons.sendButtons(from, {
                    text: `⚠️ *ＡＬＲＥＡＤＹ ＡＤＭＩＮ*\n\n` +
                          `${targetName} is already an admin!\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '⬇️ DEMOTE', id: `demote_${target}`, type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                await react('⚠️');
                return;
            }
            
            // Promote the user
            await sock.groupParticipantsUpdate(from, [target], 'promote');
            
            await buttons.sendButtons(from, {
                text: `✅ *ＰＲＯＭＯＴＥＤ ＳＵＣＣＥＳＳＦＵＬＬＹ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 👤 ${targetName} is now an admin!\n` +
                      `┃ 👑 Promoted by: @${sender.split('@')[0]}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⬆️ PROMOTE ANOTHER', id: 'promote', type: 'reply' },
                    { text: '⬇️ DEMOTE', id: `demote_${target}`, type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('Promote error:', error);
            await reply(`❌ Failed to promote ${targetName}: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};