const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

// Configuration
const STATUS_DIR = path.join(__dirname, '../data/status');
const MAX_STATUSES = 20;
const SETTINGS_PATH = path.join(__dirname, '../settings.json'); // Changed from .js to .json

// Improved settings loader with validation
function getSettings() {
    try {
        if (fs.existsSync(SETTINGS_PATH)) {
            const rawData = fs.readFileSync(SETTINGS_PATH, 'utf8');
            const settings = JSON.parse(rawData);
            return settings || {};
        }
        return {};
    } catch (error) {
        console.error('Error loading settings:', error);
        return {};
    }
}

// Get owner JID with better validation
function getOwnerJid() {
    const settings = getSettings();
    if (!settings.ownerNumber) {
        console.error('Owner number not found in settings');
        return null;
    }
    
    // Normalize the number
    const normalizedNumber = settings.ownerNumber.replace(/[^0-9]/g, '');
    if (!normalizedNumber) {
        console.error('Invalid owner number format');
        return null;
    }
    
    return normalizedNumber.includes('@') 
        ? normalizedNumber 
        : `${normalizedNumber}@s.whatsapp.net`;
}

// Ensure directory exists with better error handling
function ensureDirectoryExists(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Created directory: ${dirPath}`);
        }
        return true;
    } catch (error) {
        console.error(`Error creating directory ${dirPath}:`, error);
        return false;
    }
}

// Initialize directories
ensureDirectoryExists(STATUS_DIR);

// Improved status saving function
async function saveStatus(sock, userId, message) {
    try {
        const ownerJid = getOwnerJid();
        if (!ownerJid) {
            throw new Error('Owner number not configured in settings');
        }

        const userDir = path.join(STATUS_DIR, userId.split('@')[0]);
        if (!ensureDirectoryExists(userDir)) {
            throw new Error('Failed to create user directory');
        }

        // Check existing status count
        const existingStatuses = fs.readdirSync(userDir).filter(file => 
            !file.startsWith('meta_') && !file.startsWith('.')
        );
        
        if (existingStatuses.length >= MAX_STATUSES) {
            const oldest = existingStatuses.sort()[0];
            const oldestPath = path.join(userDir, oldest);
            const oldestMetaPath = path.join(userDir, `meta_${oldest.split('_')[1]}`);
            
            fs.unlinkSync(oldestPath);
            if (fs.existsSync(oldestMetaPath)) {
                fs.unlinkSync(oldestMetaPath);
            }
        }

        const timestamp = Date.now();
        let statusPath, caption = '', statusType, buffer;

        if (message.message?.imageMessage) {
            statusPath = path.join(userDir, `image_${timestamp}.jpg`);
            buffer = await downloadMediaMessage(message, 'buffer', {});
            caption = message.message.imageMessage.caption || '';
            statusType = 'image';
        } 
        else if (message.message?.videoMessage) {
            statusPath = path.join(userDir, `video_${timestamp}.mp4`);
            buffer = await downloadMediaMessage(message, 'buffer', {});
            caption = message.message.videoMessage.caption || '';
            statusType = 'video';
        }
        else {
            statusPath = path.join(userDir, `text_${timestamp}.txt`);
            const text = message.message?.conversation || 
                         message.message?.extendedTextMessage?.text || '';
            fs.writeFileSync(statusPath, text);
            statusType = 'text';
        }

        // For media files, write the buffer
        if (buffer) {
            fs.writeFileSync(statusPath, buffer);
        }

        // Save metadata
        const metaPath = path.join(userDir, `meta_${timestamp}.json`);
        fs.writeFileSync(metaPath, JSON.stringify({
            type: statusType,
            timestamp,
            caption,
            path: statusPath
        }, null, 2));

        // Send to owner's DM
        await sendToOwnerDM(sock, statusType, statusPath, caption, userId, ownerJid);

        return true;
    } catch (error) {
        console.error('SaveStatus Error:', error);
        return false;
    }
}

// Improved function to send status to owner
async function sendToOwnerDM(sock, type, filePath, caption, senderId, ownerJid) {
    try {
        const sender = senderId.split('@')[0];
        const timeString = new Date().toLocaleString();
        
        let message = {
            text: `📥 New status saved from: ${sender}\n` +
                  `Type: ${type.toUpperCase()}\n` +
                  `Time: ${timeString}` +
                  (caption ? `\nCaption: ${caption}` : '')
        };

        // Send the notification
        await sock.sendMessage(ownerJid, message);

        // Send the actual content
        if (type === 'image') {
            await sock.sendMessage(ownerJid, { 
                image: fs.readFileSync(filePath),
                caption: `From: ${sender} | ${timeString}`
            });
        } 
        else if (type === 'video') {
            await sock.sendMessage(ownerJid, { 
                video: fs.readFileSync(filePath),
                caption: `From: ${sender} | ${timeString}`
            });
        } 
        else if (type === 'text') {
            const textContent = fs.readFileSync(filePath, 'utf-8');
            await sock.sendMessage(ownerJid, { 
                text: `📝 Text status from ${sender} (${timeString}):\n\n${textContent}`
            });
        }

    } catch (error) {
        console.error('Error sending to owner DM:', error);
    }
}

// Improved command handler
async function saveStatusCommand(sock, chatId, message) {
    try {
        const userId = message.key.participant || message.key.remoteJid;
        const quotedMsg = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;

        if (!quotedMsg) {
            await sock.sendMessage(chatId, {
                text: '❌ Please reply to a status/message to save it!\n\nExample: Reply to a status with `.savestatus`',
                quoted: message
            });
            return;
        }

        const success = await saveStatus(sock, userId, { 
            key: { remoteJid: userId }, 
            message: quotedMsg 
        });
        
        if (!success) {
            throw new Error('Failed to save status');
        }
        
        await sock.sendMessage(chatId, {
            text: '✅ Status saved successfully!',
            quoted: message
        });

    } catch (error) {
        console.error('SaveStatus Command Error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Error saving status. Please try again later!',
            quoted: message
        });
    }
}

module.exports = {
    saveStatusCommand,
    saveStatus
};