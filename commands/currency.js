const axios = require('axios');

// API Configuration (using ExchangeRate-API)
const CURRENCY_API_KEY = '7b0ea837ba72e92b07f1t0wq27'; // Get from https://www.exchangerate-api.com/
const BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';

// Supported currencies (most common ones)
const SUPPORTED_CURRENCIES = [
    'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 
    'CHF', 'CNY', 'SEK', 'NZD', 'SGD', 'HKD',
    'INR', 'KRW', 'BRL', 'MXN', 'RUB', 'ZAR'
];

// Cache for exchange rates (valid for 1 hour)
const rateCache = new Map();
const CACHE_DURATION = 3600000; // 1 hour in ms

/**
 * Get exchange rates for a base currency
 * @param {string} baseCurrency - 3-letter currency code
 * @returns {Promise<Object>} - Exchange rates
 */
async function getExchangeRates(baseCurrency) {
    // Check cache first
    if (rateCache.has(baseCurrency)) {
        const cached = rateCache.get(baseCurrency);
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.rates;
        }
    }

    // Fetch fresh rates
    try {
        const response = await axios.get(`${BASE_URL}${baseCurrency}`);
        if (response.data.rates) {
            rateCache.set(baseCurrency, {
                rates: response.data.rates,
                timestamp: Date.now()
            });
            return response.data.rates;
        }
        throw new Error('Invalid API response');
    } catch (error) {
        console.error('Currency API Error:', error.message);
        throw new Error('Failed to fetch exchange rates. Try again later.');
    }
}

/**
 * Convert currency amount
 * @param {number} amount - Amount to convert
 * @param {string} from - From currency code
 * @param {string} to - To currency code
 * @returns {Promise<number>} - Converted amount
 */
async function convertCurrency(amount, from, to) {
    if (!SUPPORTED_CURRENCIES.includes(from.toUpperCase()) || 
        !SUPPORTED_CURRENCIES.includes(to.toUpperCase())) {
        throw new Error('Unsupported currency code');
    }

    const rates = await getExchangeRates(from.toUpperCase());
    const rate = rates[to.toUpperCase()];
    
    if (!rate) {
        throw new Error('Currency conversion not available');
    }

    return (amount * rate).toFixed(2);
}

/**
 * Handle currency command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 * @param {string} userMessage - User's input
 */
async function currencyCommand(sock, chatId, message, userMessage) {
    try {
        const args = userMessage.split(' ');
        
        // Show help if no arguments
        if (args.length < 4) {
            const currencyList = SUPPORTED_CURRENCIES.join(', ');
            await sock.sendMessage(chatId, {
                text: `💱 *Currency Converter*\n\nUsage:\n.currency <amount> <from> <to>\nExample:\n.currency 100 USD EUR\n\nSupported currencies:\n${currencyList}`,
                quoted: message
            });
            return;
        }

        const amount = parseFloat(args[1]);
        const from = args[2].toUpperCase();
        const to = args[3].toUpperCase();

        if (isNaN(amount)) {
            throw new Error('Invalid amount');
        }

        const result = await convertCurrency(amount, from, to);
        
        await sock.sendMessage(chatId, {
            text: `💰 ${amount} ${from} = ${result} ${to}`,
            quoted: message
        });

    } catch (error) {
        console.error('Currency Command Error:', error);
        await sock.sendMessage(chatId, {
            text: `❌ Error: ${error.message}`,
            quoted: message
        });
    }
}

module.exports = {
    currencyCommand,
    getExchangeRates,
    convertCurrency
};