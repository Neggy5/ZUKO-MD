/**
 * AutoBio Command - Set automatic rotating about/bio for bot
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Store auto-bio status (persisted to file)
const STATUS_FILE = path.join(__dirname, '../database/autobio.json');
let autoBioEnabled = false;
let bioInterval = null;
let currentBioIndex = 0;
let currentSock = null;

// Bio templates (About section text)
const bios = [
    "⚡ ZUKO MD - Your WhatsApp Assistant",
    "🔥 Powered by ZUKO MD",
    "💫 24/7 Active - Always ready to help",
    "🤖 Multi-command WhatsApp Bot",
    "✨ Type .menu for commands",
    "📢 Join our channel for updates",
    "🔰 ZUKO MD - Simple & Powerful",
    "💎 Made with ❤️ for WhatsApp",
    "🚀 Fast & Reliable Bot Service",
    "⭐ Try .ping to check response time"
];

// Load saved status
function loadStatus() {
    try {
        if (fs.existsSync(STATUS_FILE)) {
            const data = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
            autoBioEnabled = data.enabled || false;
            currentBioIndex = data.index || 0;
            console.log(`📋 Auto-bio status loaded: ${autoBioEnabled ? 'ON' : 'OFF'}`);
            return true;
        }
    } catch (error) {
        console.error('Failed to load auto-bio status:', error);
    }
    return false;
}

// Save status
function saveStatus() {
    try {
        const dir = path.dirname(STATUS_FILE);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(STATUS_FILE, JSON.stringify({
            enabled: autoBioEnabled,
            index: currentBioIndex
        }, null, 2));
    } catch (error) {
        console.error('Failed to save auto-bio status:', error);
    }
}

// Update bio/about text
async function updateBio(sock, bioText) {
    if (!sock) {
        console.error('No socket available for bio update');
        return false;
    }
    
    try {
        // Method 1: updateProfileStatus (for about/bio)
        await sock.updateProfileStatus(bioText);
        console.log(`✅ About/Bio updated: ${bioText}`);
        return true;
    } catch (error) {
        console.error(`Failed to update bio: ${error.message}`);
        
        // Method 2: Try setting status directly
        try {
            if (sock.setStatus) {
                await sock.setStatus(bioText);
                console.log(`✅ About/Bio updated via setStatus: ${bioText}`);
                return true;
            }
        } catch (e) {
            console.error(`setStatus also failed: ${e.message}`);
        }
        
        // Method 3: Try sending a status update via query
        try {
            if (sock.query) {
                await sock.query({
                    tag: 'iq',
                    attrs: {
                        to: 's.whatsapp.net',
                        type: 'set',
                        xmlns: 'status'
                    },
                    content: [
                        {
                            tag: 'status',
                            attrs: {},
                            content: bioText
                        }
                    ]
                });
                console.log(`✅ About/Bio updated via query: ${bioText}`);
                return true;
            }
        } catch (e) {
            console.error(`Query method also failed: ${e.message}`);
        }
        
        return false;
    }
}

// Start rotation
async function startRotation(sock) {
    if (bioInterval) clearInterval(bioInterval);
    
    if (!autoBioEnabled || !sock) return;
    
    currentSock = sock;
    
    // Set initial bio
    const success = await updateBio(sock, bios[currentBioIndex]);
    if (!success) {
        console.warn('⚠️ Could not update bio. Make sure the bot is connected properly.');
    }
    
    // Rotate every 30 minutes
    bioInterval = setInterval(async () => {
        if (!autoBioEnabled) return;
        
        currentBioIndex = (currentBioIndex + 1) % bios.length;
        await updateBio(currentSock, bios[currentBioIndex]);
        saveStatus();
    }, 30 * 60 * 1000);
}

// Stop rotation
function stopRotation() {
    if (bioInterval) {
        clearInterval(bioInterval);
        bioInterval = null;
    }
}

export default {
    name: 'autobio',
    description: 'Enable/disable automatic rotating about/bio for the bot',
    aliases: ['bio', 'rotatebio', 'autobio', 'setabout'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isOwner } = context;
        const buttons = new ButtonManager(sock);
        
        // Only owner can use this command
        if (!isOwner) {
            await reply('❌ Only bot owner can use this command!');
            return;
        }
        
        const action = args[0]?.toLowerCase();
        
        if (action === 'on' || action === 'enable' || action === 'start') {
            // Enable auto-bio
            if (autoBioEnabled) {
                await buttons.sendButtons(from, {
                    text: `⚠️ *ＡＵＴＯ-ＢＩＯ ＡＬＲＥＡＤＹ ＥＮＡＢＬＥＤ*\n\n` +
                          `Auto-bio is already running!\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '⏹️ STOP', id: 'autobio_off', type: 'reply' },
                        { text: '📋 STATUS', id: 'autobio_status', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                return;
            }
            
            autoBioEnabled = true;
            saveStatus();
            
            // Start rotation
            await startRotation(sock);
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＵＴＯ-ＢＩＯ ＥＮＡＢＬＥＤ* ✅\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🔄 About/Bio will rotate every 30 minutes\n` +
                      `┃ 📝 ${bios.length} bio templates loaded\n` +
                      `┃\n` +
                      `┃ *Current About:*\n` +
                      `┃ ${bios[currentBioIndex]}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⏹️ STOP', id: 'autobio_off', type: 'reply' },
                    { text: '📋 LIST BIOS', id: 'autobio_list', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } else if (action === 'off' || action === 'disable' || action === 'stop') {
            // Disable auto-bio
            if (!autoBioEnabled) {
                await reply('⚠️ Auto-bio is already disabled!');
                return;
            }
            
            autoBioEnabled = false;
            stopRotation();
            saveStatus();
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＵＴＯ-ＢＩＯ ＤＩＳＡＢＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🔄 Auto-bio rotation has been stopped\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'autobio_on', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('⏹️');
            
        } else if (action === 'list' || action === 'show') {
            // Show all bios
            let bioList = `📋 *ＡＵＴＯ-ＢＩＯ ＴＥＭＰＬＡＴＥＳ*\n\n`;
            bios.forEach((bio, i) => {
                const current = (i === currentBioIndex && autoBioEnabled) ? ' 🔄 (CURRENT)' : '';
                bioList += `${i + 1}. ${bio}${current}\n`;
            });
            bioList += `\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
            
            await buttons.sendButtons(from, {
                text: bioList,
                buttons: [
                    { text: '✅ ENABLE', id: 'autobio_on', type: 'reply' },
                    { text: '🔄 STATUS', id: 'autobio_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'status') {
            // Show current status
            const statusText = autoBioEnabled 
                ? `✅ *ＡＵＴＯ-ＢＩＯ ＩＳ ＡＣＴＩＶＥ*\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 🔄 Rotating every 30 minutes\n` +
                  `┃ 📝 Current bio #${currentBioIndex + 1}\n` +
                  `┃\n` +
                  `┃ *Current About:*\n` +
                  `┃ ${bios[currentBioIndex]}\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯`
                : `❌ *ＡＵＴＯ-ＢＩＯ ＩＳ ＩＮＡＣＴＩＶＥ*\n\n` +
                  `Use .autobio on to enable\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
            
            await buttons.sendButtons(from, {
                text: statusText,
                buttons: [
                    { text: autoBioEnabled ? '⏹️ STOP' : '✅ START', id: autoBioEnabled ? 'autobio_off' : 'autobio_on', type: 'reply' },
                    { text: '📋 LIST', id: 'autobio_list', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else if (action === 'set' && args[1]) {
            // Set custom bio (owner only)
            const customBio = args.slice(1).join(' ');
            if (customBio.length > 139) {
                await reply('❌ Bio too long! Maximum 139 characters.');
                return;
            }
            
            const success = await updateBio(sock, customBio);
            if (success) {
                await reply(`✅ About/Bio updated to:\n\n${customBio}`);
            } else {
                await reply(`❌ Failed to update about/bio. Make sure the bot is connected properly.`);
            }
            
        } else if (action === 'test') {
            // Test if bio update works
            await react('🔄');
            const testBio = `🔄 ZUKO MD Test - ${new Date().toLocaleTimeString()}`;
            const success = await updateBio(sock, testBio);
            
            if (success) {
                await reply(`✅ Test successful! About/Bio updated to:\n\n${testBio}`);
            } else {
                await reply(`❌ Test failed! Could not update about/bio.\n\nPossible reasons:\n• Bot may not have permission\n• WhatsApp API limitation\n• Network issue`);
            }
            await react(success ? '✅' : '❌');
            
        } else {
            // Show help
            await buttons.sendButtons(from, {
                text: `🤖 *ＡＵＴＯ-ＢＩＯ ＣＯＭＭＡＮＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • .autobio on - Enable auto-bio\n` +
                      `┃ • .autobio off - Disable auto-bio\n` +
                      `┃ • .autobio list - Show bio templates\n` +
                      `┃ • .autobio status - Check current status\n` +
                      `┃ • .autobio set <text> - Set custom about\n` +
                      `┃ • .autobio test - Test if bio update works\n` +
                      `┃\n` +
                      `┃ *Info:*\n` +
                      `┃ 🔄 Rotates every 30 minutes\n` +
                      `┃ 📝 ${bios.length} bio templates\n` +
                      `┃ 📝 Max length: 139 characters\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ENABLE', id: 'autobio_on', type: 'reply' },
                    { text: '📋 LIST', id: 'autobio_list', type: 'reply' },
                    { text: '🧪 TEST', id: 'autobio_test', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
        }
    },
    
    ownerOnly: true,
    groupOnly: false,
    adminOnly: false
};

// Load status on module load
loadStatus();

// Export functions for use in index.js
export { startRotation, stopRotation, autoBioEnabled, updateBio };