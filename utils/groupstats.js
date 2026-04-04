/**
 * Group Statistics Utility
 * Tracks message counts per group, per user, and per hour
 * ES Module version
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = path.join(__dirname, '../database/groupStats.json');

/**
 * Load database from file
 * @returns {Object} Database object
 */
function loadDB() {
    try {
        if (!fs.existsSync(DB_PATH)) return {};
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch (error) {
        console.error('[groupStats] load error:', error.message);
        return {};
    }
}

/**
 * Save database to file
 * @param {Object} data - Database object to save
 */
function saveDB(data) {
    try {
        // Ensure directory exists
        const dbDir = path.dirname(DB_PATH);
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('[groupStats] save error:', err.message);
    }
}

/**
 * Add a message to statistics
 * @param {string} groupId - Group JID
 * @param {string} senderId - Sender JID
 */
function addMessage(groupId, senderId) {
    if (!groupId || !senderId) return;
    
    const db = loadDB();
    const today = new Date().toISOString().slice(0, 10);
    const hour = new Date().getHours().toString();

    if (!db[groupId]) db[groupId] = {};
    if (!db[groupId][today]) {
        db[groupId][today] = {
            total: 0,
            users: {},
            hours: {}
        };
    }

    const g = db[groupId][today];

    g.total++;
    g.users[senderId] = (g.users[senderId] || 0) + 1;
    g.hours[hour] = (g.hours[hour] || 0) + 1;

    saveDB(db);
}

/**
 * Get today's statistics for a group
 * @param {string} groupId - Group JID
 * @returns {Object|null} Statistics object or null
 */
function getStats(groupId) {
    const db = loadDB();
    const today = new Date().toISOString().slice(0, 10);

    if (!db[groupId] || !db[groupId][today]) return null;
    return db[groupId][today];
}

/**
 * Get statistics for a specific date
 * @param {string} groupId - Group JID
 * @param {string} date - Date in YYYY-MM-DD format
 * @returns {Object|null} Statistics object or null
 */
function getStatsByDate(groupId, date) {
    const db = loadDB();
    if (!db[groupId] || !db[groupId][date]) return null;
    return db[groupId][date];
}

/**
 * Get all statistics for a group (all dates)
 * @param {string} groupId - Group JID
 * @returns {Object|null} All statistics or null
 */
function getAllStats(groupId) {
    const db = loadDB();
    if (!db[groupId]) return null;
    return db[groupId];
}

/**
 * Get weekly statistics for a group
 * @param {string} groupId - Group JID
 * @returns {Object} Weekly statistics
 */
function getWeeklyStats(groupId) {
    const db = loadDB();
    if (!db[groupId]) return null;
    
    const weekly = {};
    const now = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        const dateStr = date.toISOString().slice(0, 10);
        
        if (db[groupId][dateStr]) {
            weekly[dateStr] = db[groupId][dateStr];
        }
    }
    
    return weekly;
}

/**
 * Get top active users in a group for today
 * @param {string} groupId - Group JID
 * @param {number} limit - Number of top users to return
 * @returns {Array} Array of top users
 */
function getTopUsers(groupId, limit = 10) {
    const stats = getStats(groupId);
    if (!stats || !stats.users) return [];
    
    const users = Object.entries(stats.users);
    users.sort((a, b) => b[1] - a[1]);
    
    return users.slice(0, limit).map(([id, count]) => ({
        id,
        count
    }));
}

/**
 * Get total messages in a group for today
 * @param {string} groupId - Group JID
 * @returns {number} Total messages
 */
function getTotalMessages(groupId) {
    const stats = getStats(groupId);
    return stats ? stats.total : 0;
}

/**
 * Get active hours for a group today
 * @param {string} groupId - Group JID
 * @returns {Object} Hours with message counts
 */
function getActiveHours(groupId) {
    const stats = getStats(groupId);
    return stats ? stats.hours : {};
}

/**
 * Clear old statistics (older than specified days)
 * @param {number} daysToKeep - Number of days to keep (default 30)
 * @returns {number} Number of deleted entries
 */
function clearOldStats(daysToKeep = 30) {
    const db = loadDB();
    const now = new Date();
    let deletedCount = 0;
    
    for (const groupId in db) {
        for (const date in db[groupId]) {
            const dateObj = new Date(date);
            const daysDiff = (now - dateObj) / (1000 * 60 * 60 * 24);
            
            if (daysDiff > daysToKeep) {
                delete db[groupId][date];
                deletedCount++;
            }
        }
        
        // Remove empty groups
        if (Object.keys(db[groupId]).length === 0) {
            delete db[groupId];
        }
    }
    
    if (deletedCount > 0) {
        saveDB(db);
        console.log(`[groupStats] Cleared ${deletedCount} old entries (older than ${daysToKeep} days)`);
    }
    
    return deletedCount;
}

/**
 * Reset all statistics for a group
 * @param {string} groupId - Group JID
 */
function resetGroupStats(groupId) {
    const db = loadDB();
    if (db[groupId]) {
        delete db[groupId];
        saveDB(db);
        console.log(`[groupStats] Reset statistics for group: ${groupId}`);
    }
}

// Export all functions
export {
    addMessage,
    getStats,
    getStatsByDate,
    getAllStats,
    getWeeklyStats,
    getTopUsers,
    getTotalMessages,
    getActiveHours,
    clearOldStats,
    resetGroupStats
};