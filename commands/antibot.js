const fs = require('fs');
const path = require('path');

const ANTIBOT_FILE = path.join(__dirname, '../data/antibot.json');

// Default settings
const DEFAULT_SETTINGS = {
    enabled: false,
    action: 'kick', // 'kick', 'ban', or 'warn'
    banDuration: 24, // hours
    whitelist: [], // array of allowed bot IDs
    detectionMethods: {
        checkPrefix: true, // detects common bot prefixes
        checkUsername: true, // checks for "bot" in username
        checkMessagePatterns: true // detects automated message patterns
    }
};

// Load antibot settings
function loadAntibotSettings() {
    try {
        if (fs.existsSync(ANTIBOT_FILE)) {
            return JSON.parse(fs.readFileSync(ANTIBOT_FILE));
        }
        return DEFAULT_SETTINGS;
    } catch (error) {
        console.error('Error loading antibot settings:', error);
        return DEFAULT_SETTINGS;
    }
}

// Save antibot settings
function saveAntibotSettings(settings) {
    try {
        fs.writeFileSync(ANTIBOT_FILE, JSON.stringify(settings, null, 2));
    } catch (error) {
        console.error('Error saving antibot settings:', error);
    }
}

// Check if user is a bot
function isLikelyBot(user) {
    const settings = loadAntibotSettings();
    
    // Check whitelist first
    if (settings.whitelist.includes(user.id)) {
        return false;
    }

    // Check username patterns
    if (settings.detectionMethods.checkUsername) {
        const username = user.name || '';
        if (username.toLowerCase().includes('bot') ||
            username.toLowerCase().includes('robot') ||
            username.toLowerCase().includes('automation')) {
            return true;
        }
    }

    return false;
}

// Main command handler
async function antibotCommand(sock, chatId, message, args) {
    try {
        const settings = loadAntibotSettings();
        const isGroup = chatId.endsWith('@g.us');
        
        // Check admin status
        const senderId = message.key.participant || message.key.remoteJid;
        const { isUserAdmin } = await isAdmin(sock, chatId, senderId);
        
        if (!isUserAdmin && !message.key.fromMe) {
            await sock.sendMessage(chatId, { 
                text: '❌ Only admins can configure antibot settings!',
                quoted: message
            });
            return;
        }

        if (args.length === 0) {
            // Show current status
            const statusMessage = `🛡 *AntiBot Protection*\n\n` +
                `Status: ${settings.enabled ? '✅ Enabled' : '❌ Disabled'}\n` +
                `Action: ${settings.action}\n` +
                `Ban Duration: ${settings.banDuration} hours\n` +
                `Detection Methods:\n` +
                `• Username Check: ${settings.detectionMethods.checkUsername ? '✅' : '❌'}\n` +
                `• Message Patterns: ${settings.detectionMethods.checkMessagePatterns ? '✅' : '❌'}\n\n` +
                `Whitelisted Bots: ${settings.whitelist.length || 'None'}\n\n` +
                `Usage:\n` +
                `.antibot on/off - Enable/disable\n` +
                `.antibot action <kick|ban|warn> - Set action\n` +
                `.antibot duration <hours> - Set ban duration\n` +
                `.antibot whitelist add/remove <@bot> - Manage whitelist\n` +
                `.antibot detect <method> on/off - Toggle detection methods`;
            
            await sock.sendMessage(chatId, { 
                text: statusMessage,
                quoted: message
            });
            return;
        }

        const subCommand = args[0].toLowerCase();
        
        switch (subCommand) {
            case 'on':
                settings.enabled = true;
                saveAntibotSettings(settings);
                await sock.sendMessage(chatId, { 
                    text: '✅ AntiBot protection enabled',
                    quoted: message
                });
                break;
                
            case 'off':
                settings.enabled = false;
                saveAntibotSettings(settings);
                await sock.sendMessage(chatId, { 
                    text: '❌ AntiBot protection disabled',
                    quoted: message
                });
                break;
                
            case 'action':
                const action = args[1]?.toLowerCase();
                if (!['kick', 'ban', 'warn'].includes(action)) {
                    await sock.sendMessage(chatId, { 
                        text: '❌ Invalid action. Use: kick, ban, or warn',
                        quoted: message
                    });
                    return;
                }
                settings.action = action;
                saveAntibotSettings(settings);
                await sock.sendMessage(chatId, { 
                    text: `✅ Action set to: ${action}`,
                    quoted: message
                });
                break;
                
            case 'duration':
    const duration = parseInt(args[1]);
    if (isNaN(duration)) {  // Fixed line
        await sock.sendMessage(chatId, { 
            text: '❌ Please provide a valid number of hours',
            quoted: message
        });
        return;
    }
    settings.banDuration = duration;
    saveAntibotSettings(settings);
    await sock.sendMessage(chatId, { 
        text: `✅ Ban duration set to ${duration} hours`,
        quoted: message
    });
    break;
                
            case 'whitelist':
                const whitelistAction = args[1]?.toLowerCase();
                const botId = args[2]?.replace('@', '') + '@s.whatsapp.net';
                
                if (!['add', 'remove'].includes(whitelistAction)) {
                    await sock.sendMessage(chatId, { 
                        text: '❌ Usage: .antibot whitelist add/remove @bot',
                        quoted: message
                    });
                    return;
                }
                
                if (whitelistAction === 'add') {
                    if (settings.whitelist.includes(botId)) {
                        await sock.sendMessage(chatId, { 
                            text: '✅ Bot is already whitelisted',
                            quoted: message
                        });
                        return;
                    }
                    settings.whitelist.push(botId);
                    saveAntibotSettings(settings);
                    await sock.sendMessage(chatId, { 
                        text: `✅ Bot whitelisted: ${botId}`,
                        quoted: message
                    });
                } else {
                    settings.whitelist = settings.whitelist.filter(id => id !== botId);
                    saveAntibotSettings(settings);
                    await sock.sendMessage(chatId, { 
                        text: `✅ Bot removed from whitelist: ${botId}`,
                        quoted: message
                    });
                }
                break;
                
            case 'detect':
                const method = args[1]?.toLowerCase();
                const state = args[2]?.toLowerCase();
                
                if (!['username', 'patterns'].includes(method) || !['on', 'off'].includes(state)) {
                    await sock.sendMessage(chatId, { 
                        text: '❌ Usage: .antibot detect <username|patterns> <on|off>',
                        quoted: message
                    });
                    return;
                }
                
                if (method === 'username') {
                    settings.detectionMethods.checkUsername = state === 'on';
                } else {
                    settings.detectionMethods.checkMessagePatterns = state === 'on';
                }
                
                saveAntibotSettings(settings);
                await sock.sendMessage(chatId, { 
                    text: `✅ ${method} detection ${state === 'on' ? 'enabled' : 'disabled'}`,
                    quoted: message
                });
                break;
                
            default:
                await sock.sendMessage(chatId, { 
                    text: '❌ Invalid command. Use .antibot for help',
                    quoted: message
                });
                break;
        }
    } catch (error) {
        console.error('Error in antibotCommand:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to update antibot settings',
            quoted: message
        });
    }
}

