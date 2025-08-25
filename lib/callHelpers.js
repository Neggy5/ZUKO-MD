// lib/callHelpers.js
const fs = require('fs');
const path = require('path');

const BLOCKED_USERS_FILE = path.join(__dirname, '../data/blockedUsers.json');

// Block a user temporarily
async function blockUser(userId, hours) {
    try {
        let blockedUsers = {};
        if (fs.existsSync(BLOCKED_USERS_FILE)) {
            blockedUsers = JSON.parse(fs.readFileSync(BLOCKED_USERS_FILE));
        }
        
        const unblockTime = Date.now() + (hours * 60 * 60 * 1000);
        blockedUsers[userId] = unblockTime;
        
        fs.writeFileSync(BLOCKED_USERS_FILE, JSON.stringify(blockedUsers, null, 2));
        return true;
    } catch (error) {
        console.error('Error blocking user:', error);
        return false;
    }
}

// Check if user is blocked
async function isUserBlocked(userId) {
    try {
        if (!fs.existsSync(BLOCKED_USERS_FILE)) return false;
        
        const blockedUsers = JSON.parse(fs.readFileSync(BLOCKED_USERS_FILE));
        const unblockTime = blockedUsers[userId];
        
        if (!unblockTime) return false;
        if (Date.now() > unblockTime) {
            // Remove expired block
            delete blockedUsers[userId];
            fs.writeFileSync(BLOCKED_USERS_FILE, JSON.stringify(blockedUsers, null, 2));
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Error checking blocked user:', error);
        return false;
    }
}

// Get group admins
async function getGroupAdmins(sock, groupId) {
    try {
        const metadata = await sock.groupMetadata(groupId);
        return metadata.participants
            .filter(p => p.admin)
            .map(p => p.id);
    } catch (error) {
        console.error('Error getting group admins:', error);
        return [];
    }
}

module.exports = {
    blockUser,
    isUserBlocked,
    getGroupAdmins
};