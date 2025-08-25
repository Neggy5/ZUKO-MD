const moment = require('moment-timezone');

/**
 * Get formatted time for different timezones
 * @returns {string} Formatted time information
 */
function getCurrentTimes() {
    const now = new Date();
    return `
🕒 *Current Time Around the World*

🌍 *GMT/UTC*: ${moment(now).tz('UTC').format('h:mm A')}
🇺🇸 *New York*: ${moment(now).tz('America/New_York').format('h:mm A')}
🇬🇧 *London*: ${moment(now).tz('Europe/London').format('h:mm A')}
🇸🇬 *Singapore*: ${moment(now).tz('Asia/Singapore').format('h:mm A')}
🇦🇪 *Dubai*: ${moment(now).tz('Asia/Dubai').format('h:mm A')}
🇳🇬 *Nigeria*: ${moment(now).tz('Africa/Lagos').format('h:mm A')}

📅 *Date*: ${moment(now).format('MMMM Do YYYY')}
⌚ *Your Local Time*: ${moment(now).format('h:mm A')}
`;
}

/**
 * Handle time command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 */
async function timeCommand(sock, chatId, message) {
    try {
        await sock.sendMessage(chatId, { 
            text: getCurrentTimes(),
            quoted: message
        });
    } catch (error) {
        console.error('Time Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to get time information. Try again later!',
            quoted: message
        });
    }
}

module.exports = {
    timeCommand
};