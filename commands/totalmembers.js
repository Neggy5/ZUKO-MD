/**
 * Total Members Command - Get group member count
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'totalmembers',
    description: 'Get total number of members in the group',
    aliases: ['membercount', 'members', 'total', 'memberstats'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isGroup, groupMetadata, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Check if in group
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        if (!groupMetadata || !groupMetadata.participants) {
            await reply('❌ Failed to fetch group members!');
            return;
        }
        
        await react('👥');
        
        const participants = groupMetadata.participants;
        const total = participants.length;
        
        // Count admins
        const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin');
        const adminCount = admins.length;
        
        // Count regular members
        const regularCount = total - adminCount;
        
        // Get group owner
        const owner = participants.find(p => p.admin === 'superadmin');
        const ownerName = owner?.id?.split('@')[0] || 'Unknown';
        
        await buttons.sendButtons(from, {
            text: `👥 *ＧＲＯＵＰ ＭＥＭＢＥＲＳ ＳＴＡＴＳ* 👥\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 📛 *Group:* ${groupMetadata.subject || 'Unknown'}\n` +
                  `┃\n` +
                  `┃ 👥 *Total Members:* ${total}\n` +
                  `┃ 👑 *Admins:* ${adminCount}\n` +
                  `┃ 👤 *Regular:* ${regularCount}\n` +
                  `┃\n` +
                  `┃ 👑 *Group Owner:* @${ownerName}\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '🔄 REFRESH', id: 'totalmembers', type: 'reply' },
                { text: '📇 EXPORT VCF', id: 'vcf', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: false,
    botAdminNeeded: false
};