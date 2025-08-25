const settings = require("../settings");

// Cool font styles
const FONT_STYLES = {
    BOLD: '𝐙𝐔𝐊𝐎-𝐌𝐃',
    ITALIC: '𝘡𝘜𝘒𝘖-𝘔𝘋',
    MONOSPACE: '𝚉𝚄𝙺𝙾-𝙼𝙳',
    CURSIVE: '𝒵𝒰𝒦𝒪-ℳ𝒟',
    OUTLINE: '𝕫𝕦𝕜𝕠-𝕞𝕕',
    CIRCLE: 'ⓏⓊⓀⓄ-ⓂⒹ',
    SQUARE: '🅩🅤🅚🅞-🅜🅓',
    WIGGLY: 'Z̷U̷K̷O̷-̷M̷D̷',
    STRIKE: 'Z̶U̶K̶O̶-̶M̶D̶',
    SMALL_CAPS: 'ᴢᴜᴋᴏ-ᴍᴅ'
};

async function aliveCommand(sock, chatId, message) {
    try {
        // Randomly select a font style
        const styleKeys = Object.keys(FONT_STYLES);
        const randomStyle = FONT_STYLES[styleKeys[Math.floor(Math.random() * styleKeys.length)]];
        
        const aliveMessage = `
╔════════════════╗
   ${randomStyle} 
╚════════════════╝

✧ *Status*: Active 
✧ *Version*: ${settings.version || '1.0.0'}
✧ *Uptime*: ${formatUptime(process.uptime())}
✧ *Mode*: ${settings.mode || 'PUBLIC'}

🔥 *Bot is alive and running!*
        `.trim();

        await sock.sendMessage(chatId, {
            text: aliveMessage,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        }, { quoted: message });

        // Send audio if available
        if (settings.aliveAudioUrl) {
            await sock.sendMessage(chatId, { 
                audio: { url: settings.aliveAudioUrl },
                mimetype: 'audio/mp4',
                ptt: true
            });
        }

    } catch (error) {
        console.error('Alive command error:', error);
        await sock.sendMessage(chatId, { 
            text: '🟢 *ZUKO-MD IS ACTIVE*' 
        }, { quoted: message });
    }
}

// Helper function to format uptime
function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    return `${days}d ${hours}h ${mins}m ${secs}s`;
}

module.exports = aliveCommand;