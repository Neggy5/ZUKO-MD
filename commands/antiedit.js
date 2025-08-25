const fs = require('fs').promises;
const path = require('path');
const { isJidGroup } = require('@whiskeysockets/baileys');

// Configuration
const MAX_MESSAGE_HISTORY = 1000;
const MESSAGE_HISTORY_TTL = 24 * 60 * 60 * 1000; // 24 hours
const ANTIDELETE_DIR = path.join(__dirname, '../data/antiedit');

// Enhanced message storage with TTL
const messageHistory = new Map();
let cleanupInterval;

// Initialize with cleanup routine
function initializeStorage() {
    // Create directory if it doesn't exist
    fs.mkdir(ANTIDELETE_DIR, { recursive: true }).catch(console.error);
    
    // Regular cleanup of old messages
    cleanupInterval = setInterval(() => {
        const now = Date.now();
        for (const [key, { timestamp }] of messageHistory) {
            if (now - timestamp > MESSAGE_HISTORY_TTL) {
                messageHistory.delete(key);
            }
        }
    }, 60 * 60 * 1000); // Run hourly
}

// Shutdown cleanup
function shutdownStorage() {
    if (cleanupInterval) clearInterval(cleanupInterval);
}

// Enhanced admin check with caching
const adminCache = new Map();
async function isAdmin(sock, chatId, userId) {
    const cacheKey = `${chatId}:${userId}`;
    
    // Check cache first
    if (adminCache.has(cacheKey)) {
        return adminCache.get(cacheKey);
    }
    
    try {
        const metadata = await sock.groupMetadata(chatId);
        const participant = metadata.participants.find(p => p.id === userId);
        
        const result = {
            isBotAdmin: metadata.participants.some(
                p => p.id === sock.user.id.split(':')[0] + '@s.whatsapp.net' && p.admin
            ),
            isUserAdmin: participant?.admin || false
        };
        
        // Cache for 5 minutes
        adminCache.set(cacheKey, result);
        setTimeout(() => adminCache.delete(cacheKey), 5 * 60 * 1000);
        
        return result;
    } catch (error) {
        console.error('Admin check error:', error);
        return { isBotAdmin: false, isUserAdmin: false };
    }
}

// Enhanced edit detection with rate limiting
const lastEditAlert = new Map();
async function handleEditDetection(sock, message) {
    try {
        const chatId = message.key.remoteJid;
        if (!isJidGroup(chatId)) return;

        // Rate limiting - 1 alert per user per minute
        const now = Date.now();
        const lastAlert = lastEditAlert.get(chatId) || 0;
        if (now - lastAlert < 60 * 1000) return;

        // Check if anti-edit is enabled
        let config;
        try {
            config = await fs.readFile(path.join(ANTIDELETE_DIR, `${chatId}.json`), 'utf8');
            config = JSON.parse(config);
        } catch {
            return; // Config doesn't exist or is invalid
        }

        const originalMessage = messageHistory.get(message.key.id);
        if (!originalMessage) return;

        const editedContent = getMessageContent(message) || '[media message]';
        const { sender, mentions } = getSenderInfo(message);

        // Format the alert message
        const alertMessage = formatAlertMessage(originalMessage, editedContent, sender);

        await sock.sendMessage(chatId, {
            text: alertMessage,
            mentions
        });

        // Update rate limit
        lastEditAlert.set(chatId, now);

    } catch (error) {
        console.error('Anti-Edit Detection Error:', error);
    }
}

// Helper functions
function getMessageContent(message) {
    return message.message?.conversation || 
           message.message?.extendedTextMessage?.text ||
           message.message?.imageMessage?.caption ||
           message.message?.videoMessage?.caption;
}

function getSenderInfo(message) {
    let sender = '';
    let mentions = [];
    if (message.key.participant) {
        sender = `@${message.key.participant.split('@')[0]}`;
        mentions = [message.key.participant];
    }
    return { sender, mentions };
}

function formatAlertMessage(original, edited, sender) {
    const MAX_LENGTH = 200;
    const truncate = (text) => 
        text.length > MAX_LENGTH ? `${text.substring(0, MAX_LENGTH)}...` : text;
    
    return `⚠️ *Message Edit Detected!*\n\n` +
           `• *Original:* ${truncate(original)}\n` +
           `• *Edited:* ${truncate(edited)}\n` +
           `• *Sender:* ${sender}`;
}

// Enhanced anti-edit command
async function antiEditCommand(sock, chatId, message) {
    try {
        if (!isJidGroup(chatId)) {
            await sock.sendMessage(chatId, { 
                text: '❌ This command only works in groups!',
                quoted: message
            });
            return;
        }

        const senderId = message.key.participant || message.key.remoteJid;
        const { isUserAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

        // Check permissions
        if (!isUserAdmin && !message.key.fromMe) {
            await sock.sendMessage(chatId, { 
                text: '❌ Only group admins can use this command!',
                quoted: message
            });
            return;
        }

        if (!isBotAdmin) {
            await sock.sendMessage(chatId, {
                text: '❌ I need to be admin to monitor message edits!',
                quoted: message
            });
            return;
        }

        const configPath = path.join(ANTIDELETE_DIR, `${chatId}.json`);
        let isEnabled;
        
        try {
            await fs.access(configPath);
            isEnabled = true;
        } catch {
            isEnabled = false;
        }

        try {
            if (isEnabled) {
                await fs.unlink(configPath);
                await sock.sendMessage(chatId, {
                    text: '✅ Anti-Edit has been *disabled* for this group',
                    quoted: message
                });
            } else {
                await fs.writeFile(configPath, JSON.stringify({ 
                    enabled: true,
                    enabledAt: new Date().toISOString(),
                    enabledBy: senderId,
                    settings: {
                        alertAdminsOnly: false,
                        deleteEditedMessages: false
                    }
                }, null, 2));
                
                await sock.sendMessage(chatId, {
                    text: '✅ Anti-Edit has been *enabled* for this group\n\n' +
                         'I will now detect and alert when messages are edited.\n' +
                         'Use `.antiedit settings` to configure advanced options.',
                    quoted: message
                });
            }
        } catch (error) {
            console.error('Config file error:', error);
            throw new Error('Failed to update configuration');
        }

    } catch (error) {
        console.error('Anti-Edit Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to configure anti-edit: ' + error.message,
            quoted: message
        });
    }
}

// Enhanced message storage with TTL
function storeOriginalMessage(message) {
    try {
        const content = getMessageContent(message);
        if (!content) return;
        
        messageHistory.set(message.key.id, {
            content,
            timestamp: Date.now()
        });
        
        // Automatic cleanup when reaching limit
        if (messageHistory.size > MAX_MESSAGE_HISTORY) {
            // Delete oldest 10% of messages
            const entries = Array.from(messageHistory.entries())
                .sort((a, b) => a[1].timestamp - b[1].timestamp);
            
            for (let i = 0; i < Math.floor(MAX_MESSAGE_HISTORY * 0.1); i++) {
                messageHistory.delete(entries[i][0]);
            }
        }
    } catch (error) {
        console.error('Error storing original message:', error);
    }
}

// Initialize on module load
initializeStorage();

// Handle process exit
process.on('exit', shutdownStorage);
process.on('SIGINT', shutdownStorage);
process.on('SIGTERM', shutdownStorage);

module.exports = {
    antiEditCommand,
    handleEditDetection,
    storeOriginalMessage,
    initializeStorage,
    shutdownStorage
};