const fs = require('fs');
const path = require('path');

// Track active users (in-memory storage)
const activeUsers = {};

async function listActiveCommand(sock, chatId) {
    try {
        if (!chatId.endsWith('@g.us')) {
            return sock.sendMessage(chatId, { 
                text: '❌ This command only works in groups!'
            });
        }

        // Get group metadata
        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;

        // Filter active users (last 15 minutes)
        const now = Date.now();
        const activeThreshold = 15 * 60 * 1000; // 15 minutes
        const activeMembers = participants.filter(p => {
            return activeUsers[p.id] && (now - activeUsers[p.id].lastSeen) < activeThreshold;
        });

        // Format message
        let message = `👥 *Active Users* (Last 15 mins)\n\n`;
        
        if (activeMembers.length > 0) {
            activeMembers.forEach((user, index) => {
                const lastSeenMin = Math.floor((now - activeUsers[user.id].lastSeen) / 60000);
                message += `${index + 1}. @${user.id.split('@')[0]} (${lastSeenMin} min ago)\n`;
            });
        } else {
            message += 'No active users found in the timeframe\n';
        }

        message += `\nTotal: ${activeMembers.length}/${participants.length} members`;

        await sock.sendMessage(chatId, { 
            text: message,
            mentions: activeMembers.map(m => m.id)
        });

    } catch (error) {
        console.error('Error in listactive:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to check active users'
        });
    }
}

// Middleware to track activity
function trackActivity(sock, message) {
    const chatId = message.key.remoteJid;
    const sender = message.key.participant || message.key.remoteJid;

    if (chatId.endsWith('@g.us')) {
        activeUsers[sender] = {
            lastSeen: Date.now(),
            name: message.pushName || 'User'
        };
    }
}

module.exports = {
    listActiveCommand,
    trackActivity
};