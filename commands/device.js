const axios = require('axios');

async function deviceCommand(sock, chatId, message) {
    try {
        // Get the device name from the message or use a default
        const text = message.message?.conversation || 
                    message.message?.extendedTextMessage?.text || '';
        
        const args = text.split(' ');
        const deviceName = args.length > 1 ? args.slice(1).join(' ') : 'iPhone 15 Pro Max';
        
        // Fetch device information from GSMArena API
        const response = await axios.get('https://api.gsmarena.com/api/v1/search', {
            params: {
                q: deviceName,
                limit: 1
            }
        });
        
        if (!response.data || !response.data.data || response.data.data.length === 0) {
            await sock.sendMessage(chatId, {
                text: `❌ Device "${deviceName}" not found. Please try a different device name.`,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
            return;
        }
        
        const device = response.data.data[0];
        const deviceId = device.id;
        
        // Get detailed device information
        const detailResponse = await axios.get(`https://api.gsmarena.com/api/v1/device/${deviceId}`);
        
        if (!detailResponse.data || !detailResponse.data.specs) {
            await sock.sendMessage(chatId, {
                text: `❌ Could not retrieve details for "${deviceName}".`,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
            return;
        }
        
        const deviceDetails = detailResponse.data;
        const specs = deviceDetails.specs;
        
        // Format the device information
        let deviceInfo = `📱 *${deviceDetails.name || deviceName}*\n\n`;
        
        if (deviceDetails.release_date) {
            deviceInfo += `📅 *Release Date:* ${deviceDetails.release_date}\n`;
        }
        
        if (specs.body && specs.body.dimensions) {
            deviceInfo += `📏 *Dimensions:* ${specs.body.dimensions}\n`;
        }
        
        if (specs.display && specs.display.resolution) {
            deviceInfo += `🖥️ *Display:* ${specs.display.resolution}\n`;
        }
        
        if (specs.platform && specs.platform.os) {
            deviceInfo += `⚙️ *OS:* ${specs.platform.os}\n`;
        }
        
        if (specs.platform && specs.platform.chipset) {
            deviceInfo += `🔧 *Chipset:* ${specs.platform.chipset}\n`;
        }
        
        if (specs.memory && specs.memory.internal) {
            deviceInfo += `💾 *Storage:* ${specs.memory.internal}\n`;
        }
        
        if (specs.main_camera) {
            deviceInfo += `📸 *Main Camera:* ${specs.main_camera}\n`;
        }
        
        if (specs.selfie_camera) {
            deviceInfo += `🤳 *Selfie Camera:* ${specs.selfie_camera}\n`;
        }
        
        if (specs.battery) {
            deviceInfo += `🔋 *Battery:* ${specs.battery}\n`;
        }
        
        if (deviceDetails.price) {
            deviceInfo += `💰 *Price:* ${deviceDetails.price}\n`;
        }
        
        // Send the device information
        await sock.sendMessage(chatId, {
            text: deviceInfo,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });
        
    } catch (error) {
        console.error('Error in device command:', error);
        
        // Fallback to a simpler device info method if API fails
        try {
            const text = message.message?.conversation || 
                        message.message?.extendedTextMessage?.text || '';
            
            const args = text.split(' ');
            const deviceName = args.length > 1 ? args.slice(1).join(' ') : 'iPhone 15 Pro Max';
            
            // Simple device information as fallback
            const deviceInfo = `📱 *${deviceName}*\n\n` +
                             `This is a fallback response as the device API is temporarily unavailable.\n\n` +
                             `*Usage:* .device <device_name>\n` +
                             `*Example:* .device Samsung Galaxy S23 Ultra`;
            
            await sock.sendMessage(chatId, {
                text: deviceInfo,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
            await sock.sendMessage(chatId, {
                text: '❌ Failed to process device command. Please try again later.',
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
        }
    }
}

module.exports = {
    deviceCommand
};