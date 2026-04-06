/**
 * Anti-Group Mention Command - Block forwarded status/group mention messages
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';
import config from '../config.js';

export default {
    name: 'antigroupmention',
    description: 'Block forwarded status/group mention messages',
    aliases: ['antigpmention', 'blockgpmention', 'antigp'],
    
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
        const isEnabled = groupSettings.antigroupmention || false;
        const currentAction = groupSettings.antigroupmentionAction || 'delete';
        
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            database.updateGroupSettings(from, { antigroupmention: true });
            await reply(`✅ Anti-group mention ENABLED! Action: ${currentAction.toUpperCase()}`);
            
        } else if (action === 'off' || action === 'disable') {
            database.updateGroupSettings(from, { antigroupmention: false });
            await reply('❌ Anti-group mention DISABLED!');
            
        } else if (action === 'action') {
            const newAction = args[1]?.toLowerCase();
            if (newAction === 'delete') {
                database.updateGroupSettings(from, { antigroupmentionAction: 'delete' });
                await reply('✅ Action changed to: DELETE');
            } else if (newAction === 'kick') {
                database.updateGroupSettings(from, { antigroupmentionAction: 'kick' });
                await reply('✅ Action changed to: KICK');
            } else {
                await buttons.sendButtons(from, {
                    text: `⚙️ *ＡＣＴＩＯＮ*\n\nCurrent: ${currentAction.toUpperCase()}\n\n🗑️ DELETE - Delete message\n🔨 KICK - Delete AND kick user`,
                    buttons: [
                        { text: '🗑️ DELETE', id: 'antigroupmention_action_delete', type: 'reply' },
                        { text: '🔨 KICK', id: 'antigroupmention_action_kick', type: 'reply' }
                    ]
                }, msg);
                return;
            }
            
        } else if (action === 'settings') {
            await buttons.sendButtons(from, {
                text: `⚙️ *ＳＥＴＴＩＮＧＳ*\n\n` +
                      `Status: ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `Action: ${currentAction.toUpperCase()}\n\n` +
                      `• ${prefix}antigroupmention on - Enable\n` +
                      `• ${prefix}antigroupmention off - Disable\n` +
                      `• ${prefix}antigroupmention action - Change action`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antigroupmention_off' : 'antigroupmention_on', type: 'reply' },
                    { text: '⚙️ ACTION', id: 'antigroupmention_action', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
            
        } else {
            await buttons.sendButtons(from, {
                text: `🚫 *ＡＮＴＩ-ＧＲＯＵＰ ＭＥＮＴＩＯＮ*\n\n` +
                      `Status: ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                      `Action: ${currentAction.toUpperCase()}\n\n` +
                      `• ${prefix}antigroupmention on - Enable\n` +
                      `• ${prefix}antigroupmention off - Disable\n` +
                      `• ${prefix}antigroupmention action - Change action`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antigroupmention_off' : 'antigroupmention_on', type: 'reply' },
                    { text: '⚙️ ACTION', id: 'antigroupmention_action', type: 'reply' },
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