// Check messages for bot-like patterns
function detectBotMessage(message) {
    const settings = loadAntibotSettings();
    
    if (!settings.detectionMethods.checkMessagePatterns) {
        return false;
    }

    const text = message.message?.conversation || 
                message.message?.extendedTextMessage?.text || '';
    
    // Common bot patterns
    const botPatterns = [
        /^[\*_]\w+[\*_]:/, // Markdown-style prefixes
        /^\[.+\]/, // Bracket prefixes
        /^[A-Z]+:/, // All-caps prefixes
        /^[\!\#]\w+/, // Command-style prefixes
        /automated message/i,
        /this is an automated/i
    ];
    
    return botPatterns.some(pattern => pattern.test(text));
}

// Handle bot detection and take action
async function handleBotDetection(sock, message) {
    try {
        const settings = loadAntibotSettings();
        if (!settings.enabled) return;
        
        const chatId = message.key.remoteJid;
        const senderId = message.key.participant || message.key.remoteJid;
        
        // Skip if not a group or message is from the bot itself
        if (!chatId.endsWith('@g.us') || message.key.fromMe) return;
        
        // Get user info
        const user = await sock.fetchStatus(senderId).catch(() => ({}));
        
        // Check if user is a bot
        if (isLikelyBot(user) || detectBotMessage(message)) {
            // Take action based on settings
            switch (settings.action) {
                case 'kick':
                    await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');
                    await sock.sendMessage(chatId, { 
                        text: `🚫 Kicked detected bot: @${senderId.split('@')[0]}`,
                        mentions: [senderId]
                    });
                    break;
                    
                case 'ban':
                    await sock.groupParticipantsUpdate(chatId, [senderId], 'remove');
                    // Add to ban list (you'll need to implement your ban system)
                    await sock.sendMessage(chatId, { 
                        text: `🚫 Banned detected bot: @${senderId.split('@')[0]}`,
                        mentions: [senderId]
                    });
                    break;
                    
                case 'warn':
                    await sock.sendMessage(chatId, { 
                        text: `⚠️ Warning: @${senderId.split('@')[0]} detected as bot\n` +
                              `Further bot-like activity may result in removal`,
                        mentions: [senderId]
                    });
                    break;
            }
        }
    } catch (error) {
        console.error('Error in handleBotDetection:', error);
    }
}

module.exports = {
    antibotCommand,
    handleBotDetection
};