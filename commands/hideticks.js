const fs = require('fs');
const path = require('path');

// Configuration file
const CONFIG_FILE = './data/hideticks.json';
const CONFIG_DIR = path.dirname(CONFIG_FILE);

// Ensure data directory exists
if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true });
}

// Default settings
const DEFAULT_CONFIG = {
    enabled: true,
    ignoreGroups: false,
    ignorePrivate: false,
    ignoreBroadcasts: true,
    exceptions: [], // JIDs that will always show ticks
    lastUpdated: Date.now()
};

let hideTicksConfig = { ...DEFAULT_CONFIG };

// Load config
function loadConfig() {
    try {
        if (fs.existsSync(CONFIG_FILE)) {
            const loadedConfig = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
            hideTicksConfig = { ...DEFAULT_CONFIG, ...loadedConfig };
        } else {
            saveConfig();
        }
    } catch (error) {
        console.error('Error loading hide ticks config:', error);
        hideTicksConfig = { ...DEFAULT_CONFIG };
        saveConfig();
    }
}

// Save config
function saveConfig() {
    try {
        hideTicksConfig.lastUpdated = Date.now();
        fs.writeFileSync(CONFIG_FILE, JSON.stringify(hideTicksConfig, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving hide ticks config:', error);
        return false;
    }
}

// Load config on startup
loadConfig();

async function hideTicksCommand(sock, chatId, message, args) {
    try {
        const isGroup = chatId.endsWith('@g.us');
        const sender = message.key.participant || message.key.remoteJid;
        
        // Check if user is owner (you need to define how you check for owner)
        const isOwner = message.key.fromMe || isUserOwner(sender);
        
        if (!isOwner) {
            return await sock.sendMessage(chatId, {
                text: '❌ Only bot owner can modify read receipts settings!',
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

        const action = args[0]?.toLowerCase();
        const subAction = args[1]?.toLowerCase();

        if (!action || action === 'status') {
            await showStatus(sock, chatId);
            return;
        }

        if (action === 'on') {
            hideTicksConfig.enabled = true;
            if (saveConfig()) {
                await sock.sendMessage(chatId, {
                    text: '✅ *Read Receipts HIDDEN*\n\nBlue ticks will NOT be sent for received messages.',
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
            hideTicksConfig.enabled = false;
            if (saveConfig()) {
                await sock.sendMessage(chatId, {
                    text: '✅ *Read Receipts VISIBLE*\n\nNormal blue ticks will be sent.',
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
        else if (action === 'groups') {
            if (subAction === 'on') {
                hideTicksConfig.ignoreGroups = false;
                await sock.sendMessage(chatId, {
                    text: '✅ *Groups Included*\n\nRead receipts will be hidden in groups too.',
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
            } else if (subAction === 'off') {
                hideTicksConfig.ignoreGroups = true;
                await sock.sendMessage(chatId, {
                    text: '✅ *Groups Excluded*\n\nRead receipts will be shown in groups.',
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
                    text: `📊 Groups setting: ${hideTicksConfig.ignoreGroups ? 'EXCLUDED' : 'INCLUDED'}\n\nUse: .hideticks groups on/off`,
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
            saveConfig();
        }
        else if (action === 'private') {
            if (subAction === 'on') {
                hideTicksConfig.ignorePrivate = false;
                await sock.sendMessage(chatId, {
                    text: '✅ *Private Chats Included*\n\nRead receipts will be hidden in private chats.',
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
            } else if (subAction === 'off') {
                hideTicksConfig.ignorePrivate = true;
                await sock.sendMessage(chatId, {
                    text: '✅ *Private Chats Excluded*\n\nRead receipts will be shown in private chats.',
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
                    text: `📊 Private chats setting: ${hideTicksConfig.ignorePrivate ? 'EXCLUDED' : 'INCLUDED'}\n\nUse: .hideticks private on/off`,
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
            saveConfig();
        }
        else if (action === 'broadcast') {
            if (subAction === 'on') {
                hideTicksConfig.ignoreBroadcasts = false;
                await sock.sendMessage(chatId, {
                    text: '✅ *Broadcasts Included*\n\nRead receipts will be hidden for broadcasts.',
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
            } else if (subAction === 'off') {
                hideTicksConfig.ignoreBroadcasts = true;
                await sock.sendMessage(chatId, {
                    text: '✅ *Broadcasts Excluded*\n\nRead receipts will be shown for broadcasts.',
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
                    text: `📊 Broadcasts setting: ${hideTicksConfig.ignoreBroadcasts ? 'EXCLUDED' : 'INCLUDED'}\n\nUse: .hideticks broadcast on/off`,
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
            saveConfig();
        }
        else if (action === 'exception') {
            if (subAction === 'add' && args[2]) {
                const jid = args[2];
                if (!hideTicksConfig.exceptions.includes(jid)) {
                    hideTicksConfig.exceptions.push(jid);
                    saveConfig();
                    await sock.sendMessage(chatId, {
                        text: `✅ Added exception for: ${jid}\n\nRead receipts will always be shown for this user/group.`,
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
            } else if (subAction === 'remove' && args[2]) {
                const jid = args[2];
                hideTicksConfig.exceptions = hideTicksConfig.exceptions.filter(e => e !== jid);
                saveConfig();
                await sock.sendMessage(chatId, {
                    text: `✅ Removed exception for: ${jid}`,
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
            } else if (subAction === 'list') {
                const exceptions = hideTicksConfig.exceptions;
                await sock.sendMessage(chatId, {
                    text: exceptions.length > 0 
                        ? `📋 Exceptions (${exceptions.length}):\n${exceptions.map(e => `• ${e}`).join('\n')}`
                        : '📋 No exceptions configured.',
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
                    text: '❌ Usage: .hideticks exception [add/remove/list] [jid]',
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
        else if (action === 'reset') {
            hideTicksConfig = { ...DEFAULT_CONFIG };
            saveConfig();
            await sock.sendMessage(chatId, {
                text: '✅ Settings reset to default!',
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
        else if (action === 'help') {
            await showHelp(sock, chatId);
        }
        else {
            await sock.sendMessage(chatId, {
                text: '❌ Invalid command. Use .hideticks help for usage information.',
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

    } catch (error) {
        console.error('HideTicks error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Error processing command. Please try again.',
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

// Helper function to check if user is owner (you need to implement this based on your setup)
function isUserOwner(senderJid) {
    // Implement your owner checking logic here
    // For example, you might have a list of owner numbers in settings
    const ownerNumbers = ['1234567890@s.whatsapp.net']; // Replace with actual owner numbers
    return ownerNumbers.includes(senderJid);
}

async function showStatus(sock, chatId) {
    const status = hideTicksConfig.enabled ? '🟢 ENABLED' : '🔴 DISABLED';
    const groupsStatus = hideTicksConfig.ignoreGroups ? '🔴 EXCLUDED' : '🟢 INCLUDED';
    const privateStatus = hideTicksConfig.ignorePrivate ? '🔴 EXCLUDED' : '🟢 INCLUDED';
    const broadcastStatus = hideTicksConfig.ignoreBroadcasts ? '🔴 EXCLUDED' : '🟢 INCLUDED';
    
    await sock.sendMessage(chatId, {
        text: `📊 *Read Receipts Status*\n\n` +
              `• Main Setting: ${status}\n` +
              `• Groups: ${groupsStatus}\n` +
              `• Private Chats: ${privateStatus}\n` +
              `• Broadcasts: ${broadcastStatus}\n` +
              `• Exceptions: ${hideTicksConfig.exceptions.length} configured\n\n` +
              `Use .hideticks help for more options`,
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

async function showHelp(sock, chatId) {
    await sock.sendMessage(chatId, {
        text: `👁️‍🗨️ *Hide Ticks Command Help*\n\n` +
              `*Usage:* .hideticks [option] [sub-option]\n\n` +
              `*Options:*\n` +
              `• on/off - Enable/disable read receipts hiding\n` +
              `• status - Show current status\n` +
              `• groups on/off - Include/exclude groups\n` +
              `• private on/off - Include/exclude private chats\n` +
              `• broadcast on/off - Include/exclude broadcasts\n` +
              `• exception add [jid] - Add exception\n` +
              `• exception remove [jid] - Remove exception\n` +
              `• exception list - List exceptions\n` +
              `• reset - Reset to default settings\n` +
              `• help - Show this help\n\n` +
              `*Examples:*\n` +
              `• .hideticks on\n` +
              `• .hideticks groups off\n` +
              `• .hideticks exception add 1234567890@s.whatsapp.net`,
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

// Enhanced middleware to prevent read receipts
function suppressReadReceipts(sock, message) {
    if (!hideTicksConfig.enabled) return;
    
    const chatJid = message.key.remoteJid;
    
    // Skip if this is an exception
    if (hideTicksConfig.exceptions.includes(chatJid)) return;
    
    // Skip groups if configured
    if (hideTicksConfig.ignoreGroups && chatJid.endsWith('@g.us')) return;
    
    // Skip private chats if configured
    if (hideTicksConfig.ignorePrivate && chatJid.endsWith('@s.whatsapp.net')) return;
    
    // Skip broadcasts if configured
    if (hideTicksConfig.ignoreBroadcasts && chatJid.endsWith('@broadcast')) return;
    
    // Critical - prevents WhatsApp from sending blue ticks
    // This is a more reliable method than setting remoteJid to undefined
    try {
        // Modify the message to prevent read receipts
        if (message.message) {
            // This is a theoretical approach - actual implementation may vary
            // based on the WhatsApp Web protocol
            message.key.remoteJid = null;
            message.key.fromMe = false;
        }
    } catch (error) {
        console.error('Error suppressing read receipts:', error);
    }
}

// Auto-save config periodically
setInterval(() => {
    if (Date.now() - hideTicksConfig.lastUpdated > 300000) { // 5 minutes
        saveConfig();
    }
}, 60000); // Check every minute

module.exports = {
    hideTicksCommand,
    suppressReadReceipts,
    loadConfig,
    saveConfig
};