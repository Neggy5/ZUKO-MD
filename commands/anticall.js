/**
 * Anti-Call Command - Block incoming calls
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';
import config from '../config.js';

export default {
    name: 'anticall',
    description: 'Block incoming calls and block the caller',
    aliases: ['nocall', 'blockcalls', 'callblocker'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        if (!isOwner) {
            await reply('❌ Only bot owner can use this command!');
            return;
        }
        
        const currentStatus = config.defaultGroupSettings?.anticall || false;
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            config.defaultGroupSettings.anticall = true;
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＮＴＩ-ＣＡＬＬ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📞 Incoming calls will be:\n` +
                      `┃ • Automatically rejected\n` +
                      `┃ • Caller will be blocked\n` +
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
            config.defaultGroupSettings.anticall = false;
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＮＴＩ-ＣＡＬＬ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `📞 Calls will no longer be blocked.\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'anticall_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'status') {
            await buttons.sendButtons(from, {
                text: `📊 *ＡＮＴＩ-ＣＡＬＬ ＳＴＡＴＵＳ* 📊\n\n` +
                      `🛡️ Status: ${currentStatus ? '✅ ENABLED' : '❌ DISABLED'}\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: currentStatus ? '❌ DISABLE' : '✅ ENABLE', id: currentStatus ? 'anticall_off' : 'anticall_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            await buttons.sendButtons(from, {
                text: `📞 *ＡＮＴＩ-ＣＡＬＬ ＣＯＭＭＡＮＤ* 📞\n\n` +
                      `• ${prefix}anticall on - Enable\n` +
                      `• ${prefix}anticall off - Disable\n` +
                      `• ${prefix}anticall status - Check status\n\n` +
                      `Current: ${currentStatus ? '✅ ENABLED' : '❌ DISABLED'}\n\n` +
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