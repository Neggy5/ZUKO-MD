/**
 * Approve Command - Approve pending group join requests
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'approve',
    description: 'Approve pending group join requests',
    aliases: ['accept', 'approveall', 'acceptall'],
    
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
            await reply('❌ Only group admins can approve join requests!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to approve join requests!');
            return;
        }
        
        await react('✅');
        
        try {
            // Check if specific user is mentioned
            const mentionedUser = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            const specificUser = args[0]?.replace('@', '');
            
            if (mentionedUser || specificUser) {
                // Approve specific user
                const targetJid = mentionedUser || (specificUser + '@s.whatsapp.net');
                
                try {
                    await sock.groupRequestParticipantsUpdate(from, [targetJid], 'approve');
                    
                    await buttons.sendButtons(from, {
                        text: `✅ *ＵＳＥＲ ＡＰＰＲＯＶＥＤ* ✅\n\n` +
                              `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                              `┃\n` +
                              `┃ 👤 @${targetJid.split('@')[0]} has been approved\n` +
                              `┃    to join the group!\n` +
                              `┃\n` +
                              `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                        buttons: [
                            { text: '📋 VIEW REQUESTS', id: 'request', type: 'reply' },
                            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                        ]
                    }, msg);
                    
                    await react('✅');
                    return;
                } catch (err) {
                    await reply(`❌ Failed to approve user. User may not be in pending list.`);
                    await react('❌');
                    return;
                }
            }
            
            // Approve all pending requests
            const pending = await sock.groupRequestParticipantsList(from);
            
            if (!pending || pending.length === 0) {
                await reply('📋 No pending join requests to approve.');
                await react('✅');
                return;
            }
            
            let approvedList = [];
            let failedList = [];
            
            for (const user of pending) {
                try {
                    await sock.groupRequestParticipantsUpdate(from, [user.jid], 'approve');
                    approvedList.push(user.jid);
                } catch (err) {
                    failedList.push(user.jid);
                }
            }
            
            let message = `✅ *ＡＰＰＲＯＶＥＤ ＵＳＥＲＳ* ✅\n\n` +
                         `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
            
            if (approvedList.length > 0) {
                message += `┃ ✅ *Approved (${approvedList.length}):*\n┃\n`;
                approvedList.slice(0, 15).forEach(jid => {
                    message += `┃ 👤 @${jid.split('@')[0]}\n`;
                });
                if (approvedList.length > 15) message += `┃ ... and ${approvedList.length - 15} more\n`;
                message += `┃\n`;
            }
            
            if (failedList.length > 0) {
                message += `┃ ❌ *Failed (${failedList.length}):*\n┃\n`;
                failedList.slice(0, 5).forEach(jid => {
                    message += `┃ 👤 @${jid.split('@')[0]}\n`;
                });
                message += `┃\n`;
            }
            
            message += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
            
            await buttons.sendButtons(from, {
                text: message,
                buttons: [
                    { text: '📋 VIEW REQUESTS', id: 'request', type: 'reply' },
                    { text: '❌ REJECT ALL', id: 'reject', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg, { mentions: [...approvedList, ...failedList] });
            
            await react('✅');
            
        } catch (error) {
            console.error('Approve error:', error);
            await reply(`❌ Failed to approve join requests: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};