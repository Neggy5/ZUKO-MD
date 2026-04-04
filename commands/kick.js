/**
 * Kick Command - Remove a member from group
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

// Store pending kicks for confirmation
const pendingKicks = new Map();

export default {
    name: 'kick',
    description: 'Remove a member from the group',
    aliases: ['remove', 'k', 'evict'],
    
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
            await reply('❌ Only group admins can kick members!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to kick members!');
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
                    text: `❌ *No Target Selected*\n\nPlease tag, reply, or provide a number to kick!\n\n*Usage:*\n• ${prefix}kick @user\n• Reply to their message with ${prefix}kick`,
                    buttons: [
                        { text: '📖 How to use?', id: 'kick_help', type: 'reply' },
                        { text: '🏠 Menu', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                return;
            }
        } else {
            // Extract number from mention or input
            target = target.replace('@', '').split('@')[0];
            target = `${target}@s.whatsapp.net`;
            targetName = `@${target.split('@')[0]}`;
        }
        
        // Validate target
        if (target === sender) {
            await reply('❌ You cannot kick yourself!');
            return;
        }
        
        if (target === sock.user.id) {
            await reply('❌ You cannot kick the bot!');
            return;
        }
        
        // Store for confirmation
        const confirmId = Date.now().toString();
        pendingKicks.set(confirmId, { target, from, sender, targetName });
        
        // Ask for confirmation
        await buttons.sendButtons(from, {
            text: `⚠️ *Confirm Kick - ZUKO MD*\n\nAre you sure you want to kick ${targetName}?\n\n*Action cannot be undone!*`,
            footer: 'Confirm to proceed',
            buttons: buttons.createConfirmButtons('kick', confirmId)
        }, msg);
        
        // Auto-cleanup after 30 seconds
        setTimeout(() => {
            if (pendingKicks.has(confirmId)) {
                pendingKicks.delete(confirmId);
            }
        }, 30000);
        
        await react('👢');
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};

// Export confirmation handler
export async function handleKickConfirm(sock, confirmId, approved) {
    const pending = pendingKicks.get(confirmId);
    if (!pending) return false;
    
    const { target, from, sender, targetName } = pending;
    pendingKicks.delete(confirmId);
    
    if (!approved) {
        await sock.sendMessage(from, { text: '❌ Kick cancelled by ZUKO MD.' });
        return false;
    }
    
    try {
        await sock.groupParticipantsUpdate(from, [target], 'remove');
        await sock.sendMessage(from, { 
            text: `✅ *Kicked by ZUKO MD*\n\n${targetName} has been removed from the group.`,
            mentions: [target]
        });
        return true;
    } catch (error) {
        await sock.sendMessage(from, { text: `❌ Failed to kick: ${error.message}` });
        return false;
    }
}