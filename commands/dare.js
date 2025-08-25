const fetch = require('node-fetch');
const NodeCache = require('node-cache');

// Cache dares for 1 hour to avoid duplicate questions
const dareCache = new NodeCache({ stdTTL: 3600 });

// Difficulty levels
const DIFFICULTY_LEVELS = {
    easy: 'Easy 😊',
    medium: 'Medium 😐',
    hard: 'Hard 😈',
    extreme: 'Extreme 🔥'
};

async function dareCommand(sock, chatId, message, args = []) {
    try {
        // Extract difficulty level
        const difficulty = args[0]?.toLowerCase() || 'random';
        const cacheKey = `dare_${difficulty}`;

        // Check cache first
        const cachedDare = dareCache.get(cacheKey);
        if (cachedDare) {
            return await sock.sendMessage(chatId, { 
                text: `♻️ Cached Dare (${DIFFICULTY_LEVELS[difficulty] || 'Random'}):\n\n${cachedDare}\n\nSend ".dare new" for a fresh dare`,
                mentions: []
            }, { quoted: message });
        }

        // API URL with optional difficulty
        const apiUrl = difficulty === 'random' || !DIFFICULTY_LEVELS[difficulty]
            ? `https://api.shizo.top/api/quote/dare?apikey=knightbot`
            : `https://api.shizo.top/api/quote/dare/${difficulty}?apikey=knightbot`;

        const res = await fetch(apiUrl, { timeout: 5000 });
        
        if (!res.ok) {
            throw new Error(`API Error: ${res.statusText}`);
        }
        
        const json = await res.json();
        const dareMessage = json.result || "No dare found for this difficulty level.";

        // Cache the new dare
        dareCache.set(cacheKey, dareMessage);

        // Format response
        const difficultyDisplay = DIFFICULTY_LEVELS[difficulty] || 'Random';
        const responseText = `📛 *Dare (${difficultyDisplay})*\n\n${dareMessage}\n\n` +
                            `💡 Try: .dare easy/medium/hard/extreme\n` +
                            `🔄 Get new: .dare new`;

        await sock.sendMessage(chatId, { 
            text: responseText,
            mentions: []
        }, { quoted: message });

    } catch (error) {
        console.error('Dare command error:', error);
        
        const fallbackDares = [
            "Do 10 pushups right now!",
            "Sing a song out loud in a public voice note",
            "Text your last contact 'I think I like you'",
            "Wear your clothes backwards for the next hour"
        ];
        
        let errorMessage = '❌ Failed to fetch a dare.';
        if (error.message.includes('timeout')) {
            errorMessage += '\n\nRequest timed out. Try again later.';
        } else {
            errorMessage += `\n\nHere's a fallback dare:\n${fallbackDares[Math.floor(Math.random() * fallbackDares.length)]}`;
        }

        await sock.sendMessage(chatId, { 
            text: errorMessage,
            mentions: []
        }, { quoted: message });
    }
}

module.exports = {
    dareCommand,
    DIFFICULTY_LEVELS // Export for help command
};