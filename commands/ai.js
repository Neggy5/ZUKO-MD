const axios = require('axios');
const fetch = require('node-fetch');

// Configuration
const API_TIMEOUT = 15000; // 15 seconds timeout
const MAX_RETRIES = 2;
const RATE_LIMIT_DELAY = 1000; // 1 second between API calls

async function aiCommand(sock, chatId, message) {
    try {
        // Validate inputs
        if (!sock || !chatId || !message) {
            throw new Error('Invalid parameters');
        }

        // Extract text content
        const text = message.message?.conversation || 
                    message.message?.extendedTextMessage?.text;
        
        if (!text) {
            return await sendUsageExample(sock, chatId, message);
        }

        // Parse command and query
        const [command, ...queryParts] = text.split(' ');
        const query = queryParts.join(' ').trim();

        if (!query) {
            return await sendUsageExample(sock, chatId, message);
        }

        // Show processing indicator
        await sock.sendMessage(chatId, {
            react: { text: '⏳', key: message.key }
        });

        let response;
        if (command.toLowerCase() === '.gpt') {
            response = await handleGPTRequest(query);
        } else if (command.toLowerCase() === '.gemini') {
            response = await handleGeminiRequest(query);
        } else {
            return await sendUsageExample(sock, chatId, message);
        }

        // Send the response in chunks if too long
        await sendResponseInChunks(sock, chatId, message, response);

    } catch (error) {
        console.error('AI Command Error:', error);
        await handleErrorResponse(sock, chatId, message, error);
    }
}

async function handleGPTRequest(query) {
    const url = `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(query)}`;
    
    try {
        const response = await axios.get(url, { timeout: API_TIMEOUT });
        
        if (!response.data?.success || !response.data.result?.prompt) {
            throw new Error('Invalid API response structure');
        }

        return response.data.result.prompt;
    } catch (error) {
        console.error('GPT API Error:', error);
        throw new Error('Failed to get response from GPT API');
    }
}

async function handleGeminiRequest(query) {
    const apis = [
        {
            url: `https://vapis.my.id/api/gemini?q=${encodeURIComponent(query)}`,
            extractor: data => data.message
        },
        {
            url: `https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(query)}`,
            extractor: data => data.data
        },
        {
            url: `https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(query)}`,
            extractor: data => data.result
        },
        {
            url: `https://api.dreaded.site/api/gemini2?text=${encodeURIComponent(query)}`,
            extractor: data => data.result
        },
        {
            url: `https://api.giftedtech.my.id/api/ai/geminiai?apikey=gifted&q=${encodeURIComponent(query)}`,
            extractor: data => data.answer
        },
        {
            url: `https://api.giftedtech.my.id/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(query)}`,
            extractor: data => data.answer
        }
    ];

    for (let retry = 0; retry < MAX_RETRIES; retry++) {
        for (const api of apis) {
            try {
                await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
                
                const response = await fetch(api.url, { timeout: API_TIMEOUT });
                if (!response.ok) continue;
                
                const data = await response.json();
                const answer = api.extractor(data);
                
                if (answer) {
                    return answer;
                }
            } catch (error) {
                console.debug(`Gemini API ${api.url} failed:`, error.message);
                continue;
            }
        }
    }

    throw new Error('All Gemini API endpoints failed');
}

async function sendResponseInChunks(sock, chatId, message, response) {
    const MAX_CHUNK_SIZE = 4096; // WhatsApp message limit
    
    if (response.length <= MAX_CHUNK_SIZE) {
        await sock.sendMessage(chatId, {
            text: response,
            contextInfo: {
                mentionedJid: [message.key.participant || message.key.remoteJid],
                quotedMessage: message.message
            }
        });
        return;
    }

    // Split into chunks
    const chunks = [];
    for (let i = 0; i < response.length; i += MAX_CHUNK_SIZE) {
        chunks.push(response.substring(i, i + MAX_CHUNK_SIZE));
    }

    // Send first chunk as reply
    await sock.sendMessage(chatId, {
        text: chunks[0],
        contextInfo: {
            mentionedJid: [message.key.participant || message.key.remoteJid],
            quotedMessage: message.message
        }
    });

    // Send remaining chunks sequentially
    for (let i = 1; i < chunks.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between chunks
        await sock.sendMessage(chatId, { text: chunks[i] });
    }
}

async function sendUsageExample(sock, chatId, message) {
    await sock.sendMessage(chatId, { 
        text: "🤖 *AI Command Usage*\n\n" +
             "• `.gpt [your question]` - Get answer from GPT\n" +
             "• `.gemini [your question]` - Get answer from Gemini\n\n" +
             "Example: `.gpt explain quantum computing in simple terms`",
        contextInfo: {
            mentionedJid: [message.key.participant || message.key.remoteJid],
            quotedMessage: message.message
        }
    });
}

async function handleErrorResponse(sock, chatId, message, error) {
    let errorMessage = "❌ An error occurred. Please try again later.";
    
    if (error.message.includes('timeout')) {
        errorMessage = "⏱️ The request timed out. Please try again.";
    } else if (error.message.includes('Failed to get response')) {
        errorMessage = "🌐 API service unavailable. Please try again later.";
    }

    await sock.sendMessage(chatId, {
        text: errorMessage,
        contextInfo: {
            mentionedJid: [message.key.participant || message.key.remoteJid],
            quotedMessage: message.message
        }
    });
}

module.exports = aiCommand;