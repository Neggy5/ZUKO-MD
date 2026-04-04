/**
 * Anti-Call Command - Block incoming calls
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';

export default {
    name: 'anticall',
    description: 'Block incoming calls and optionally block the caller',
    aliases: ['nocall', 'blockcalls', 'callblocker'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Only owner can use this command (global setting)
        if (!isOwner) {
            await reply('❌ Only bot owner can use this command!');
            return;
        }
        
        // Get current settings from config
        const currentStatus = config.defaultGroupSettings?.anticall || false;
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            // Enable anticall
            config.defaultGroupSettings.anticall = true;
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＮＴＩ-ＣＡＬＬ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📞 Incoming calls will be:\n` +
                      `┃ • Automatically rejected\n` +
                      `┃ • Caller will be blocked\n` +
                      `┃ • Notification will be sent\n` +
                      `┃\n` +
                      `┃ *Works for:*\n` +
                      `┃ • Private calls\n` +
                      `┃ • Group calls\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '❌ DISABLE', id: 'anticall_off', type: 'reply' },
                    { text: '📊 STATUS', id: 'anticall_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            // Disable anticall
            config.defaultGroupSettings.anticall = false;
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＮＴＩ-ＣＡＬＬ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📞 Calls will no longer be blocked\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'anticall_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'status') {
            // Show current status
            await buttons.sendButtons(from, {
                text: `📊 *ＡＮＴＩ-ＣＡＬＬ ＳＴＡＴＵＳ* 📊\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${currentStatus ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃\n` +
                      `┃ *What happens when enabled:*\n` +
                      `┃ • Reject incoming calls\n` +
                      `┃ • Block the caller\n` +
                      `┃ • Send notification\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: currentStatus ? '❌ DISABLE' : '✅ ENABLE', id: currentStatus ? 'anticall_off' : 'anticall_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show help menu
            await buttons.sendButtons(from, {
                text: `📞 *ＡＮＴＩ-ＣＡＬＬ ＣＯＭＭＡＮＤ* 📞\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}anticall on - Enable call blocking\n` +
                      `┃ • ${prefix}anticall off - Disable call blocking\n` +
                      `┃ • ${prefix}anticall status - Check status\n` +
                      `┃\n` +
                      `┃ *Current Status:* ${currentStatus ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: currentStatus ? '❌ DISABLE' : '✅ ENABLE', id: currentStatus ? 'anticall_off' : 'anticall_on', type: 'reply' },
                    { text: '📊 STATUS', id: 'anticall_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
        }
        
        await react('✅');
    },
    
    ownerOnly: true,
    groupOnly: false,
    adminOnly: false
};