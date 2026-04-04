/**
 * Request Command - View pending group join requests
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'request',
    description: 'View pending group join requests',
    aliases: ['requests', 'pending', 'joinrequests'],
    
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
            await reply('❌ Only group admins can view join requests!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to view join requests!');
            return;
        }
        
        await react('📋');
        
        try {
            // Get pending join requests
            const response = await sock.groupRequestParticipantsList(from);
            
            if (!response || response.length === 0) {
                await buttons.sendButtons(from, {
                    text: `📋 *ＪＯＩＮ ＲＥＱＵＥＳＴＳ*\n\n` +
                          `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                          `┃\n` +
                          `┃ ✅ No pending join requests.\n` +
                          `┃\n` +
                          `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '🔄 REFRESH', id: 'request', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                await react('✅');
                return;
            }
            
            let replyMessage = `📋 *ＪＯＩＮ ＲＥＱＵＥＳＴＳ*\n\n` +
                              `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
            
            response.forEach((request, index) => {
                const { jid, request_method, request_time } = request;
                const formattedTime = new Date(parseInt(request_time) * 1000).toLocaleString();
                const phoneNumber = jid.split('@')[0];
                
                replyMessage += `┃ *${index + 1}.* 📱 @${phoneNumber}\n`;
                replyMessage += `┃    🔗 Method: ${request_method}\n`;
                replyMessage += `┃    🕐 Time: ${formattedTime}\n┃\n`;
            });
            
            replyMessage += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                           `*Use .approve to accept all or .reject @user to deny*\n\n` +
                           `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
            
            // Create mentions array
            const mentions = response.map(r => r.jid);
            
            await buttons.sendButtons(from, {
                text: replyMessage,
                buttons: [
                    { text: '✅ APPROVE ALL', id: 'approve', type: 'reply' },
                    { text: '❌ REJECT ALL', id: 'reject', type: 'reply' },
                    { text: '🔄 REFRESH', id: 'request', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg, { mentions });
            
            await react('✅');
            
        } catch (error) {
            console.error('Request error:', error);
            await reply(`❌ Failed to fetch join requests: ${error.message}`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};