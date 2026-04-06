/**
 * Anti-Tag Command - Block mass mentions/tagall in groups
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';
import config from '../config.js';

export default {
    name: 'antitag',
    description: 'Block mass mentions/tagall in groups',
    aliases: ['antitagall', 'blocktag', 'tagprotect'],
    
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
        const isEnabled = groupSettings.antitag || false;
        const currentAction = groupSettings.antitagAction || 'delete';
        
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            database.updateGroupSettings(from, { antitag: true });
            await reply(`✅ Anti-tag ENABLED! Action: ${currentAction.toUpperCase()}`);
            
        } else if (action === 'off' || action === 'disable') {
            database.updateGroupSettings(from, { antitag: false });
            await reply('❌ Anti-tag DISABLED!');
            
        } else if (action === 'action') {
            const newAction = args[1]?.toLowerCase();
            if (newAction === 'delete') {
                database.updateGroupSettings(from, { antitagAction: 'delete' });
                await reply('✅ Anti-tag action changed to: DELETE');
            } else if (newAction === 'kick') {
                database.updateGroupSettings(from, { antitagAction: 'kick' });
                await reply('✅ Anti-tag action changed to: KICK');
            } else {
                await buttons.sendButtons(from, {
                    text: `⚙️ *ＡＮＴＩ-ＴＡＧ ＡＣＴＩＯＮ*\n\nCurrent: ${currentAction.toUpperCase()}\n\n🗑️ DELETE - Delete message only\n🔨 KICK - Delete AND kick user`,
                    buttons: [
                        { text: '🗑️ DELETE', id: 'antitag_action_delete', type: 'reply' },
                        { text: '🔨 KICK', id: 'antitag_action_kick', type: 'reply' }
                    ]
                }, msg);
                return;
            }
            
        } else if (action === 'settings') {
            await buttons.sendButtons(from, {
                text: `⚙️ *ＡＮＴＩ-ＴＡＧ ＳＥＴＴＩＮＧＳ*\n\n` +
                      `Status: ${isEnabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `Action: ${currentAction.toUpperCase()}\n\n` +
                      `• ${prefix}antitag on - Enable\n` +
                      `• ${prefix}antitag off - Disable\n` +
                      `• ${prefix}antitag action - Change action`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antitag_off' : 'antitag_on', type: 'reply' },
                    { text: '⚙️ ACTION', id: 'antitag_action', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
            
        } else {
            await buttons.sendButtons(from, {
                text: `🚫 *ＡＮＴＩ-ＴＡＧ*\n\n` +
                      `Status: ${isEnabled ? '✅ ACTIVE' : '❌ INACTIVE'}\n` +
                      `Action: ${currentAction.toUpperCase()}\n\n` +
                      `• ${prefix}antitag on - Enable\n` +
                      `• ${prefix}antitag off - Disable\n` +
                      `• ${prefix}antitag action - Change action`,
                buttons: [
                    { text: isEnabled ? '❌ DISABLE' : '✅ ENABLE', id: isEnabled ? 'antitag_off' : 'antitag_on', type: 'reply' },
                    { text: '⚙️ ACTION', id: 'antitag_action', type: 'reply' },
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