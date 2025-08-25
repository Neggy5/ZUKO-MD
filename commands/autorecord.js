const fs = require('fs');
const path = require('path');

const AUTORECORD_FILE = path.join(__dirname, '../data/autorecord.json');

// Initialize auto-record settings
function loadAutoRecordSettings() {
    try {
        if (fs.existsSync(AUTORECORD_FILE)) {
            return JSON.parse(fs.readFileSync(AUTORECORD_FILE));
        }
        return {
            enabled: false,
            statusText: "🔴 Auto-Recording",
            notifyAdmins: true
        };
    } catch (error) {
        console.error('Error loading auto-record settings:', error);
        return {
            enabled: false,
            statusText: "🔴 Auto-Recording",
            notifyAdmins: true
        };
    }
}

// Save auto-record settings
function saveAutoRecordSettings(settings) {
    try {
        fs.writeFileSync(AUTORECORD_FILE, JSON.stringify(settings, null, 2));
    } catch (error) {
        console.error('Error saving auto-record settings:', error);
    }
}

// Main command handler
async function autoRecordCommand(sock, chatId, message, args) {
    try {
        const settings = loadAutoRecordSettings();
        
        // Only bot owner can configure this
        if (!message.key.fromMe) {
            await sock.sendMessage(chatId, {
                text: '❌ Only bot owner can configure auto-recording!'
            });
            return;
        }

        if (args.length === 0) {
            // Show current status
            await sock.sendMessage(chatId, {
                text: `🎙 *Auto-Recording Settings*\n\n` +
                      `Status: ${settings.enabled ? '✅ Enabled' : '❌ Disabled'}\n` +
                      `Presence Text: ${settings.statusText}\n` +
                      `Notify Admins: ${settings.notifyAdmins ? 'Yes' : 'No'}\n\n` +
                      `Usage:\n` +
                      `.autorecord on/off - Enable/disable\n` +
                      `.autorecord text <status> - Set presence text\n` +
                      `.autorecord notify on/off - Toggle admin notifications`
            });
            return;
        }

        const subCommand = args[0].toLowerCase();

        switch (subCommand) {
            case 'on':
                settings.enabled = true;
                saveAutoRecordSettings(settings);
                await updateBotPresence(sock, settings.statusText);
                await sock.sendMessage(chatId, { text: '✅ Auto-recording enabled' });
                break;
                
            case 'off':
                settings.enabled = false;
                saveAutoRecordSettings(settings);
                await sock.sendMessage(chatId, { text: '❌ Auto-recording disabled' });
                break;
                
            case 'text':
                const newText = args.slice(1).join(' ');
                if (!newText) {
                    await sock.sendMessage(chatId, { text: 'Please provide status text' });
                    return;
                }
                settings.statusText = newText;
                saveAutoRecordSettings(settings);
                await sock.sendMessage(chatId, { text: `✅ Presence text set to: ${newText}` });
                break;
                
            case 'notify':
                if (args[1] === 'on') {
                    settings.notifyAdmins = true;
                } else if (args[1] === 'off') {
                    settings.notifyAdmins = false;
                } else {
                    await sock.sendMessage(chatId, { text: 'Usage: .autorecord notify on/off' });
                    return;
                }
                saveAutoRecordSettings(settings);
                await sock.sendMessage(chatId, { 
                    text: `Admin notifications ${settings.notifyAdmins ? 'enabled' : 'disabled'}` 
                });
                break;
                
            default:
                await sock.sendMessage(chatId, { text: '❌ Invalid command. Use .autorecord for usage info' });
                break;
        }
    } catch (error) {
        console.error('Error in autoRecordCommand:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to update auto-record settings' });
    }
}

// Update bot's presence
async function updateBotPresence(sock, statusText) {
    try {
        await sock.sendPresenceUpdate('recording', statusText);
    } catch (error) {
        console.error('Error updating presence:', error);
    }
}

// Handle call events (to be called from main.js)
async function handleCallRecording(sock, call) {
    const settings = loadAutoRecordSettings();
    if (!settings.enabled) return;

    try {
        // Update presence to show recording status
        await updateBotPresence(sock, settings.statusText);

        // Notify admins if enabled
        if (settings.notifyAdmins && call.from.endsWith('@g.us')) {
            const metadata = await sock.groupMetadata(call.from);
            const admins = metadata.participants.filter(p => p.admin).map(p => p.id);
            
            for (const admin of admins) {
                await sock.sendMessage(admin, {
                    text: `🎙 Auto-recording started in ${metadata.subject}\n` +
                          `Call from: ${call.remoteJid}`
                });
            }
        }

        // Here you would add actual recording logic
        // This is just a placeholder for the presence feature
        console.log(`Recording call from ${call.remoteJid}`);

    } catch (error) {
        console.error('Error handling call recording:', error);
    } finally {
        // Reset presence when done
        setTimeout(() => {
            sock.sendPresenceUpdate('available', 'Online');
        }, 5000);
    }
}

module.exports = {
    autoRecordCommand,
    handleCallRecording,
    loadAutoRecordSettings
};