/**
 * Menu Command - Show bot menu with interactive buttons
 * ES Module version with button support
 * Fetches image from utils/bot_image.jpg
 */

import config from '../config.js';
import { ButtonManager } from '../utils/buttonManager.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    name: 'menu',
    description: 'Show bot menu with interactive buttons',
    aliases: ['help', 'commands', 'utama', 'helpme'],
    
    async execute(sock, msg, args, context) {
        const { from, isOwner, isAdmin, isMod, react } = context;
        const buttons = new ButtonManager(sock);
        
        await react('📋');
        
        // Get bot image from utils/bot_image.jpg
        let botImageBuffer = null;
        const imagePath = path.join(__dirname, '../utils/bot_image.jpg');
        
        try {
            if (fs.existsSync(imagePath)) {
                botImageBuffer = fs.readFileSync(imagePath);
                console.log('✅ Bot image loaded from utils/bot_image.jpg');
            } else {
                console.log('⚠️ bot_image.jpg not found in utils folder');
            }
        } catch (error) {
            console.error('Failed to load bot image:', error.message);
        }
        
        // Bot stats
        const uptime = process.uptime();
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        
        let uptimeString = '';
        if (days > 0) uptimeString += `${days}d `;
        if (hours > 0) uptimeString += `${hours}h `;
        if (minutes > 0) uptimeString += `${minutes}m `;
        uptimeString += `${Math.floor(uptime % 60)}s`;
        
        // Build menu text
        const menuText = `╭━━━❲ *${config.botName}* ❳━━━╮
┃
┃ 🤖 *Bot Information*
┃ ┣━━━━━━━━━━━━━━━━━
┃ ┣ 📛 Name: *${config.botName}*
┃ ┣ ⚡ Prefix: *${config.prefix}*
┃ ┣ 👑 Owner: *${config.ownerName[0]}*
┃ ┣ ⏱️ Uptime: *${uptimeString}*
┃ ┗━━━━━━━━━━━━━━━━━
┃
┃ 📚 *Command Categories*
┃ ┣━━━━━━━━━━━━━━━━━
┃ ┣ 🎮 *General Commands* (12)
┃ ┣ 🛡️ *Anti-Spam/Protection* (6)
┃ ┣ 🔧 *Group Management* (8)
┃ ┣ 📖 *Religious Commands* (2)
┃ ┣ 📥 *Downloader Commands* (6)
┃ ┣ 🎬 *Reaction Commands* (25+)
┃ ┣ 👑 *Owner Commands* (4)
┃ ┗━━━━━━━━━━━━━━━━━
┃
┃ 📢 *WhatsApp Channel*
┃ ┣━━━━━━━━━━━━━━━━━
┃ ┣ 🔔 Join for updates & support
┃ ┗━━━━━━━━━━━━━━━━━
╰━━━━━━━━━━━━━━━━━━━━━╯

*📢 Join our WhatsApp Channel for latest updates!*
> Tap the button below to join`;

        // Create buttons with categories
        const menuButtons = [
            { text: '🎮 GENERAL', id: 'menu_general', type: 'reply' },
            { text: '🛡️ ANTI-SPAM', id: 'menu_antispam', type: 'reply' },
            { text: '🔧 GROUP', id: 'menu_group', type: 'reply' },
            { text: '📖 RELIGIOUS', id: 'menu_religious', type: 'reply' },
            { text: '📥 DOWNLOADER', id: 'menu_downloader', type: 'reply' },
            { text: '🎬 REACTIONS', id: 'menu_reactions', type: 'reply' }
        ];
        
        if (isOwner) {
            menuButtons.push({ text: '👑 OWNER', id: 'menu_owner', type: 'reply' });
        }
        
        menuButtons.push(
            { text: '📢 CHANNEL', id: 'menu_channel', type: 'reply' },
            { text: 'ℹ️ ABOUT', id: 'menu_about', type: 'reply' },
            { text: '📊 STATS', id: 'menu_stats', type: 'reply' }
        );
        
        // Send menu with image if available
        if (botImageBuffer) {
            try {
                await sock.sendMessage(from, {
                    image: botImageBuffer,
                    caption: menuText,
                    buttons: menuButtons.map(btn => ({
                        buttonId: btn.id,
                        buttonText: { displayText: btn.text },
                        type: 1
                    })),
                    headerType: 4
                }, { quoted: msg });
            } catch (error) {
                console.error('Failed to send menu with image:', error.message);
                await buttons.sendButtons(from, {
                    text: menuText,
                    buttons: menuButtons
                }, msg);
            }
        } else {
            await buttons.sendButtons(from, {
                text: menuText,
                buttons: menuButtons
            }, msg);
        }
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};