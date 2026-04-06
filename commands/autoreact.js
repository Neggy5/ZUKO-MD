/**
 * AutoReact Command - Automatically react to messages
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';
import config from '../config.js';

// Store auto-react settings
let autoReactSettings = {
    enabled: false,
    mode: 'bot',
    emojis: ['❤️', '🔥', '👌', '💀', '😁', '✨', '👍', '🤨', '😎', '😂', '🤝', '💫']
};

// Load settings from config
try {
    if (config.autoReact) autoReactSettings.enabled = true;
    if (config.autoReactMode) autoReactSettings.mode = config.autoReactMode;
} catch (e) {}

export default {
    name: 'autoreact',
    description: 'Automatically react to messages',
    aliases: ['autoreaction', 'reactauto', 'autoreact'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        if (!isOwner) {
            await reply('❌ Only bot owner can use this command!');
            return;
        }
        
        const action = args[0]?.toLowerCase();
        const subAction = args[1]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            autoReactSettings.enabled = true;
            if (config) config.autoReact = true;
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＵＴＯ-ＲＥＡＣＴ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `🤖 Mode: ${autoReactSettings.mode.toUpperCase()}\n` +
                      `📝 ${autoReactSettings.mode === 'bot' ? 'Reacting to commands only' : 'Reacting to all messages'}\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⚙️ MODE', id: 'autoreact_mode', type: 'reply' },
                    { text: '❌ DISABLE', id: 'autoreact_off', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            autoReactSettings.enabled = false;
            if (config) config.autoReact = false;
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＵＴＯ-ＲＥＡＣＴ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `🤖 Bot will no longer auto-react\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'autoreact_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'mode') {
            if (subAction === 'bot') {
                autoReactSettings.mode = 'bot';
                if (config) config.autoReactMode = 'bot';
                await reply('✅ Mode changed to: **BOT MODE** (only commands)');
            } else if (subAction === 'all') {
                autoReactSettings.mode = 'all';
                if (config) config.autoReactMode = 'all';
                await reply('✅ Mode changed to: **ALL MODE** (all messages)');
            } else {
                await buttons.sendButtons(from, {
                    text: `⚙️ *ＡＵＴＯ-ＲＥＡＣＴ ＭＯＤＥ*\n\n` +
                          `Current: ${autoReactSettings.mode.toUpperCase()}\n\n` +
                          `🤖 BOT MODE - Reacts only to commands\n` +
                          `🌐 ALL MODE - Reacts to all messages`,
                    buttons: [
                        { text: '🤖 BOT MODE', id: 'autoreact_mode_bot', type: 'reply' },
                        { text: '🌐 ALL MODE', id: 'autoreact_mode_all', type: 'reply' }
                    ]
                }, msg);
                return;
            }
            
        } else if (action === 'status') {
            await buttons.sendButtons(from, {
                text: `📊 *ＡＵＴＯ-ＲＥＡＣＴ ＳＴＡＴＵＳ*\n\n` +
                      `Status: ${autoReactSettings.enabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `Mode: ${autoReactSettings.mode.toUpperCase()}\n` +
                      `Emojis: ${autoReactSettings.emojis.length} loaded\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: autoReactSettings.enabled ? '❌ DISABLE' : '✅ ENABLE', id: autoReactSettings.enabled ? 'autoreact_off' : 'autoreact_on', type: 'reply' },
                    { text: '⚙️ MODE', id: 'autoreact_mode', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            await buttons.sendButtons(from, {
                text: `🤖 *ＡＵＴＯ-ＲＥＡＣＴ ＣＯＭＭＡＮＤ*\n\n` +
                      `• ${prefix}autoreact on - Enable\n` +
                      `• ${prefix}autoreact off - Disable\n` +
                      `• ${prefix}autoreact mode bot/all - Change mode\n` +
                      `• ${prefix}autoreact status - Check status\n\n` +
                      `Current: ${autoReactSettings.enabled ? '✅ ON' : '❌ OFF'}\n` +
                      `Mode: ${autoReactSettings.mode.toUpperCase()}\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: autoReactSettings.enabled ? '❌ DISABLE' : '✅ ENABLE', id: autoReactSettings.enabled ? 'autoreact_off' : 'autoreact_on', type: 'reply' },
                    { text: '⚙️ MODE', id: 'autoreact_mode', type: 'reply' },
                    { text: '📊 STATUS', id: 'autoreact_status', type: 'reply' },
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

export { autoReactSettings };