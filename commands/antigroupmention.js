const fs = require('fs');
const path = require('path');

// Store group settings with persistence
let groupSettings = {};

// Load saved settings if available
try {
    if (fs.existsSync('./data/groupSettings.json')) {
        const data = fs.readFileSync('./data/groupSettings.json', 'utf8');
        groupSettings = JSON.parse(data);
    }
} catch (error) {
    console.error('Error loading group settings:', error);
}

// Save settings to file
function saveSettings() {
    try {
        fs.writeFileSync('./data/groupSettings.json', JSON.stringify(groupSettings));
    } catch (error) {
        console.error('Error saving group settings:', error);
    }
}

// Check if user is admin
async function isGroupAdmin(sock, chatId, userId) {
    try {
        const metadata = await sock.groupMetadata(chatId);
        const participant = metadata.participants.find(p => p.id === userId);
        return participant && (participant.admin === 'admin' || participant.admin === 'superadmin');
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

// Check if user has allowed role
function hasAllowedRole(chatId, roles) {
    if (!groupSettings[chatId] || !groupSettings[chatId].allowedRoles) return false;
    return roles.some(role => groupSettings[chatId].allowedRoles.includes(role));
}

// Anti-group mention command handler
async function antiGroupMentionCommand(sock, chatId, message, args) {
    try {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, {
                text: '❌ This command only works in groups!'
            });
        }

        // Check if user is admin to use this command
        const isAdmin = await isGroupAdmin(sock, chatId, message.key.participant);
        if (!isAdmin) {
            return await sock.sendMessage(chatId, {
                text: '❌ You need to be an admin to use this command!',
                mentions: [message.key.participant]
            });
        }

        // Initialize settings if not exists
        if (!groupSettings[chatId]) {
            groupSettings[chatId] = {
                antiMention: false,
                allowedRoles: ['admin', 'superadmin'],
                maxMentions: 3,
                action: 'delete' // Can be 'delete', 'warn', or 'mute'
            };
        }

        // Toggle mode
        if (args[0] === 'on') {
            groupSettings[chatId].antiMention = true;
            saveSettings();
            return await sock.sendMessage(chatId, {
                text: '🛡️ Anti-GroupMention enabled!\n\nNow blocking random @everyone/@all mentions and mass mentions.'
            });
        } else if (args[0] === 'off') {
            groupSettings[chatId].antiMention = false;
            saveSettings();
            return await sock.sendMessage(chatId, {
                text: '❌ Anti-GroupMention disabled'
            });
        } else if (args[0] === 'settings') {
            // Configure settings
            if (args[1] === 'max') {
                const max = parseInt(args[2]);
                if (!isNaN(max) && max > 0) {
                    groupSettings[chatId].maxMentions = max;
                    saveSettings();
                    return await sock.sendMessage(chatId, {
                        text: `✅ Maximum mentions set to ${max}`
                    });
                }
            } else if (args[1] === 'action') {
                const action = args[2];
                if (['delete', 'warn', 'mute'].includes(action)) {
                    groupSettings[chatId].action = action;
                    saveSettings();
                    return await sock.sendMessage(chatId, {
                        text: `✅ Action set to ${action}`
                    });
                }
            }
        }

        // Show current status
        await sock.sendMessage(chatId, {
            text: `⚙️ Anti-GroupMention Settings:\n\n` +
                  `• Status: ${groupSettings[chatId].antiMention ? '🟢 ON' : '🔴 OFF'}\n` +
                  `• Max allowed mentions: ${groupSettings[chatId].maxMentions}\n` +
                  `• Action: ${groupSettings[chatId].action}\n` +
                  `• Allowed to mention: ${groupSettings[chatId].allowedRoles.join(', ')}\n\n` +
                  `Usage:\n` +
                  `• .antigroupmention on - Enable protection\n` +
                  `• .antigroupmention off - Disable protection\n` +
                  `• .antigroupmention settings max [number] - Set max mentions\n` +
                  `• .antigroupmention settings action [delete|warn|mute] - Set action`
        });

    } catch (error) {
        console.error('Error in antigroupmention:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to update settings'
        });
    }
}

// Middleware to check mentions
async function checkGroupMentions(sock, message) {
    try {
        const chatId = message.key.remoteJid;
        if (!chatId.endsWith('@g.us') || !groupSettings[chatId]?.antiMention) return;

        // Get mentioned users
        const mentionedJids = message.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        
        // Check for @everyone or @all mentions
        const text = message.message?.conversation || 
                    message.message?.extendedTextMessage?.text || 
                    message.message?.imageMessage?.caption || '';
        
        const hasMassMention = text.includes('@everyone') || text.includes('@all');
        
        // Check if user is admin
        const isAdmin = await isGroupAdmin(sock, chatId, message.key.participant);
        
        // If non-admin exceeds mention limit or uses mass mention
        if ((mentionedJids.length > groupSettings[chatId].maxMentions || hasMassMention) && !isAdmin) {
            const settings = groupSettings[chatId];
            const user = message.key.participant;
            
            // Take action based on settings
            if (settings.action === 'delete') {
                await sock.sendMessage(chatId, {
                    delete: message.key
                });
                
                await sock.sendMessage(chatId, {
                    text: `⚠️ @${user.split('@')[0]}, mass mentions are restricted!`,
                    mentions: [user]
                });
            } 
            else if (settings.action === 'warn') {
                await sock.sendMessage(chatId, {
                    text: `⚠️ @${user.split('@')[0]}, mass mentions are restricted! This is a warning.`,
                    mentions: [user]
                });
            }
            else if (settings.action === 'mute') {
                // Try to mute the user for 10 minutes
                try {
                    await sock.groupParticipantsUpdate(
                        chatId, 
                        [user], 
                        'mute',
                        { duration: 600 } // 10 minutes in seconds
                    );
                    
                    await sock.sendMessage(chatId, {
                        text: `⚠️ @${user.split('@')[0]} has been muted for 10 minutes for mass mentioning.`,
                        mentions: [user]
                    });
                } catch (muteError) {
                    console.error('Error muting user:', muteError);
                    // Fallback to delete if mute fails
                    await sock.sendMessage(chatId, {
                        delete: message.key
                    });
                    
                    await sock.sendMessage(chatId, {
                        text: `⚠️ @${user.split('@')[0]}, mass mentions are restricted!`,
                        mentions: [user]
                    });
                }
            }
        }
    } catch (error) {
        console.error('Error in checkGroupMentions:', error);
    }
}

module.exports = {
    antiGroupMentionCommand,
    checkGroupMentions
};