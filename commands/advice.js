const axios = require('axios');

// Advice API Configuration
const ADVICE_API_URL = 'https://api.adviceslip.com/advice';

// Cache to avoid duplicate advice
const adviceCache = new Set();
const MAX_CACHE_SIZE = 30;

/**
 * Fetches random advice from API
 * @returns {Promise<string>} - Advice text
 */
async function getRandomAdvice() {
    try {
        const response = await axios.get(ADVICE_API_URL);
        
        if (!response.data.slip) {
            throw new Error('Failed to fetch advice');
        }

        const advice = response.data.slip.advice;
        
        // Check if advice was recently sent
        if (adviceCache.has(advice)) {
            return await getRandomAdvice(); // Get different advice
        }

        // Add to cache and manage size
        adviceCache.add(advice);
        if (adviceCache.size > MAX_CACHE_SIZE) {
            const [first] = adviceCache;
            adviceCache.delete(first);
        }

        return advice;
    } catch (error) {
        console.error('Advice API Error:', error);
        throw new Error('Could not fetch advice. Try again later!');
    }
}

/**
 * Handle advice command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 */
async function adviceCommand(sock, chatId, message) {
    try {
        // Typing indicator
        await sock.sendPresenceUpdate('composing', chatId);

        const advice = await getRandomAdvice();
        
        await sock.sendMessage(chatId, { 
            text: `💡 *Random Advice*\n\n"${advice}"\n\nUse *.advice* for more wisdom!`,
            quoted: message
        });

    } catch (error) {
        console.error('Advice Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to fetch advice. Try again later!',
            quoted: message
        });
    }
}

module.exports = {
    adviceCommand,
    getRandomAdvice
};