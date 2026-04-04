/**
 * ToGroupStatus Command - Post media as status to groups
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import { downloadContentFromMessage } from '@kelvdra/baileys';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Store group status sessions
const groupStatusSessions = new Map();

export default {
    name: 'togroupstatus',
    description: 'Send media as status update to groups',
    aliases: ['groupstatus', 'gsend', 'postgroup', 'broadcaststatus'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Only owner can use this command
        if (!isOwner) {
            await reply('❌ Only bot owner can use this command!');
            return;
        }
        
        const action = args[0]?.toLowerCase();
        
        // Check if replying to media
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const targetMsg = quotedMsg || msg.message;
        
        const imageMsg = targetMsg?.imageMessage;
        const videoMsg = targetMsg?.videoMessage;
        
        // If there's media and no action, send directly
        if ((imageMsg || videoMsg) && (!action || action === 'send')) {
            await sendToGroups(sock, msg, args, context, buttons);
            return;
        }
        
        // Handle different actions
        if (action === 'list') {
            await listGroups(sock, from, msg, buttons);
            return;
            
        } else if (action === 'all') {
            await sendToAllGroups(sock, msg, args.slice(1), context, buttons);
            return;
            
        } else if (action === 'select') {
            const groupIndex = parseInt(args[1]) - 1;
            if (!isNaN(groupIndex)) {
                await sendToSelectedGroup(sock, msg, groupIndex, context, buttons);
            } else {
                await reply('❌ Invalid group selection!');
            }
            return;
            
        } else if (action === 'help') {
            await showHelp(from, sock, msg, buttons, prefix);
            return;
            
        } else {
            await showMainMenu(from, sock, msg, buttons, prefix);
        }
        
        await react('✅');
    },
    
    ownerOnly: true,
    groupOnly: false,
    adminOnly: false
};

// Send media to groups
async function sendToGroups(sock, msg, args, context, buttons) {
    const { from, reply, react } = context;
    const prefix = context.prefix || '.';
    
    // Get quoted message
    const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const targetMsg = quotedMsg || msg.message;
    
    // Check for media
    const imageMsg = targetMsg?.imageMessage;
    const videoMsg = targetMsg?.videoMessage;
    
    if (!imageMsg && !videoMsg) {
        await buttons.sendButtons(from, {
            text: `❌ *ＮＯ ＭＥＤＩＡ ＦＯＵＮＤ*\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ *How to use:*\n` +
                  `┃ 1️⃣ Send or forward an image/video\n` +
                  `┃ 2️⃣ Reply to that media with:\n` +
                  `┃    ${prefix}togroupstatus\n` +
                  `┃\n` +
                  `┃ *Commands:*\n` +
                  `┃ • ${prefix}togroupstatus list - Show groups\n` +
                  `┃ • ${prefix}togroupstatus all - Send to all\n` +
                  `┃ • ${prefix}togroupstatus select 2 - Send to specific\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '📋 LIST GROUPS', id: 'togroupstatus_list', type: 'reply' },
                { text: '📖 HELP', id: 'togroupstatus_help', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        return;
    }
    
    await react('📤');
    
    try {
        let mediaBuffer = null;
        let isVideo = false;
        let caption = '';
        let mimeType = '';
        
        if (imageMsg) {
            caption = imageMsg.caption || '📸 Status Update';
            const stream = await downloadContentFromMessage(imageMsg, 'image');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            mediaBuffer = buffer;
            mimeType = 'image/jpeg';
            
        } else if (videoMsg) {
            isVideo = true;
            caption = videoMsg.caption || '🎥 Status Update';
            
            if (videoMsg.seconds > 30) {
                await reply('❌ Video too long! Status videos must be under 30 seconds.');
                await react('❌');
                return;
            }
            
            const stream = await downloadContentFromMessage(videoMsg, 'video');
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            mediaBuffer = buffer;
            mimeType = 'video/mp4';
        }
        
        if (!mediaBuffer || mediaBuffer.length === 0) {
            throw new Error('Failed to download media');
        }
        
        // Store media in session
        const sessionId = Date.now().toString();
        groupStatusSessions.set(sessionId, {
            mediaBuffer,
            isVideo,
            caption,
            mimeType,
            from
        });
        
        // Get groups list
        const groups = await getGroupsList(sock);
        
        if (groups.length === 0) {
            await reply('❌ No groups found!');
            return;
        }
        
        let groupsList = `📋 *ＧＲＯＵＰＳ ＬＩＳＴ* 📋\n\n` +
                        `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
        
        groups.forEach((group, i) => {
            groupsList += `┃ *${i + 1}.* ${group.name}\n`;
            groupsList += `┃    👥 ${group.participants} members\n┃\n`;
        });
        
        groupsList += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                     `*Reply with the group number to send status*\n` +
                     `*Or use: .togroupstatus all*\n\n` +
                     `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
        
        await buttons.sendButtons(from, {
            text: groupsList,
            buttons: [
                { text: '📤 SEND TO ALL', id: 'togroupstatus_all', type: 'reply' },
                { text: '⬅️ BACK', id: 'togroupstatus', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        // Store session for later use
        groupStatusSessions.set('current', { sessionId, groups });
        
        // Auto cleanup after 5 minutes
        setTimeout(() => {
            if (groupStatusSessions.has(sessionId)) {
                groupStatusSessions.delete(sessionId);
            }
        }, 5 * 60 * 1000);
        
    } catch (error) {
        console.error('ToGroupStatus error:', error);
        await reply(`❌ Failed to process media: ${error.message}`);
        await react('❌');
    }
}

// Send to selected group
async function sendToSelectedGroup(sock, msg, groupIndex, context, buttons) {
    const { from, reply, react } = context;
    
    const session = groupStatusSessions.get('current');
    if (!session) {
        await reply('❌ No media session found. Please reply to media with .togroupstatus first.');
        return;
    }
    
    const groups = session.groups;
    if (groupIndex < 0 || groupIndex >= groups.length) {
        await reply(`❌ Invalid group number. Please select 1-${groups.length}`);
        return;
    }
    
    const targetGroup = groups[groupIndex];
    const mediaSession = groupStatusSessions.get(session.sessionId);
    
    if (!mediaSession) {
        await reply('❌ Media session expired. Please try again.');
        return;
    }
    
    await react('📤');
    
    try {
        if (mediaSession.isVideo) {
            await sock.sendMessage(targetGroup.jid, {
                video: mediaSession.mediaBuffer,
                caption: mediaSession.caption
            });
        } else {
            await sock.sendMessage(targetGroup.jid, {
                image: mediaSession.mediaBuffer,
                caption: mediaSession.caption
            });
        }
        
        await buttons.sendButtons(from, {
            text: `✅ *ＳＴＡＴＵＳ ＳＥＮＴ* ✅\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 📤 Sent to: ${targetGroup.name}\n` +
                  `┃ 📝 Caption: ${mediaSession.caption.substring(0, 50)}\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '📤 SEND TO ANOTHER', id: 'togroupstatus', type: 'reply' },
                { text: '📋 LIST GROUPS', id: 'togroupstatus_list', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
        
    } catch (error) {
        console.error('Send error:', error);
        await reply(`❌ Failed to send to ${targetGroup.name}: ${error.message}`);
        await react('❌');
    }
}

// Send to all groups
async function sendToAllGroups(sock, msg, args, context, buttons) {
    const { from, reply, react } = context;
    
    const session = groupStatusSessions.get('current');
    if (!session) {
        await reply('❌ No media session found. Please reply to media with .togroupstatus first.');
        return;
    }
    
    const groups = session.groups;
    const mediaSession = groupStatusSessions.get(session.sessionId);
    
    if (!mediaSession) {
        await reply('❌ Media session expired. Please try again.');
        return;
    }
    
    await react('📤');
    await reply(`🔄 Sending status to ${groups.length} groups...\nPlease wait.`);
    
    let success = 0;
    let failed = 0;
    const failedGroups = [];
    
    for (const group of groups) {
        try {
            if (mediaSession.isVideo) {
                await sock.sendMessage(group.jid, {
                    video: mediaSession.mediaBuffer,
                    caption: mediaSession.caption
                });
            } else {
                await sock.sendMessage(group.jid, {
                    image: mediaSession.mediaBuffer,
                    caption: mediaSession.caption
                });
            }
            success++;
            
            // Small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            failed++;
            failedGroups.push(group.name);
            console.error(`Failed to send to ${group.name}:`, error.message);
        }
    }
    
    let resultText = `✅ *ＢＲＯＡＤＣＡＳＴ ＣＯＭＰＬＥＴＥ* ✅\n\n` +
                    `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                    `┃\n` +
                    `┃ 📊 *Results:*\n` +
                    `┃ ├ ✅ Success: ${success}\n` +
                    `┃ ├ ❌ Failed: ${failed}\n` +
                    `┃ └ 📝 Total: ${groups.length}\n` +
                    `┃\n`;
    
    if (failedGroups.length > 0 && failedGroups.length <= 5) {
        resultText += `┃ *Failed Groups:*\n`;
        for (const name of failedGroups) {
            resultText += `┃   ❌ ${name}\n`;
        }
        resultText += `┃\n`;
    }
    
    resultText += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                 `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
    
    await buttons.sendButtons(from, {
        text: resultText,
        buttons: [
            { text: '📤 SEND AGAIN', id: 'togroupstatus', type: 'reply' },
            { text: '📋 LIST GROUPS', id: 'togroupstatus_list', type: 'reply' },
            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
    }, msg);
    
    await react('✅');
}

// Get list of groups
async function getGroupsList(sock) {
    const groups = [];
    
    try {
        const chats = sock.store?.chats || [];
        
        for (const [jid, chat] of Object.entries(chats)) {
            if (jid.endsWith('@g.us')) {
                try {
                    const metadata = await sock.groupMetadata(jid);
                    groups.push({
                        jid: jid,
                        name: metadata.subject,
                        participants: metadata.participants?.length || 0
                    });
                } catch (e) {}
            }
        }
    } catch (error) {
        console.error('Error getting groups:', error);
    }
    
    return groups;
}

// List all groups
async function listGroups(from, sock, msg, buttons) {
    const groups = await getGroupsList(sock);
    
    if (groups.length === 0) {
        await reply('❌ No groups found!');
        return;
    }
    
    let groupsList = `📋 *ＧＲＯＵＰＳ ＬＩＳＴ* 📋\n\n` +
                    `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
    
    groups.forEach((group, i) => {
        groupsList += `┃ *${i + 1}.* ${group.name}\n`;
        groupsList += `┃    👥 ${group.participants} members\n┃\n`;
    });
    
    groupsList += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                 `*Total: ${groups.length} groups*\n\n` +
                 `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
    
    await buttons.sendButtons(from, {
        text: groupsList,
        buttons: [
            { text: '📤 SEND STATUS', id: 'togroupstatus', type: 'reply' },
            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
    }, msg);
}

// Show main menu
async function showMainMenu(from, sock, msg, buttons, prefix) {
    await buttons.sendButtons(from, {
        text: `📤 *ＴＯ ＧＲＯＵＰ ＳＴＡＴＵＳ* 📤\n\n` +
              `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
              `┃\n` +
              `┃ *How to use:*\n` +
              `┃ 1️⃣ Send or forward an image/video\n` +
              `┃ 2️⃣ Reply with: ${prefix}togroupstatus\n` +
              `┃ 3️⃣ Select group number or "all"\n` +
              `┃\n` +
              `┃ *Commands:*\n` +
              `┃ • ${prefix}togroupstatus list - List groups\n` +
              `┃ • ${prefix}togroupstatus all - Send to all\n` +
              `┃ • ${prefix}togroupstatus select 2 - Send to specific\n` +
              `┃\n` +
              `┃ *Requirements:*\n` +
              `┃ • Only bot owner can use\n` +
              `┃ • Video max: 30 seconds\n` +
              `┃\n` +
              `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
        buttons: [
            { text: '📋 LIST GROUPS', id: 'togroupstatus_list', type: 'reply' },
            { text: '📤 SEND STATUS', id: 'togroupstatus', type: 'reply' },
            { text: '📖 HELP', id: 'togroupstatus_help', type: 'reply' },
            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
    }, msg);
}

// Show help
async function showHelp(from, sock, msg, buttons, prefix) {
    await buttons.sendButtons(from, {
        text: `📖 *ＴＯ ＧＲＯＵＰ ＳＴＡＴＵＳ ＨＥＬＰ* 📖\n\n` +
              `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
              `┃\n` +
              `┃ *Quick Start:*\n` +
              `┃\n` +
              `┃ 1️⃣ Send an image or short video\n` +
              `┃ 2️⃣ Reply with: ${prefix}togroupstatus\n` +
              `┃ 3️⃣ Choose where to send:\n` +
              `┃    • Reply with group number\n` +
              `┃    • Type "all" for all groups\n` +
              `┃\n` +
              `┃ *Commands:*\n` +
              `┃ • ${prefix}togroupstatus list - Show all groups\n` +
              `┃ • ${prefix}togroupstatus all - Send to all groups\n` +
              `┃ • ${prefix}togroupstatus select 2 - Send to group #2\n` +
              `┃\n` +
              `┃ *Limits:*\n` +
              `┃ • Video max: 30 seconds\n` +
              `┃ • Image max: 10MB\n` +
              `┃ • Rate limit: 500ms delay between sends\n` +
              `┃\n` +
              `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
        buttons: [
            { text: '📋 LIST GROUPS', id: 'togroupstatus_list', type: 'reply' },
            { text: '📤 SEND STATUS', id: 'togroupstatus', type: 'reply' },
            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
    }, msg);
}