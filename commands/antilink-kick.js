const fs = require('fs');
const path = require('path');

// File to store antilink settings
const ANTILINK_FILE = './data/antilink.json';

// Ensure data directory exists
if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
}

// Load antilink settings
function loadAntilinkSettings() {
    try {
        if (fs.existsSync(ANTILINK_FILE)) {
            return JSON.parse(fs.readFileSync(ANTILINK_FILE, 'utf8'));
        }
    } catch (error) {
        console.error('Error loading antilink settings:', error);
    }
    return {};
}

// Save antilink settings
function saveAntilinkSettings(settings) {
    try {
        fs.writeFileSync(ANTILINK_FILE, JSON.stringify(settings, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving antilink settings:', error);
        return false;
    }
}

// Common domain patterns to detect
const COMMON_DOMAINS = [
    'whatsapp.com', 'wa.me', 'chat.whatsapp.com', // WhatsApp links
    'youtube.com', 'youtu.be', // YouTube
    'facebook.com', 'fb.com', 'fb.me', // Facebook
    'instagram.com', 'instagr.am', // Instagram
    'twitter.com', 't.co', // Twitter
    'tiktok.com', // TikTok
    'snapchat.com', // Snapchat
    'telegram.org', 't.me', // Telegram
    'discord.com', 'discord.gg', // Discord
    'reddit.com', // Reddit
    'linkedin.com', // LinkedIn
    'pinterest.com', // Pinterest
    'amazon.com', // Amazon
    'ebay.com', // eBay
    'netflix.com', // Netflix
    'spotify.com', // Spotify
    'paypal.com', // PayPal
    'google.com', 'goo.gl', // Google
    'bit.ly', 'tinyurl.com' // URL shorteners
];

// Function to detect links in message
function detectLinks(message) {
    if (!message) return false;
    
    // URL pattern matching
    const urlPattern = /(https?:\/\/[^\s]+)/gi;
    const matches = message.match(urlPattern);
    
    if (!matches) return false;
    
    // Check if any detected URL contains common domain patterns
    for (const url of matches) {
        for (const domain of COMMON_DOMAINS) {
            if (url.toLowerCase().includes(domain)) {
                return true;
            }
        }
    }
    
    return false;
}

// Antilink-kick command handler
async function antilinkKickCommand(sock, chatId, message, args) {
    const isGroup = chatId.endsWith('@g.us');
    
    if (!isGroup) {
        await sock.sendMessage(chatId, {
            text: '❌ This command can only be used in groups!',
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });
        return;
    }
    
    const sender = message.key.participant || message.key.remoteJid;
    
    // Check if user is admin
    const { isSenderAdmin, isBotAdmin } = await require('../lib/isAdmin')(sock, chatId, sender);
    
    if (!isBotAdmin) {
        await sock.sendMessage(chatId, {
            text: '❌ Bot must be an admin to use antilink-kick feature!',
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });
        return;
    }
    
    if (!isSenderAdmin && !message.key.fromMe) {
        await sock.sendMessage(chatId, {
            text: '❌ Only group admins can configure antilink-kick!',
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });
        return;
    }
    
    const action = args[0]?.toLowerCase();
    const settings = loadAntilinkSettings();
    
    if (!action || (action !== 'on' && action !== 'off' && action !== 'status')) {
        // Show current status and usage
        const currentStatus = settings[chatId]?.enabled ? '🟢 ENABLED' : '🔴 DISABLED';
        const kickCount = settings[chatId]?.kickCount || 0;
        
        await sock.sendMessage(chatId, {
            text: `🔗 *ANTILINK-KICK SETTINGS*\n\n` +
                 `Status: ${currentStatus}\n` +
                 `Links Detected: ${kickCount}\n\n` +
                 `*Usage:*\n` +
                 `.antilinkkick on - Enable link detection & auto-kick\n` +
                 `.antilinkkick off - Disable link detection\n` +
                 `.antilinkkick status - Show current status\n\n` +
                 `*Note:* When enabled, users posting links will be automatically kicked from the group.`,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });
        return;
    }
    
    if (action === 'on') {
        if (!settings[chatId]) {
            settings[chatId] = {};
        }
        settings[chatId].enabled = true;
        settings[chatId].kickCount = settings[chatId].kickCount || 0;
        
        if (saveAntilinkSettings(settings)) {
            await sock.sendMessage(chatId, {
                text: '✅ *ANTILINK-KICK ENABLED*\n\nUsers posting links will now be automatically kicked from the group.',
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
        } else {
            await sock.sendMessage(chatId, {
                text: '❌ Failed to enable antilink-kick. Check console for details.',
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
        }
    } 
    else if (action === 'off') {
        if (settings[chatId]) {
            settings[chatId].enabled = false;
        }
        
        if (saveAntilinkSettings(settings)) {
            await sock.sendMessage(chatId, {
                text: '❌ *ANTILINK-KICK DISABLED*\n\nLink detection and auto-kick have been disabled.',
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
        } else {
            await sock.sendMessage(chatId, {
                text: '❌ Failed to disable antilink-kick. Check console for details.',
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
        }
    }
    else if (action === 'status') {
        const status = settings[chatId]?.enabled ? '🟢 ENABLED' : '🔴 DISABLED';
        const kickCount = settings[chatId]?.kickCount || 0;
        
        await sock.sendMessage(chatId, {
            text: `🔗 *ANTILINK-KICK STATUS*\n\nStatus: ${status}\nLinks Detected: ${kickCount}`,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });
    }
}

// Function to check links and kick users
async function checkLinksAndKick(sock, message) {
    try {
        const chatId = message.key.remoteJid;
        if (!chatId.endsWith('@g.us')) return; // Only check in groups
        
        const settings = loadAntilinkSettings();
        if (!settings[chatId]?.enabled) return; // Feature not enabled
        
        // Check if bot is admin
        const { isBotAdmin } = await require('../lib/isAdmin')(sock, chatId, sock.user.id);
        if (!isBotAdmin) return; // Bot needs to be admin to kick
        
        const sender = message.key.participant || message.key.remoteJid;
        if (!sender) return;
        
        // Don't kick admins or the bot itself
        const { isSenderAdmin } = await require('../lib/isAdmin')(sock, chatId, sender);
        if (isSenderAdmin || message.key.fromMe) return;
        
        // Extract message text
        const messageText = (
            message.message?.conversation ||
            message.message?.extendedTextMessage?.text ||
            message.message?.imageMessage?.caption ||
            message.message?.videoMessage?.caption ||
            ''
        );
        
        // Check for links
        if (detectLinks(messageText)) {
            // Update kick count
            settings[chatId].kickCount = (settings[chatId].kickCount || 0) + 1;
            saveAntilinkSettings(settings);
            
            // Get user info for notification
            const groupMetadata = await sock.groupMetadata(chatId);
            const user = groupMetadata.participants.find(p => p.id === sender);
            const userName = user?.name || sender.split('@')[0];
            
            try {
                // Kick the user
                await sock.groupParticipantsUpdate(chatId, [sender], 'remove');
                
                // Send notification
                await sock.sendMessage(chatId, {
                    text: `🚫 *LINK DETECTED*\n\n@${userName.split('@')[0]} has been kicked for posting a link.\n\n*Message:* ${messageText.substring(0, 50)}...`,
                    mentions: [sender],
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363420143192043@newsletter',
                            newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                            serverMessageId: -1
                        }
                    }
                });
                
                console.log(`Kicked user ${sender} from ${chatId} for posting a link`);
            } catch (kickError) {
                console.error('Error kicking user:', kickError);
                
                // Notify if kick failed
                await sock.sendMessage(chatId, {
                    text: `⚠️ Failed to kick user for posting link. Bot may need higher permissions.`,
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363420143192043@newsletter',
                            newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                            serverMessageId: -1
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error in checkLinksAndKick:', error);
    }
}

module.exports = {
    antilinkKickCommand,
    checkLinksAndKick,
    detectLinks
};