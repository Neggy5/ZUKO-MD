/**
 * Mute Command - Lock/Unlock group (only admins can send messages when locked)
 * ES Module version with button support and persistence
 */

import { ButtonManager } from '../utils/buttonManager.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOCK_STATUS_FILE = path.join(__dirname, '../database/groupLocks.json');

// Store group lock status in memory
let groupLockStatus = new Map();

// Load saved lock statuses from file
function loadLockStatuses() {
    try {
        if (fs.existsSync(LOCK_STATUS_FILE)) {
            const data = JSON.parse(fs.readFileSync(LOCK_STATUS_FILE, 'utf8'));
            groupLockStatus = new Map(Object.entries(data));
            console.log(`🔒 Loaded ${groupLockStatus.size} group lock statuses`);
        }
    } catch (error) {
        console.error('Failed to load lock statuses:', error);
    }
}

// Save lock statuses to file
function saveLockStatuses() {
    try {
        const data = Object.fromEntries(groupLockStatus);
        fs.writeFileSync(LOCK_STATUS_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Failed to save lock statuses:', error);
    }
}

// Load statuses on module load
loadLockStatuses();

export default {
    name: 'mute',
    description: 'Lock or unlock the group (only admins can chat when locked)',
    aliases: ['lock', 'close', 'lockgroup', 'lockgc'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, isAdmin, isBotAdmin, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Check if in group
        if (!isGroup) {
            await reply('❌ This command can only be used in groups!');
            return;
        }
        
        // Check admin permission
        const userIsAdmin = await isAdmin;
        if (!userIsAdmin && !isOwner) {
            await reply('❌ Only group admins can lock/unlock the group!');
            return;
        }
        
        // Check bot admin (needed to change group settings)
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to lock/unlock the group!');
            return;
        }
        
        const action = args[0]?.toLowerCase();
        const currentStatus = groupLockStatus.get(from) || false;
        
        // Handle different actions
        if (action === 'on' || action === 'lock' || action === 'close') {
            // Lock the group
            try {
                await sock.groupSettingUpdate(from, 'announcement');
                groupLockStatus.set(from, true);
                saveLockStatuses();
                
                await buttons.sendButtons(from, {
                    text: `🔒 *ＧＲＯＵＰ ＬＯＣＫＥＤ* 🔒\n\n` +
                          `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                          `┃\n` +
                          `┃ 🔐 The group has been locked\n` +
                          `┃\n` +
                          `┃ 👑 *Only admins can send messages*\n` +
                          `┃\n` +
                          `┃ 💡 Use .mute off to unlock\n` +
                          `┃\n` +
                          `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '🔓 UNLOCK', id: 'mute_off', type: 'reply' },
                        { text: '📋 GROUP INFO', id: 'group_info', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                
                await react('🔒');
                
            } catch (error) {
                console.error('Lock error:', error);
                await reply(`❌ Failed to lock group: ${error.message}`);
            }
            
        } else if (action === 'off' || action === 'unlock' || action === 'open') {
            // Unlock the group
            try {
                await sock.groupSettingUpdate(from, 'not_announcement');
                groupLockStatus.set(from, false);
                saveLockStatuses();
                
                await buttons.sendButtons(from, {
                    text: `🔓 *ＧＲＯＵＰ ＵＮＬＯＣＫＥＤ* 🔓\n\n` +
                          `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                          `┃\n` +
                          `┃ 🔓 The group has been unlocked\n` +
                          `┃\n` +
                          `┃ 👥 *All members can send messages*\n` +
                          `┃\n` +
                          `┃ 💡 Use .mute on to lock again\n` +
                          `┃\n` +
                          `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '🔒 LOCK', id: 'mute_on', type: 'reply' },
                        { text: '📋 GROUP INFO', id: 'group_info', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                
                await react('🔓');
                
            } catch (error) {
                console.error('Unlock error:', error);
                await reply(`❌ Failed to unlock group: ${error.message}`);
            }
            
        } else if (action === 'status') {
            // Show current status
            const isLocked = currentStatus;
            
            await buttons.sendButtons(from, {
                text: `📋 *ＧＲＯＵＰ ＳＴＡＴＵＳ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ ${isLocked ? '🔒' : '🔓'} *Status:* ${isLocked ? 'LOCKED' : 'UNLOCKED'}\n` +
                      `┃\n` +
                      `┃ ${isLocked ? '👑 Only admins can send' : '👥 All members can send'}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isLocked ? '🔓 UNLOCK' : '🔒 LOCK', id: isLocked ? 'mute_off' : 'mute_on', type: 'reply' },
                    { text: '🔄 REFRESH', id: 'mute_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
        } else {
            // Show help menu
            const isLocked = currentStatus;
            
            await buttons.sendButtons(from, {
                text: `🔒 *ＧＲＯＵＰ ＬＯＣＫ/ＵＮＬＯＣＫ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 📊 *Current:* ${isLocked ? '🔒 LOCKED' : '🔓 UNLOCKED'}\n` +
                      `┃\n` +
                      `┃ 📝 *Commands:*\n` +
                      `┃\n` +
                      `┃ • ${prefix}mute on - Lock group\n` +
                      `┃ • ${prefix}mute off - Unlock group\n` +
                      `┃ • ${prefix}mute status - Check status\n` +
                      `┃\n` +
                      `┃ ℹ️ *Info:*\n` +
                      `┃ ${isLocked ? '🔒' : '🔓'} ${isLocked ? 'Only admins can send' : 'All members can send'}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: isLocked ? '🔓 UNLOCK' : '🔒 LOCK', id: isLocked ? 'mute_off' : 'mute_on', type: 'reply' },
                    { text: '📋 STATUS', id: 'mute_status', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
        }
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};

// Helper function to check if group is locked
export function isGroupLocked(groupId) {
    return groupLockStatus.get(groupId) || false;
}

// Export for status tracking
export { groupLockStatus, saveLockStatuses };