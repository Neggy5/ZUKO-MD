/**
 * HideTag Command - Send message that only admins see (mentions admins invisibly)
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'hidetag',
    description: 'Send a message that only admins can see (mentions admins)',
    aliases: ['ht', 'admins', 'alertadmin', 'adminonly'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isAdmin, isOwner, groupMetadata, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Check if in group
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        // Check admin permission
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can use hidetag!');
            return;
        }
        
        if (!groupMetadata || !groupMetadata.participants) {
            await reply('❌ Failed to fetch group members!');
            return;
        }
        
        const message = args.join(' ') || '🔔 Admin notification!';
        
        // Get all admins
        const admins = groupMetadata.participants.filter(p => 
            p.admin === 'admin' || p.admin === 'superadmin'
        );
        
        if (admins.length === 0) {
            await reply('❌ No admins found in this group!');
            return;
        }
        
        // Create mentions for admins only
        const mentions = admins.map(a => a.id);
        
        // Build hidetag message
        let hidetagMessage = `╭━━━❲ *HIDE TAG - ZUKO MD* ❳━━━╮\n`;
        hidetagMessage += `┃\n`;
        hidetagMessage += `┃ 🔔 *Admin Alert*\n`;
        hidetagMessage += `┃ 📝 *Message:* ${message}\n`;
        hidetagMessage += `┃ 👑 *From:* @${sender.split('@')[0]}\n`;
        hidetagMessage += `┃ 👥 *Admins:* ${admins.length}\n`;
        hidetagMessage += `┃ ⏱️ *Time:* ${new Date().toLocaleString()}\n`;
        hidetagMessage += `┃\n`;
        hidetagMessage += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n`;
        hidetagMessage += `*This message is visible to admins only.*`;
        
        await sock.sendMessage(from, {
            text: hidetagMessage,
            mentions: mentions
        }, { quoted: msg });
        
        await react('🔔');
        
        // Send follow-up buttons
        await buttons.sendButtons(from, {
            text: `✅ *HideTag sent!*\n\nMessage sent to ${admins.length} admin(s).`,
            buttons: [
                { text: '🔔 Send Again', id: 'hidetag', type: 'reply' },
                { text: '📢 Tag All', id: 'tagall', type: 'reply' },
                { text: '🏠 Menu', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: false
};