/**
 * Fun Command - Get facts, jokes, memes, quotes, and trivia
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';

// API endpoints (free, no API key required)
const APIS = {
    fact: 'https://uselessfacts.jsph.pl/api/v2/facts/random',
    joke: 'https://v2.jokeapi.dev/joke/Any?safe-mode',
    quote: 'https://api.quotable.io/random',
    trivia: 'https://opentdb.com/api.php?amount=1&type=multiple',
    meme: 'https://meme-api.com/gimme'
};

export default {
    name: 'fun',
    description: 'Get random facts, jokes, memes, quotes, or trivia',
    aliases: ['fact', 'joke', 'meme', 'quote', 'trivia', 'randomfun'],
    
    async execute(sock, msg, args, context) {
        const { from, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        const type = args[0]?.toLowerCase();
        
        // Show help menu if no type specified
        if (!type || type === 'help') {
            await buttons.sendButtons(from, {
                text: `🎲 *ＦＵＮ ＣＯＭＭＡＮＤＳ* 🎲\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}fun fact - Random fact\n` +
                      `┃ • ${prefix}fun joke - Random joke\n` +
                      `┃ • ${prefix}fun meme - Random meme\n` +
                      `┃ • ${prefix}fun quote - Random quote\n` +
                      `┃ • ${prefix}fun trivia - Random trivia\n` +
                      `┃ • ${prefix}fun random - Random of any\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃ ${prefix}fun fact\n` +
                      `┃ ${prefix}joke\n` +
                      `┃ ${prefix}meme\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 FACT', id: 'fun_fact', type: 'reply' },
                    { text: '😂 JOKE', id: 'fun_joke', type: 'reply' },
                    { text: '🖼️ MEME', id: 'fun_meme', type: 'reply' },
                    { text: '💬 QUOTE', id: 'fun_quote', type: 'reply' },
                    { text: '❓ TRIVIA', id: 'fun_trivia', type: 'reply' },
                    { text: '🎲 RANDOM', id: 'fun_random', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('🎲');
        
        try {
            let result;
            let category = type;
            
            // Handle random selection
            if (type === 'random') {
                const types = ['fact', 'joke', 'quote', 'trivia'];
                category = types[Math.floor(Math.random() * types.length)];
            }
            
            switch (category) {
                case 'fact':
                    result = await getFact();
                    await sendFact(from, sock, result, msg, buttons);
                    break;
                    
                case 'joke':
                    result = await getJoke();
                    await sendJoke(from, sock, result, msg, buttons);
                    break;
                    
                case 'meme':
                    result = await getMeme();
                    await sendMeme(from, sock, result, msg, buttons);
                    break;
                    
                case 'quote':
                    result = await getQuote();
                    await sendQuote(from, sock, result, msg, buttons);
                    break;
                    
                case 'trivia':
                    result = await getTrivia();
                    await sendTrivia(from, sock, result, msg, buttons);
                    break;
                    
                default:
                    await reply(`❌ Unknown category: ${type}\n\nUse ${prefix}fun help for available options.`);
                    await react('❌');
                    return;
            }
            
            await react('✅');
            
        } catch (error) {
            console.error('Fun command error:', error);
            await reply(`❌ Failed to fetch ${type}. Please try again later.`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};

// Helper functions
async function getFact() {
    try {
        const response = await axios.get(APIS.fact, { timeout: 10000 });
        return {
            text: response.data.text,
            source: 'Useless Facts'
        };
    } catch (error) {
        // Fallback facts
        const fallbackFacts = [
            "A group of flamingos is called a 'flamboyance'.",
            "Octopuses have three hearts.",
            "Honey never spoils. Archaeologists found 3000-year-old honey in Egyptian tombs.",
            "A day on Venus is longer than a year on Venus.",
            "Bananas are berries, but strawberries aren't.",
            "Cows have best friends and get stressed when separated.",
            "The Eiffel Tower can grow up to 15 cm taller in summer due to heat expansion."
        ];
        return {
            text: fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)],
            source: 'Fallback Facts'
        };
    }
}

async function getJoke() {
    try {
        const response = await axios.get(APIS.joke, { timeout: 10000 });
        if (response.data.type === 'single') {
            return {
                text: response.data.joke,
                source: 'JokeAPI'
            };
        } else {
            return {
                text: `${response.data.setup}\n\n${response.data.delivery}`,
                source: 'JokeAPI'
            };
        }
    } catch (error) {
        // Fallback jokes
        const fallbackJokes = [
            { text: "Why don't scientists trust atoms? Because they make up everything!" },
            { text: "What do you call a fake noodle? An impasta!" },
            { text: "Why did the scarecrow win an award? He was outstanding in his field!" },
            { text: "What do you call a bear with no teeth? A gummy bear!" }
        ];
        return fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
    }
}

async function getMeme() {
    try {
        const response = await axios.get(APIS.meme, { timeout: 10000 });
        return {
            url: response.data.url,
            title: response.data.title,
            author: response.data.author,
            subreddit: response.data.subreddit,
            ups: response.data.ups
        };
    } catch (error) {
        // Fallback memes (direct URLs)
        const fallbackMemes = [
            { url: 'https://i.imgflip.com/1bij.jpg', title: 'One Does Not Simply' },
            { url: 'https://i.imgflip.com/26am.jpg', title: 'Bad Luck Brian' },
            { url: 'https://i.imgflip.com/1otk96.jpg', title: 'Change My Mind' }
        ];
        return fallbackMemes[Math.floor(Math.random() * fallbackMemes.length)];
    }
}

async function getQuote() {
    try {
        const response = await axios.get(APIS.quote, { timeout: 10000 });
        return {
            text: response.data.content,
            author: response.data.author,
            source: 'Quotable'
        };
    } catch (error) {
        // Fallback quotes
        const fallbackQuotes = [
            { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
            { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
            { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" }
        ];
        return fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    }
}

async function getTrivia() {
    try {
        const response = await axios.get(APIS.trivia, { timeout: 10000 });
        const question = response.data.results[0];
        const correctAnswer = question.correct_answer;
        const incorrectAnswers = question.incorrect_answers;
        const allAnswers = [...incorrectAnswers, correctAnswer];
        
        // Shuffle answers
        for (let i = allAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
        }
        
        return {
            question: question.question,
            correctAnswer: correctAnswer,
            options: allAnswers,
            category: question.category,
            difficulty: question.difficulty
        };
    } catch (error) {
        // Fallback trivia
        return {
            question: "What is the largest ocean on Earth?",
            correctAnswer: "Pacific Ocean",
            options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
            category: "Geography",
            difficulty: "easy"
        };
    }
}

async function sendFact(from, sock, fact, msg, buttons) {
    const factText = `📖 *ＲＡＮＤＯＭ ＦＡＣＴ* 📖\n\n` +
                     `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                     `┃\n` +
                     `┃ 💡 ${fact.text}\n` +
                     `┃\n` +
                     `┃ 📰 Source: ${fact.source}\n` +
                     `┃\n` +
                     `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                     `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
    
    await buttons.sendButtons(from, {
        text: factText,
        buttons: [
            { text: '🔄 NEW FACT', id: 'fun_fact', type: 'reply' },
            { text: '😂 JOKE', id: 'fun_joke', type: 'reply' },
            { text: '🎲 RANDOM', id: 'fun_random', type: 'reply' },
            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
    }, msg);
}

async function sendJoke(from, sock, joke, msg, buttons) {
    const jokeText = `😂 *ＲＡＮＤＯＭ ＪＯＫＥ* 😂\n\n` +
                     `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                     `┃\n` +
                     `┃ ${joke.text}\n` +
                     `┃\n` +
                     `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                     `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
    
    await buttons.sendButtons(from, {
        text: jokeText,
        buttons: [
            { text: '🔄 NEW JOKE', id: 'fun_joke', type: 'reply' },
            { text: '📖 FACT', id: 'fun_fact', type: 'reply' },
            { text: '🎲 RANDOM', id: 'fun_random', type: 'reply' },
            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
    }, msg);
}

async function sendMeme(from, sock, meme, msg, buttons) {
    try {
        // Download meme image
        const response = await axios.get(meme.url, { responseType: 'arraybuffer', timeout: 15000 });
        const memeBuffer = Buffer.from(response.data);
        
        const caption = `🖼️ *ＲＡＮＤＯＭ ＭＥＭＥ* 🖼️\n\n` +
                       `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                       `┃\n` +
                       `┃ 📛 *Title:* ${meme.title || 'Meme'}\n` +
                       `┃ 👤 *Author:* ${meme.author || 'Unknown'}\n` +
                       `┃ 📍 *Subreddit:* ${meme.subreddit || 'Unknown'}\n` +
                       `┃ 👍 *Upvotes:* ${meme.ups || 'N/A'}\n` +
                       `┃\n` +
                       `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                       `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
        
        await sock.sendMessage(from, {
            image: memeBuffer,
            caption: caption
        }, { quoted: msg });
        
        await buttons.sendButtons(from, {
            text: `✅ *ＭＥＭＥ ＳＥＮＴ* ✅`,
            buttons: [
                { text: '🔄 NEW MEME', id: 'fun_meme', type: 'reply' },
                { text: '😂 JOKE', id: 'fun_joke', type: 'reply' },
                { text: '🎲 RANDOM', id: 'fun_random', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
    } catch (error) {
        console.error('Meme download error:', error);
        await buttons.sendButtons(from, {
            text: `🖼️ *ＲＡＮＤＯＭ ＭＥＭＥ*\n\n${meme.url}\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '🔄 NEW MEME', id: 'fun_meme', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
    }
}

async function sendQuote(from, sock, quote, msg, buttons) {
    const quoteText = `💬 *ＲＡＮＤＯＭ ＱＵＯＴＥ* 💬\n\n` +
                     `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                     `┃\n` +
                     `┃ 📝 "${quote.text}"\n` +
                     `┃\n` +
                     `┃ — *${quote.author}*\n` +
                     `┃\n` +
                     `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                     `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
    
    await buttons.sendButtons(from, {
        text: quoteText,
        buttons: [
            { text: '🔄 NEW QUOTE', id: 'fun_quote', type: 'reply' },
            { text: '📖 FACT', id: 'fun_fact', type: 'reply' },
            { text: '🎲 RANDOM', id: 'fun_random', type: 'reply' },
            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
    }, msg);
}

async function sendTrivia(from, sock, trivia, msg, buttons) {
    const difficultyEmoji = {
        easy: '🟢',
        medium: '🟡',
        hard: '🔴'
    };
    
    const optionsText = trivia.options.map((opt, i) => `${i + 1}. ${decodeHtml(opt)}`).join('\n┃    ');
    
    const triviaText = `❓ *ＴＲＩＶＩＡ ＱＵＥＳＴＩＯＮ* ❓\n\n` +
                       `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                       `┃\n` +
                       `┃ 📂 *Category:* ${decodeHtml(trivia.category)}\n` +
                       `┃ ${difficultyEmoji[trivia.difficulty] || '🟡'} *Difficulty:* ${trivia.difficulty.toUpperCase()}\n` +
                       `┃\n` +
                       `┃ 📝 *Question:*\n` +
                       `┃ ${decodeHtml(trivia.question)}\n` +
                       `┃\n` +
                       `┃ *Options:*\n` +
                       `┃    ${optionsText}\n` +
                       `┃\n` +
                       `┃ 💡 Reply with the number (1-4) to check answer!\n` +
                       `┃\n` +
                       `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                       `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
    
    // Store trivia in cache for answer checking
    if (!global.triviaCache) global.triviaCache = new Map();
    const triviaId = Date.now().toString();
    global.triviaCache.set(triviaId, {
        correctAnswer: trivia.correctAnswer,
        options: trivia.options,
        from: from
    });
    
    setTimeout(() => {
        if (global.triviaCache.has(triviaId)) {
            global.triviaCache.delete(triviaId);
        }
    }, 60000);
    
    await buttons.sendButtons(from, {
        text: triviaText,
        buttons: [
            { text: '🔄 NEW TRIVIA', id: 'fun_trivia', type: 'reply' },
            { text: '🎲 RANDOM', id: 'fun_random', type: 'reply' },
            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
    }, msg);
}

function decodeHtml(html) {
    return html
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&eacute;/g, 'é')
        .replace(/&aacute;/g, 'á')
        .replace(/&oacute;/g, 'ó');
}