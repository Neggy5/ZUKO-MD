const fetch = require('node-fetch');
const NodeCache = require('node-cache');
const quoteCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 });

// Quote categories with emojis
const QUOTE_CATEGORIES = {
    random: '🎲 Random',
    love: '💖 Love',
    motivational: '💪 Motivational',
    funny: '😂 Funny',
    life: '🌱 Life',
    friendship: '👫 Friendship',
    wisdom: '🧠 Wisdom',
    success: '🏆 Success'
};

// Fallback quotes
const FALLBACK_QUOTES = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "In the middle of difficulty lies opportunity. - Albert Einstein",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "Strive not to be a success, but rather to be of value. - Albert Einstein",
    "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela",
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
    "If life were predictable it would cease to be life, and be without flavor. - Eleanor Roosevelt"
];

async function quoteCommand(sock, chatId, message, args, apiKey = 'knightbot') {
    try {
        const category = args[0]?.toLowerCase() || 'random';
        const cacheKey = `${apiKey}_${category}`;

        // Validate category
        if (!QUOTE_CATEGORIES[category]) {
            return await sendCategoryList(sock, chatId, message);
        }

        // Check cache first
        const cachedQuote = quoteCache.get(cacheKey);
        if (cachedQuote) {
            return await sendQuoteMessage(sock, chatId, message, cachedQuote, category);
        }

        // Fetch fresh quote
        const quote = await fetchQuote(category, apiKey);
        quoteCache.set(cacheKey, quote);

        // Send the quote
        await sendQuoteMessage(sock, chatId, message, quote, category);

        // Add reaction to show success
        await sock.sendMessage(chatId, { 
            react: { 
                text: '✅', 
                key: message.key 
            }
        });

    } catch (error) {
        console.error('Quote command error:', error);
        await handleQuoteError(sock, chatId, message, error);
    }
}

async function fetchQuote(category, apiKey) {
    const url = `https://api.shizo.top/api/quote/${category}?apikey=${apiKey}`;
    const res = await fetch(url, { timeout: 5000 });

    if (!res.ok) {
        throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    return json.result || getRandomFallbackQuote();
}

async function sendQuoteMessage(sock, chatId, message, quote, category) {
    const formattedQuote = `
📜 *${QUOTE_CATEGORIES[category]} Quote*

${quote}

💬 _Want another? Try:_
.quote ${category}
.quote random
    `.trim();

    await sock.sendMessage(chatId, { 
        text: formattedQuote,
        mentions: []
    }, { quoted: message });
}

async function sendCategoryList(sock, chatId, message) {
    const categoriesText = Object.entries(QUOTE_CATEGORIES)
        .map(([key, value]) => `• ${value}: \`.quote ${key}\``)
        .join('\n');

    await sock.sendMessage(chatId, {
        text: `📚 *Available Quote Categories*\n\n${categoriesText}\n\nExample: \`.quote motivational\``,
        mentions: []
    }, { quoted: message });
}

async function handleQuoteError(sock, chatId, message, error) {
    const fallbackQuote = getRandomFallbackQuote();
    
    await sock.sendMessage(chatId, {
        text: `❌ Error fetching quote: ${error.message}\n\n📜 Here's a fallback quote:\n\n${fallbackQuote}`,
        mentions: []
    }, { quoted: message });

    await sock.sendMessage(chatId, { 
        react: { 
            text: '❌', 
            key: message.key 
        }
    });
}

function getRandomFallbackQuote() {
    return FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
}

async function saveQuote(userId, quote) {
    // In a real implementation, you would:
    // 1. Connect to your database
    // 2. Save the quote with user reference
    // 3. Return success/failure
    
    console.log(`[DEBUG] Would save quote for user ${userId}:`, quote.substring(0, 30) + '...');
    return { success: true, message: "Quote saved (simulated)" };
}

module.exports = {
    quoteCommand,
    saveQuote,
    getRandomFallbackQuote,
    QUOTE_CATEGORIES
};