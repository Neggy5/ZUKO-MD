/**
 * Anti-Sticker Command - Block stickers in groups
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';
import config from '../config.js';

export default {
    name: 'antisticker',
    description: 'Block stickers in the group',
    aliases: ['nosticker', 'blocksticker', 'antistick'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isGroup, isAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can use this command!');
            return;
        }
        
        const groupSettings = database.getGroupSettings(from);
        const isEnabled = groupSettings.antisticker || false;
        
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            database.updateGroupSettings(from, { antisticker: true });
            await reply('✅ Anti-sticker ENABLED! All stickers will be deleted.');
            
        } else if (action === 'off' || action === 'disable') {
            database.updateGroupSettings(from, { antisticker: false });
            await reply('❌ Anti-sticker DISABLED! Stickers are now allowed.');
            
        } else if (action === 'status') {
            await buttons.sendButtons(from, {
                text: `📋 *ＡＮＴＩ-ＳＴＩＣＫＥＲ*\n\n` +
                      `Status: ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n\n` +
                      `• ${prefix}antisticker on - Enable\n` +
                      `• ${prefix}antisticker off - Disable`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antisticker_off' : 'antisticker_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
            
        } else {
            await buttons.sendButtons(from, {
                text: `🚫 *ＡＮＴＩ-ＳＴＩＣＫＥＲ*\n\n` +
                      `Status: ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n\n` +
                      `• ${prefix}antisticker on - Enable\n` +
                      `• ${prefix}antisticker off - Disable`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antisticker_off' : 'antisticker_on', type: 'reply' },
                    { text: '📋 STATUS', id: 'antisticker_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
        }
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: false
};