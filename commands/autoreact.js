/**
 * AutoReact Command - Automatically react to messages
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import * as database from '../database.js';

// Store auto-react settings
let autoReactSettings = {
    enabled: false,
    mode: 'bot', // 'bot' = only commands, 'all' = all messages
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
        const { from, sender, reply, react, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Only owner can use this command
        if (!isOwner) {
            await reply('❌ Only bot owner can use this command!');
            return;
        }
        
        const action = args[0]?.toLowerCase();
        const subAction = args[1]?.toLowerCase();
        
        if (action === 'on' || action === 'enable') {
            // Enable autoreact
            autoReactSettings.enabled = true;
            config.autoReact = true;
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＵＴＯ-ＲＥＡＣＴ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🤖 Bot will automatically react to:\n` +
                      `┃\n` +
                      `┃ *Mode: ${autoReactSettings.mode.toUpperCase()}*\n` +
                      `┃\n` +
                      `┃ ${autoReactSettings.mode === 'bot' ? '• Only command messages' : '• All messages'}\n` +
                      `┃\n` +
                      `┃ *Emojis:* ${autoReactSettings.emojis.slice(0, 5).join(' ')}...\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⚙️ MODE', id: 'autoreact_mode', type: 'reply' },
                    { text: '❌ DISABLE', id: 'autoreact_off', type: 'reply' },
                    { text: '📊 STATUS', id: 'autoreact_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'off' || action === 'disable') {
            // Disable autoreact
            autoReactSettings.enabled = false;
            config.autoReact = false;
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＵＴＯ-ＲＥＡＣＴ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🤖 Bot will no longer auto-react\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'autoreact_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'mode') {
            // Change mode
            let newMode = '';
            if (subAction === 'bot') {
                newMode = 'bot';
                autoReactSettings.mode = 'bot';
                config.autoReactMode = 'bot';
            } else if (subAction === 'all') {
                newMode = 'all';
                autoReactSettings.mode = 'all';
                config.autoReactMode = 'all';
            } else {
                // Show mode selection
                await buttons.sendButtons(from, {
                    text: `⚙️ *ＡＵＴＯ-ＲＥＡＣＴ ＭＯＤＥ* ⚙️\n\n` +
                          `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                          `┃\n` +
                          `┃ *Current Mode:* ${autoReactSettings.mode.toUpperCase()}\n` +
                          `┃\n` +
                          `┃ *Available Modes:*\n` +
                          `┃\n` +
                          `┃ 🤖 *BOT MODE* - Reacts only to commands\n` +
                          `┃ 🌐 *ALL MODE* - Reacts to all messages\n` +
                          `┃\n` +
                          `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '🤖 BOT MODE', id: 'autoreact_mode_bot', type: 'reply' },
                        { text: '🌐 ALL MODE', id: 'autoreact_mode_all', type: 'reply' },
                        { text: '⬅️ BACK', id: 'autoreact_status', type: 'reply' }
                    ]
                }, msg);
                return;
            }
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＵＴＯ-ＲＥＡＣＴ ＭＯＤＥ ＣＨＡＮＧＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🔄 Mode changed to: *${newMode.toUpperCase()}*\n` +
                      `┃\n` +
                      `┃ ${newMode === 'bot' ? '🤖 Reacting to commands only' : '🌐 Reacting to all messages'}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📊 STATUS', id: 'autoreact_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'emojis') {
            // Show/Manage emojis
            if (subAction === 'add' && args[2]) {
                // Add new emoji
                const newEmoji = args[2];
                if (!autoReactSettings.emojis.includes(newEmoji)) {
                    autoReactSettings.emojis.push(newEmoji);
                    await reply(`✅ Added emoji: ${newEmoji}`);
                } else {
                    await reply(`⚠️ Emoji ${newEmoji} already exists!`);
                }
            } else if (subAction === 'remove' && args[2]) {
                // Remove emoji
                const removeEmoji = args[2];
                const index = autoReactSettings.emojis.indexOf(removeEmoji);
                if (index > -1) {
                    autoReactSettings.emojis.splice(index, 1);
                    await reply(`✅ Removed emoji: ${removeEmoji}`);
                } else {
                    await reply(`⚠️ Emoji ${removeEmoji} not found!`);
                }
            } else {
                // Show emoji list
                const emojiList = autoReactSettings.emojis.map((e, i) => `${i + 1}. ${e}`).join('\n┃ ');
                
                await buttons.sendButtons(from, {
                    text: `🎨 *ＡＵＴＯ-ＲＥＡＣＴ ＥＭＯＪＩＳ* 🎨\n\n` +
                          `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                          `┃\n` +
                          `┃ *Current Emojis:*\n` +
                          `┃ ${emojiList}\n` +
                          `┃\n` +
                          `┃ *Commands:*\n` +
                          `┃ • ${prefix}autoreact emojis add 😍\n` +
                          `┃ • ${prefix}autoreact emojis remove 😍\n` +
                          `┃\n` +
                          `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '➕ ADD EMOJI', id: 'autoreact_emojis_add', type: 'reply' },
                        { text: '➖ REMOVE EMOJI', id: 'autoreact_emojis_remove', type: 'reply' },
                        { text: '⬅️ BACK', id: 'autoreact_status', type: 'reply' }
                    ]
                }, msg);
            }
            
        } else if (action === 'status') {
            // Show current status
            await buttons.sendButtons(from, {
                text: `📊 *ＡＵＴＯ-ＲＥＡＣＴ ＳＴＡＴＵＳ* 📊\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🛡️ *Status:* ${autoReactSettings.enabled ? '✅ ENABLED' : '❌ DISABLED'}\n` +
                      `┃ 🎮 *Mode:* ${autoReactSettings.mode.toUpperCase()}\n` +
                      `┃ 🎨 *Emojis:* ${autoReactSettings.emojis.length} loaded\n` +
                      `┃\n` +
                      `┃ *Preview:* ${autoReactSettings.emojis.slice(0, 6).join(' ')}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: autoReactSettings.enabled ? '❌ DISABLE' : '✅ ENABLE', id: autoReactSettings.enabled ? 'autoreact_off' : 'autoreact_on', type: 'reply' },
                    { text: '⚙️ MODE', id: 'autoreact_mode', type: 'reply' },
                    { text: '🎨 EMOJIS', id: 'autoreact_emojis', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show help menu
            await buttons.sendButtons(from, {
                text: `🤖 *ＡＵＴＯ-ＲＥＡＣＴ ＣＯＭＭＡＮＤ* 🤖\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}autoreact on - Enable\n` +
                      `┃ • ${prefix}autoreact off - Disable\n` +
                      `┃ • ${prefix}autoreact mode bot/all - Change mode\n` +
                      `┃ • ${prefix}autoreact emojis - Manage emojis\n` +
                      `┃ • ${prefix}autoreact status - Check status\n` +
                      `┃\n` +
                      `┃ *Current Status:* ${autoReactSettings.enabled ? '✅ ON' : '❌ OFF'}\n` +
                      `┃ *Current Mode:* ${autoReactSettings.mode.toUpperCase()}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: autoReactSettings.enabled ? '❌ DISABLE' : '✅ ENABLE', id: autoReactSettings.enabled ? 'autoreact_off' : 'autoreact_on', type: 'reply' },
                    { text: '⚙️ MODE', id: 'autoreact_mode', type: 'reply' },
                    { text: '🎨 EMOJIS', id: 'autoreact_emojis', type: 'reply' },
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