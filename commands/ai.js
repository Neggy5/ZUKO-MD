/**
 * AI Command - Chat with AI (Working Free APIs)
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';

// Conversation memory
const conversationMemory = new Map();
const MAX_MEMORY = 6;
const MEMORY_TTL = 30 * 60 * 1000;

// Working free AI APIs (tested and working)
const FREE_APIS = [
    // API 1: ZenKey API (working)
    async (prompt) => {
        const response = await axios.get(`https://api.zenkey.my.id/api/ai/gpt?query=${encodeURIComponent(prompt)}`, {
            timeout: 30000,
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        return response.data?.result || response.data?.response || response.data?.data;
    },
    
    // API 2: LolHuman API
    async (prompt) => {
        const response = await axios.get(`https://api.lolhuman.xyz/api/gpt?apikey=rey2&query=${encodeURIComponent(prompt)}`, {
            timeout: 30000
        });
        return response.data?.result || response.data?.response;
    },
    
    // API 3: Aemt API
    async (prompt) => {
        const response = await axios.get(`https://aemt.me/gpt?text=${encodeURIComponent(prompt)}`, {
            timeout: 30000
        });
        return response.data?.result || response.data?.response || response.data?.message;
    },
    
    // API 4: Vihangay API
    async (prompt) => {
        const response = await axios.get(`https://vihangay.com/tools/gpt.php?q=${encodeURIComponent(prompt)}`, {
            timeout: 30000
        });
        return response.data?.response || response.data?.result;
    },
    
    // API 5: Elyx API
    async (prompt) => {
        const response = await axios.get(`https://elyx.online/api/gpt?query=${encodeURIComponent(prompt)}`, {
            timeout: 30000
        });
        return response.data?.response || response.data?.result;
    }
];

// System prompt
const SYSTEM_PROMPT = `You are ZUKO AI, a helpful WhatsApp assistant. Keep responses short and friendly (max 3-4 sentences). Use emojis occasionally. Be helpful and conversational.`;

// Clean expired memory
setInterval(() => {
    const now = Date.now();
    for (const [userId, data] of conversationMemory.entries()) {
        if (now - data.timestamp > MEMORY_TTL) {
            conversationMemory.delete(userId);
        }
    }
}, 5 * 60 * 1000);

function getConversationHistory(userId) {
    const memory = conversationMemory.get(userId);
    if (!memory) return [];
    return memory.history || [];
}

function saveConversationHistory(userId, userMsg, aiResponse) {
    const existing = conversationMemory.get(userId) || { history: [], timestamp: Date.now() };
    existing.history.push({ role: 'user', content: userMsg });
    existing.history.push({ role: 'assistant', content: aiResponse });
    if (existing.history.length > MAX_MEMORY) {
        existing.history = existing.history.slice(-MAX_MEMORY);
    }
    existing.timestamp = Date.now();
    conversationMemory.set(userId, existing);
}

function clearHistory(userId) {
    conversationMemory.delete(userId);
}

// Try multiple APIs until one works
async function getAIResponse(prompt, userId) {
    // Get conversation history for context
    const history = getConversationHistory(userId);
    let context = '';
    if (history.length > 0) {
        const lastFew = history.slice(-4);
        context = lastFew.map(msg => `${msg.role === 'user' ? 'User' : 'AI'}: ${msg.content}`).join('\n') + '\n';
    }
    
    const fullPrompt = `${SYSTEM_PROMPT}\n\n${context}User: ${prompt}\nAI:`;
    
    for (const api of FREE_APIS) {
        try {
            const response = await api(fullPrompt);
            if (response && response.length > 0 && response.length < 2000 && !response.includes('error')) {
                return response;
            }
        } catch (err) {
            console.log('API failed, trying next...');
            continue;
        }
    }
    
    // If all APIs fail, return a helpful message
    return "I'm having trouble connecting right now. Please try again in a few moments! 🤖\n\n*Note:* You can also try asking a different question.";
}

export default {
    name: 'ai',
    description: 'Chat with AI assistant (Free)',
    aliases: ['gpt', 'ask', 'chatgpt', 'ai'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        const action = args[0]?.toLowerCase();
        const query = action === 'clear' || action === 'reset' ? null : args.join(' ');
        
        // Handle clear history
        if (action === 'clear' || action === 'reset') {
            clearHistory(sender);
            await buttons.sendButtons(from, {
                text: `🗑️ *ＣＯＮＶＥＲＳＡＴＩＯＮ ＣＬＥＡＲＥＤ*\n\nYour conversation history has been reset.\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '💬 ASK AI', id: 'ai', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Handle help
        if (action === 'help' || !query) {
            await buttons.sendButtons(from, {
                text: `🤖 *ＡＩ ＡＳＳＩＳＴＡＮＴ* 🤖\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Usage:*\n` +
                      `┃ • ${prefix}ai <your question>\n` +
                      `┃ • ${prefix}ai clear - Clear history\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃ ${prefix}ai What is the capital of France?\n` +
                      `┃ ${prefix}ai Tell me a joke\n` +
                      `┃ ${prefix}ai Explain quantum computing\n` +
                      `┃\n` +
                      `┃ *Features:*\n` +
                      `┃ • Free to use\n` +
                      `┃ • Remembers conversation\n` +
                      `┃ • Fast responses\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '💬 ASK AI', id: 'ai', type: 'reply' },
                    { text: '🗑️ CLEAR', id: 'ai_clear', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('🤔');
        
        try {
            // Send typing indicator
            await sock.sendPresenceUpdate('composing', from);
            
            // Get AI response
            const response = await getAIResponse(query, sender);
            
            let cleanResponse = response.trim();
            if (cleanResponse.length > 4000) {
                cleanResponse = cleanResponse.substring(0, 3997) + '...';
            }
            
            await sock.sendMessage(from, {
                text: `🤖 *ＡＩ ＲＥＳＰＯＮＳＥ* 🤖\n\n╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n┃ ${cleanResponse}\n┃\n╰━━━━━━━━━━━━━━━━━━━━━╯\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
            }, { quoted: msg });
            
            saveConversationHistory(sender, query, cleanResponse);
            
            await buttons.sendButtons(from, {
                text: `✅ *ＡＩ ＲＥＳＰＯＮＳＥ ＳＥＮＴ* ✅`,
                buttons: [
                    { text: '💬 CONTINUE', id: 'ai', type: 'reply' },
                    { text: '🗑️ CLEAR', id: 'ai_clear', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('AI error:', error);
            
            await buttons.sendButtons(from, {
                text: `❌ *ＡＩ ＣＯＭＭＡＮＤ ＦＡＩＬＥＤ* ❌\n\n` +
                      `Error: ${error.message}\n\n` +
                      `*Try:*\n` +
                      `• ${prefix}ai help\n` +
                      `• Ask a different question\n` +
                      `• Try again later\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'ai', type: 'reply' },
                    { text: '📖 HELP', id: 'ai_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};