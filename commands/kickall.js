/**
 * KickAll Command - Remove all non-admin members from group
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

// Store pending kickall operations
const pendingKickall = new Map();

export default {
    name: 'kickall',
    description: 'Remove all non-admin members from the group',
    aliases: ['kickall', 'removeall', 'purge', 'clearall'],
    
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
            await reply('❌ Only group admins can use this command!');
            return;
        }
        
        // Check bot admin
        const botIsAdmin = await isBotAdmin;
        if (!botIsAdmin) {
            await reply('❌ I need to be an admin to kick members!');
            return;
        }
        
        // Get group metadata
        let groupMetadata = context.groupMetadata;
        if (!groupMetadata) {
            try {
                groupMetadata = await sock.groupMetadata(from);
            } catch (error) {
                await reply('❌ Failed to fetch group members!');
                return;
            }
        }
        
        const participants = groupMetadata.participants || [];
        
        // Identify admins and non-admins
        const admins = [];
        const nonAdmins = [];
        const botJid = sock.user.id;
        
        for (const participant of participants) {
            const jid = participant.id;
            const isAdminUser = participant.admin === 'admin' || participant.admin === 'superadmin';
            
            if (isAdminUser) {
                admins.push(jid);
            } else if (jid !== botJid) {
                nonAdmins.push(jid);
            }
        }
        
        if (nonAdmins.length === 0) {
            await buttons.sendButtons(from, {
                text: `📋 *ＮＯ ＮＯＮ-ＡＤＭＩＮ ＭＥＭＢＥＲＳ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 👥 All members in this group are admins.\n` +
                      `┃\n` +
                      `┃ 📊 *Total Members:* ${participants.length}\n` +
                      `┃ 👑 *Admins:* ${admins.length}\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Check if force flag is used
        const forceMode = args[0]?.toLowerCase() === 'force' || args[0]?.toLowerCase() === '--force';
        
        if (!forceMode) {
            // Store pending operation for confirmation
            const confirmId = Date.now().toString();
            pendingKickall.set(confirmId, {
                from,
                sender,
                nonAdmins,
                totalMembers: participants.length,
                adminCount: admins.length
            });
            
            // Ask for confirmation
            await buttons.sendButtons(from, {
                text: `⚠️ *ＫＩＣＫ ＡＬＬ ＣＯＮＦＩＲＭＡＴＩＯＮ* ⚠️\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 🔴 *WARNING:* This will remove ALL non-admin members!\n` +
                      `┃\n` +
                      `┃ 📊 *Statistics:*\n` +
                      `┃ ├ 👥 Total Members: ${participants.length}\n` +
                      `┃ ├ 👑 Admins: ${admins.length}\n` +
                      `┃ ├ 👤 Non-Admins: ${nonAdmins.length}\n` +
                      `┃ └ 🤖 Bot: 1\n` +
                      `┃\n` +
                      `┃ ⚠️ *This action CANNOT be undone!*\n` +
                      `┃\n` +
                      `┃ 💡 Use .kickall force to skip confirmation\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ CONFIRM KICK ALL', id: 'kickall_confirm', type: 'reply' },
                    { text: '❌ CANCEL', id: 'kickall_cancel', type: 'reply' },
                    { text: '⚡ KICK ALL FORCE', id: 'kickall_force', type: 'reply' }
                ]
            }, msg);
            
            // Auto-cleanup after 60 seconds
            setTimeout(() => {
                if (pendingKickall.has(confirmId)) {
                    pendingKickall.delete(confirmId);
                }
            }, 60000);
            
            await react('⚠️');
            return;
        }
        
        // Execute kickall
        await performKickAll(sock, from, sender, nonAdmins, participants.length, admins.length, msg, buttons, react);
    },
    
    ownerOnly: false,
    groupOnly: true,
    adminOnly: true,
    botAdminNeeded: true
};

// Function to perform the kickall operation
async function performKickAll(sock, from, sender, nonAdmins, totalMembers, adminCount, msg, buttons, react) {
    await react('👢');
    
    // Send processing message
    const processingMsg = await sock.sendMessage(from, {
        text: `🔄 *ＫＩＣＫＩＮＧ ＡＬＬ ＮＯＮ-ＡＤＭＩＮＳ* 🔄\n\n` +
              `⏳ Removing ${nonAdmins.length} members...\n` +
              `Please wait, this may take a moment.\n\n` +
              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
    }, { quoted: msg });
    
    let kicked = 0;
    let failed = 0;
    const kickedList = [];
    const failedList = [];
    
    // Kick each non-admin member
    for (const jid of nonAdmins) {
        try {
            await sock.groupParticipantsUpdate(from, [jid], 'remove');
            kicked++;
            kickedList.push(jid);
            
            // Add small delay to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
            failed++;
            failedList.push(jid);
            console.error(`Failed to kick ${jid}:`, error.message);
        }
    }
    
    // Get updated group metadata
    let updatedMetadata;
    try {
        updatedMetadata = await sock.groupMetadata(from);
    } catch (error) {
        updatedMetadata = null;
    }
    
    const remainingMembers = updatedMetadata?.participants?.length || 'Unknown';
    
    // Build result message
    let resultText = `✅ *ＫＩＣＫ ＡＬＬ ＣＯＭＰＬＥＴＥ* ✅\n\n` +
                     `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                     `┃\n` +
                     `┃ 📊 *Results:*\n` +
                     `┃ ├ ✅ Kicked: ${kicked}\n` +
                     `┃ ├ ❌ Failed: ${failed}\n` +
                     `┃ ├ 👥 Remaining: ${remainingMembers}\n` +
                     `┃ └ 👑 Admins kept: ${adminCount}\n` +
                     `┃\n`;
    
    if (kickedList.length > 0 && kickedList.length <= 10) {
        resultText += `┃ *Kicked Users:*\n`;
        for (const jid of kickedList.slice(0, 10)) {
            resultText += `┃   👤 @${jid.split('@')[0]}\n`;
        }
        if (kickedList.length > 10) {
            resultText += `┃   ... and ${kickedList.length - 10} more\n`;
        }
        resultText += `┃\n`;
    }
    
    if (failedList.length > 0 && failedList.length <= 5) {
        resultText += `┃ *Failed Users:*\n`;
        for (const jid of failedList) {
            resultText += `┃   ❌ @${jid.split('@')[0]}\n`;
        }
        resultText += `┃\n`;
    }
    
    resultText += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
    
    await sock.sendMessage(from, { text: resultText, mentions: [...kickedList, ...failedList] }, { quoted: msg });
    
    await buttons.sendButtons(from, {
        text: `✅ *ＯＰＥＲＡＴＩＯＮ ＣＯＭＰＬＥＴＥ* ✅\n\n` +
              `Successfully kicked ${kicked} members from the group.`,
        buttons: [
            { text: '📊 GROUP INFO', id: 'group_info', type: 'reply' },
            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
    }, msg);
    
    await react('✅');
}

// Export handler functions for button responses
export async function handleKickAllConfirm(sock, confirmId, approved) {
    const pending = pendingKickall.get(confirmId);
    if (!pending) return false;
    
    const { from, sender, nonAdmins, totalMembers, adminCount } = pending;
    pendingKickall.delete(confirmId);
    
    if (!approved) {
        await sock.sendMessage(from, { text: '❌ Kick all operation cancelled.' });
        return false;
    }
    
    // Create a temporary buttons object
    const buttons = new ButtonManager(sock);
    await performKickAll(sock, from, sender, nonAdmins, totalMembers, adminCount, null, buttons, null);
    return true;
}