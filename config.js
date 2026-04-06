/**
 * Global Configuration for WhatsApp MD Bot
 * ES Module version with dynamic mode support
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to check if bot is in private mode (reads from mode.json)
function isPrivateMode() {
    try {
        const modeFile = path.join(__dirname, 'database/mode.json');
        if (fs.existsSync(modeFile)) {
            const data = JSON.parse(fs.readFileSync(modeFile, 'utf8'));
            return data.mode === 'private';
        }
    } catch (error) {
        // Silent fail - return default
    }
    return false; // Default to public
}

// Function to get current mode status
export function getCurrentMode() {
    try {
        const modeFile = path.join(__dirname, 'database/mode.json');
        if (fs.existsSync(modeFile)) {
            const data = JSON.parse(fs.readFileSync(modeFile, 'utf8'));
            return data.mode || 'public';
        }
    } catch (error) {}
    return 'public';
}

const config = {
    // Bot Owner Configuration
    ownerNumber: ['234xxxxxxxxxx', '2349079055953'], // Add your number without + or spaces
    ownerName: ['ZUKO-MD', 'Savage'], // Owner names corresponding to ownerNumber array
    
    // Bot Configuration
    botName: 'ZUKO-MD',
    prefix: '.',
    sessionName: 'session',
    sessionID: process.env.SESSION_ID || '',
    newsletterJid: '`0029VbCUOf389inrrurd6n1z@newsletter`', // Newsletter JID for menu forwarding
    updateZipUrl: 'https://github.com/Neggy5/ZUKO-MD/archive/refs/heads/main.zip', // URL to latest code zip for .update command
    
    // Sticker Configuration
    packname: 'ZUKO',
    
    // Bot Behavior - selfMode is now dynamic
    get selfMode() {
        return isPrivateMode();
    },
    autoRead: false,
    autoTyping: false,
    autoBio: false,
    autoSticker: false,
    autoReact: false,
    autoReactMode: 'bot', // set bot or all via cmd
    autoDownload: false,
    
    // Group Settings Defaults
    // In config.js, update the defaultGroupSettings object:

defaultGroupSettings: {
      antilink: false,
      antilinkAction: 'delete', // 'delete', 'kick', 'warn'
      antitag: false,
      antitagAction: 'delete',
      antiall: false, // Owner only - blocks all messages from non-admins
      antiviewonce: false,
      antibot: false,
      anticall: false, // Anti-call feature
      antigroupmention: false, // Anti-group mention feature
      antigroupmentionAction: 'delete', // 'delete', 'kick'
      antisticker: false, // ADD THIS LINE - Block stickers in group
      welcome: false,
      welcomeMessage: '╭╼━≪•𝙽𝙴𝚆 𝙼𝙴𝙼𝙱𝙴𝚁•≫━╾╮\n┃𝚆𝙴𝙻𝙲𝙾𝙼𝙴: @user 👋\n┃Member count: #memberCount\n┃𝚃𝙸𝙼𝙴: time⏰\n╰━━━━━━━━━━━━━━━╯\n\n*@user* Welcome to *@group*! 🎉\n*Group 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽*\ngroupDesc\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ZUKO-MD*',
      goodbye: false,
      goodbyeMessage: 'Goodbye @user 👋 We will never miss you!',
      antiSpam: false,
      antidelete: false,
      nsfw: false,
      detect: false,
      chatbot: false,
      autosticker: false // Auto-convert images/videos to stickers
    },
    
    // API Keys (add your own)
    apiKeys: {
      // Add API keys here if needed
      openai: '',
      deepai: '',
      remove_bg: ''
    },
    
    // Message Configuration
    messages: {
      wait: '⏳ Please wait...',
      success: '✅ Success!',
      error: '❌ Error occurred!',
      ownerOnly: '👑 This command is only for bot owner!',
      adminOnly: '🛡️ This command is only for group admins!',
      groupOnly: '👥 This command can only be used in groups!',
      privateOnly: '💬 This command can only be used in private chat!',
      botAdminNeeded: '🤖 Bot needs to be admin to execute this command!',
      invalidCommand: '❓ Invalid command! Type .menu for help'
    },
    
    // Timezone
    timezone: 'Africa/Lagos', // Changed to Lagos timezone
    
    // Limits
    maxWarnings: 3,
    
    // Social Links (optional)
    social: {
      github: 'https://github.com/Neggy5',
      instagram: 'https://instagram.com/Iam_Zuko',
      youtube: 'http://youtube.com/@ZUKOMD_001'
    }
};

// Export as default for ES modules
export default config;