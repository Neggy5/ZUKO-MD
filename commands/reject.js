/**
 * Reject Command - Reject pending group join requests
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'reject',
    description: 'Reject pending group join requests',
    aliases: ['deny', 'rejectall', 'denyall'],
    
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
            await reply('❌ Only group admins can reject join requests!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to reject join requests!');
            return;
        }
        
        await react('❌');
        
        try {
            // Check if specific user is mentioned
            const mentionedUser = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
            const specificUser = args[0]?.replace('@', '');
            
            if (mentionedUser || specificUser) {
                // Reject specific user
                const targetJid = mentionedUser || (specificUser + '@s.whatsapp.net');
                
                try {
                    await sock.groupRequestParticipantsUpdate(from, [targetJid], 'reject');
                    
                    await buttons.sendButtons(from, {
                        text: `❌ *ＵＳＥＲ ＲＥＪＥＣＴＥＤ* ❌\n\n` +
                              `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                              `┃\n` +
                              `┃ 👤 @${targetJid.split('@')[0]} has been rejected\n` +
                              `┃    from joining the group.\n` +
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
                    await reply(`❌ Failed to reject user. User may not be in pending list.`);
                    await react('❌');
                    return;
                }
            }
            
            // Reject all pending requests
            const pending = await sock.groupRequestParticipantsList(from);
            
            if (!pending || pending.length === 0) {
                await reply('📋 No pending join requests to reject.');
                await react('✅');
                return;
            }
            
            let rejectedList = [];
            let failedList = [];
            
            for (const user of pending) {
                try {
                    await sock.groupRequestParticipantsUpdate(from, [user.jid], 'reject');
                    rejectedList.push(user.jid);
                } catch (err) {
                    failedList.push(user.jid);
                }
            }
            
            let message = `❌ *ＲＥＪＥＣＴＥＤ ＵＳＥＲＳ* ❌\n\n` +
                         `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
            
            if (rejectedList.length > 0) {
                message += `┃ ❌ *Rejected (${rejectedList.length}):*\n┃\n`;
                rejectedList.slice(0, 15).forEach(jid => {
                    message += `┃ 👤 @${jid.split('@')[0]}\n`;
                });
                if (rejectedList.length > 15) message += `┃ ... and ${rejectedList.length - 15} more\n`;
                message += `┃\n`;
            }
            
            if (failedList.length > 0) {
                message += `┃ ⚠️ *Failed (${failedList.length}):*\n┃\n`;
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
                    { text: '✅ APPROVE ALL', id: 'approve', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg, { mentions: [...rejectedList, ...failedList] });
            
            await react('✅');
            
        } catch (error) {
            console.error('Reject error:', error);
            await reply(`❌ Failed to reject join requests: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};