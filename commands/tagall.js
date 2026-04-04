/**
 * TagAll Command - Mention all group members
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'tagall',
    description: 'Mention all members in the group',
    aliases: ['everyone', 'all', 'mentionall'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isAdmin, isBotAdmin, isOwner, groupMetadata, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Check if in group
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        // Check admin permission
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can use tagall!');
            return;
        }
        
        if (!groupMetadata || !groupMetadata.participants) {
            await reply('❌ Failed to fetch group members!');
            return;
        }
        
        const participants = groupMetadata.participants;
        const message = args.join(' ') || '📢 Attention everyone!';
        
        // Create mentions
        const mentions = participants.map(p => p.id);
        
        // Build tag message with counter
        let tagMessage = `╭━━━❲ *TAG ALL - ZUKO MD* ❳━━━╮\n`;
        tagMessage += `┃\n`;
        tagMessage += `┃ 📢 *Message:* ${message}\n`;
        tagMessage += `┃ 👥 *Members:* ${participants.length}\n`;
        tagMessage += `┃ 👑 *Tagged by:* @${sender.split('@')[0]}\n`;
        tagMessage += `┃ ⏱️ *Time:* ${new Date().toLocaleString()}\n`;
        tagMessage += `┃\n`;
        tagMessage += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
        tagMessage += `*Replying to this message will tag everyone again!*`;
        
        await sock.sendMessage(from, {
            text: tagMessage,
            mentions: mentions
        }, { quoted: msg });
        
        await react('📢');
        
        // Send follow-up buttons
        await buttons.sendButtons(from, {
            text: `✅ *TagAll completed!*\n\n${participants.length} members have been mentioned.`,
            buttons: [
                { text: '🔄 Tag Again', id: 'tagall', type: 'reply' },
                { text: '🔇 Mute Mode', id: 'mute', type: 'reply' },
                { text: '🏠 Menu', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: false
};