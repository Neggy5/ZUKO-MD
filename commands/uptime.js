// commands/uptime.js
// Track bot start time for uptime calculation
const startTime = new Date();

function formatUptime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

async function uptimeCommand(sock, chatId, message) {
    try {
        const currentTime = new Date();
        const uptime = currentTime - startTime;
        const formattedUptime = formatUptime(uptime);

        await sock.sendMessage(chatId, {
            text: `⏱️ Bot Uptime: ${formattedUptime}\n\n🚀 *Start Time:* ${startTime.toLocaleString()}`,
            mentions: []
        }, { quoted: message });

    } catch (error) {
        console.error('Error in uptime command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to calculate uptime.'
        });
    }
}

module.exports = uptimeCommand;