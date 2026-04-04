/**
 * Mode Command - Switch bot between private and public mode
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to store mode setting
const MODE_FILE = path.join(__dirname, '../database/mode.json');

// Load current mode
function loadMode() {
    try {
        if (fs.existsSync(MODE_FILE)) {
            const data = JSON.parse(fs.readFileSync(MODE_FILE, 'utf8'));
            return data.mode || 'public';
        }
    } catch (error) {
        console.error('Failed to load mode:', error);
    }
    return 'public'; // Default mode
}

// Save mode
function saveMode(mode) {
    try {
        const dir = path.dirname(MODE_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(MODE_FILE, JSON.stringify({ mode, updatedAt: Date.now() }, null, 2));
        return true;
    } catch (error) {
        console.error('Failed to save mode:', error);
        return false;
    }
}

// Update config.js selfMode value
function updateConfigMode(mode) {
    try {
        const configPath = path.join(__dirname, '../config.js');
        if (fs.existsSync(configPath)) {
            let configContent = fs.readFileSync(configPath, 'utf8');
            const isPrivate = mode === 'private';
            const newSelfMode = isPrivate ? 'true' : 'false';
            
            // Update selfMode in config
            configContent = configContent.replace(
                /selfMode:\s*(true|false)/,
                `selfMode: ${newSelfMode}`
            );
            
            fs.writeFileSync(configPath, configContent);
            return true;
        }
    } catch (error) {
        console.error('Failed to update config:', error);
    }
    return false;
}

export default {
    name: 'mode',
    description: 'Switch bot between private and public mode',
    aliases: ['botmode', 'privatemode', 'publicmode', 'setmode'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isOwner } = context;
        const buttons = new ButtonManager(sock);
        
        // Only owner can change mode
        if (!isOwner) {
            await buttons.sendButtons(from, {
                text: `❌ *ＡＣＣＥＳＳ ＤＥＮＩＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ This command is only for the bot owner!\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        const action = args[0]?.toLowerCase();
        const currentMode = loadMode();
        
        // Handle different actions
        if (action === 'private' || action === 'priv' || action === 'on') {
            // Switch to private mode
            if (currentMode === 'private') {
                await reply('⚠️ Bot is already in **PRIVATE MODE**!');
                return;
            }
            
            saveMode('private');
            updateConfigMode('private');
            
            await buttons.sendButtons(from, {
                text: `🔒 *ＢＯＴ ＭＯＤＥ： ＰＲＩＶＡＴＥ* 🔒\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🔐 *Only the bot owner* can use commands\n` +
                      `┃ 👑 Other users will be restricted\n` +
                      `┃\n` +
                      `┃ *Changes:*\n` +
                      `┃ • selfMode enabled\n` +
                      `┃ • Commands limited to owner\n` +
                      `┃ • Non-owner commands blocked\n` +
                      `┃\n` +
                      `┃ *To switch back:*\n` +
                      `┃ ${context.prefix || '.'}mode public\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🌐 GO PUBLIC', id: 'mode_public', type: 'reply' },
                    { text: '📊 STATUS', id: 'mode_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('🔒');
            
        } else if (action === 'public' || action === 'pub' || action === 'off') {
            // Switch to public mode
            if (currentMode === 'public') {
                await reply('⚠️ Bot is already in **PUBLIC MODE**!');
                return;
            }
            
            saveMode('public');
            updateConfigMode('public');
            
            await buttons.sendButtons(from, {
                text: `🌐 *ＢＯＴ ＭＯＤＥ： ＰＵＢＬＩＣ* 🌐\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🌍 *Everyone can use commands*\n` +
                      `┃ 👥 All users have access\n` +
                      `┃\n` +
                      `┃ *Changes:*\n` +
                      `┃ • selfMode disabled\n` +
                      `┃ • All commands available\n` +
                      `┃ • Public access granted\n` +
                      `┃\n` +
                      `┃ *To switch back:*\n` +
                      `┃ ${context.prefix || '.'}mode private\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔒 GO PRIVATE', id: 'mode_private', type: 'reply' },
                    { text: '📊 STATUS', id: 'mode_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('🌐');
            
        } else if (action === 'status' || !action) {
            // Show current mode status
            const isPrivate = currentMode === 'private';
            
            const statusText = isPrivate
                ? `🔒 *ＰＲＩＶＡＴＥ ＭＯＤＥ* 🔒\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 🚫 Status: *RESTRICTED*\n` +
                  `┃ 👑 Only bot owner can use commands\n` +
                  `┃\n` +
                  `┃ *Who can use:*\n` +
                  `┃ ✅ Bot Owner\n` +
                  `┃ ❌ All other users\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯`
                : `🌐 *ＰＵＢＬＩＣ ＭＯＤＥ* 🌐\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 🌍 Status: *OPEN*\n` +
                  `┃ 👥 Everyone can use commands\n` +
                  `┃\n` +
                  `┃ *Who can use:*\n` +
                  `┃ ✅ Bot Owner\n` +
                  `┃ ✅ All users\n` +
                  `┃ ✅ Groups & Private chats\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯`;
            
            await buttons.sendButtons(from, {
                text: `⚙️ *ＢＯＴ ＭＯＤＥ ＳＴＡＴＵＳ* ⚙️\n\n${statusText}\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isPrivate ? '🌐 SWITCH TO PUBLIC' : '🔒 SWITCH TO PRIVATE', id: isPrivate ? 'mode_public' : 'mode_private', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'toggle') {
            // Toggle between modes
            const newMode = currentMode === 'private' ? 'public' : 'private';
            const args = [newMode];
            await this.execute(sock, msg, args, context);
            return;
            
        } else {
            // Show help
            await buttons.sendButtons(from, {
                text: `⚙️ *ＢＯＴ ＭＯＤＥ ＣＯＭＭＡＮＤＳ* ⚙️\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${context.prefix || '.'}mode - Show status\n` +
                      `┃ • ${context.prefix || '.'}mode public - Public mode\n` +
                      `┃ • ${context.prefix || '.'}mode private - Private mode\n` +
                      `┃ • ${context.prefix || '.'}mode toggle - Switch mode\n` +
                      `┃\n` +
                      `┃ *Current Mode:* ${currentMode === 'private' ? '🔒 PRIVATE' : '🌐 PUBLIC'}\n` +
                      `┃\n` +
                      `┃ *What each mode does:*\n` +
                      `┃\n` +
                      `┃ 🔒 *Private Mode*\n` +
                      `┃ • Only owner can use commands\n` +
                      `┃ • Best for maintenance\n` +
                      `┃\n` +
                      `┃ 🌐 *Public Mode*\n` +
                      `┃ • Everyone can use commands\n` +
                      `┃ • Normal operation\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: currentMode === 'private' ? '🌐 SWITCH TO PUBLIC' : '🔒 SWITCH TO PRIVATE', id: currentMode === 'private' ? 'mode_public' : 'mode_private', type: 'reply' },
                    { text: '🔄 TOGGLE', id: 'mode_toggle', type: 'reply' },
                    { text: '📊 STATUS', id: 'mode_status', type: 'reply' },
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