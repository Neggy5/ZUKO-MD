const os = require('os');
const settings = require('../settings.js');

const reactionEmojis = ['⛅🌦️🌤️', '💘💝💖', '👻⛄👀', '🪁🪃🎳', '🎀🎁🎈', '🙊🙉🙈', '👻💀☠️', '🤍🩷🩶', '☁️🌨️🌧️', '🌦️🌥️⛅', '🌜🌚🌝', '🥀🌹💐', '☃️🪺🪹', '🍂🍄🌾', '🍁🌴🍀', '🐼🐹🐰', '👻⛄☃️', '⚡✨🌟'];

function formatTime(seconds) {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds = seconds % (24 * 60 * 60);
    const hours = Math.floor(seconds / (60 * 60));
    seconds = seconds % (60 * 60);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);

    let time = '';
    if (days > 0) time += `${days}d `;
    if (hours > 0) time += `${hours}h `;
    if (minutes > 0) time += `${minutes}m `;
    if (seconds > 0 || time === '') time += `${seconds}s`;

    return time.trim();
}

async function pingCommand(sock, chatId, message) {
    try {
        // Select random emoji set
        const randomEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        
        const start = Date.now();
        await sock.sendMessage(chatId, { 
            text: `🏓✨ *Pong!* ${randomEmoji}`,
            mentions: []
        }, { quoted: message });
        
        const end = Date.now();
        const ping = Math.round((end - start) / 2);

        const uptimeInSeconds = process.uptime();
        const uptimeFormatted = formatTime(uptimeInSeconds);

        const botInfo = `
╭─ ZUKO-MD ────────╮
│ • Ping: ${ping}ms ⚡  
│ • Uptime: ${uptimeFormatted} 
│ • Version: v${settings.version} 
╰─ ✅ Running ───────╯
`.trim();

        await sock.sendMessage(chatId, { 
            text: botInfo,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });

    } catch (error) {
        console.error('Error in ping command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ *Failed to get bot status!* ⚠️\nPlease try again later. 🔄',
            mentions: []
        }, { quoted: message });
    }
}

module.exports = pingCommand;