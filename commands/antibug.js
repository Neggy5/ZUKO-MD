const fs = require('fs');
const path = require('path');

// Initialize paths
const antibugPatternsPath = path.join(__dirname, '../data/antibugPatterns.json');
const antibugConfigPath = path.join(__dirname, '../data/antibugConfig.json');

// Initialize default data structures
let antibugPatterns = [];
let antibugConfig = {};

// Load or create antibugPatterns.json
try {
    if (!fs.existsSync(antibugPatternsPath)) {
        fs.writeFileSync(antibugPatternsPath, JSON.stringify([], null, 2));
    }
    const patternsData = fs.readFileSync(antibugPatternsPath, 'utf-8');
    antibugPatterns = JSON.parse(patternsData);
    if (!Array.isArray(antibugPatterns)) {
        throw new Error('Invalid antibug patterns format');
    }
} catch (error) {
    console.error('Error loading antibug patterns:', error);
    // Reset to empty array if corrupted
    antibugPatterns = [];
    fs.writeFileSync(antibugPatternsPath, JSON.stringify([], null, 2));
}

// Load or create antibugConfig.json
try {
    if (!fs.existsSync(antibugConfigPath)) {
        fs.writeFileSync(antibugConfigPath, JSON.stringify({}, null, 2));
    }
    const configData = fs.readFileSync(antibugConfigPath, 'utf-8');
    antibugConfig = JSON.parse(configData);
    if (typeof antibugConfig !== 'object') {
        throw new Error('Invalid antibug config format');
    }
} catch (error) {
    console.error('Error loading antibug config:', error);
    // Reset to empty object if corrupted
    antibugConfig = {};
    fs.writeFileSync(antibugConfigPath, JSON.stringify({}, null, 2));
}

// Spam detection thresholds
const SPAM_THRESHOLD = 5;    // Max 5 messages in 5 seconds
const FLOOD_DELAY = 5000;    // 5-second cooldown
const MUTE_DURATION = 60000; // 1 minute mute duration
const userMessageCount = new Map();

function detectSpam(text) {
    try {
        const isBugAttempt = antibugPatterns.some(pattern => 
            new RegExp(pattern, 'i').test(text)
        );
        const specialCharSpam = /([@#!$%^&*])\1{5,}/.test(text);
        const repeatedWordSpam = /\b(\w+)\b.*\b\1\b.{3,}/i.test(text);
        return isBugAttempt || specialCharSpam || repeatedWordSpam;
    } catch (error) {
        console.error('Error in spam detection:', error);
        return false;
    }
}

function detectFlood(userId) {
    try {
        const now = Date.now();
        const userData = userMessageCount.get(userId) || { count: 0, lastTimestamp: 0 };

        if (now - userData.lastTimestamp > FLOOD_DELAY) {
            userMessageCount.set(userId, { count: 1, lastTimestamp: now });
            return false;
        }

        userData.count++;
        userMessageCount.set(userId, userData);
        return userData.count >= SPAM_THRESHOLD;
    } catch (error) {
        console.error('Error in flood detection:', error);
        return false;
    }
}

async function muteUser(sock, chatId, userId, duration) {
    try {
        await sock.groupParticipantsUpdate(chatId, [userId], 'mute', { duration });
        return true;
    } catch (error) {
        console.error('Error muting user:', error);
        return false;
    }
}

async function handleFlood(sock, chatId, userId) {
    try {
        const muteSuccess = await muteUser(sock, chatId, userId, MUTE_DURATION);
        if (muteSuccess) {
            await sock.sendMessage(chatId, {
                text: `🛡 *FLOOD DETECTED:* @${userId} muted for 1m.`,
                mentions: [userId]
            });
        } else {
            await sock.sendMessage(chatId, {
                text: '❌ An error occurred while muting the user. Please try again.'
            });
        }
    } catch (error) {
        console.error('Error handling flood:', error);
    }
}

async function execute(sock, chatId, message, args, isAdmin) {
    try {
        if (!isAdmin) {
            return sock.sendMessage(chatId, { 
                text: '❌ Only admins can configure antibug!',
                ...global.channelInfo 
            });
        }

        const action = args[0]?.toLowerCase();
        if (!action || !['on', 'off'].includes(action)) {
            return sock.sendMessage(chatId, {
                text: `⚙️ Usage: *.antibug on/off*\nExample: *.antibug on* to enable protection`,
                ...global.channelInfo
            });
        }

        antibugConfig[chatId] = action === 'on';
        fs.writeFileSync(antibugConfigPath, JSON.stringify(antibugConfig, null, 2));

        await sock.sendMessage(chatId, {
            text: `🛡 *Antibug ${action === 'on' ? 'ENABLED' : 'DISABLED'}* for this group.\n${action === 'on' ? 'Now blocking spam/bug attempts.' : 'No longer monitoring.'}`,
            ...global.channelInfo
        });
    } catch (error) {
        console.error('Error in antibug execute:', error);
        await sock.sendMessage(chatId, {
            text: '❌ An error occurred while processing antibug command',
            ...global.channelInfo
        });
    }
}

module.exports = {
    name: 'antibug',
    description: 'Enable spam/bug protection in groups',
    execute,
    detectSpam,
    detectFlood,
    handleFlood
};