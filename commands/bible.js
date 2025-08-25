const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Cache file to store API responses
const CACHE_FILE = path.join(__dirname, '../data/bible_cache.json');
const API_URL = 'https://bible-api.com';

// Initialize cache directory and file
if (!fs.existsSync(path.dirname(CACHE_FILE))) {
    fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
}
if (!fs.existsSync(CACHE_FILE)) {
    fs.writeFileSync(CACHE_FILE, JSON.stringify({}, null, 2));
}

// Default channel info if not provided
const defaultChannelInfo = {
    mentions: [],
    footer: 'Bible Bot',
    viewOnce: true
};

async function bibleCommand(sock, chatId, message, args, channelInfo = defaultChannelInfo) {
    try {
        const input = args.join(' ').trim();
        
        if (!input) {
            return await sock.sendMessage(chatId, { 
                text: `📖 *Bible Command Usage:*\n\n.bible <reference> <translation>\n\n*Examples:*\n.bible John 3:16\n.bible Psalm 23 KJV\n.bible random NIV\n\n*Available Translations:* KJV, NIV, ESV, NASB, NLT`,
                ...channelInfo
            }, { quoted: message });
        }

        // Handle random verse request
        if (input.toLowerCase().includes('random')) {
            const translation = input.split(' ').find(word => 
                ['KJV', 'NIV', 'ESV', 'NASB', 'NLT'].includes(word.toUpperCase())
            ) || 'KJV';
            
            return await getRandomVerse(sock, chatId, message, translation.toUpperCase(), channelInfo);
        }

        // Parse reference and translation
        const parts = input.split(' ');
        let translation = 'KJV'; // Default translation
        let reference = input;

        // Check if last part is a translation
        const possibleTranslation = parts[parts.length - 1].toUpperCase();
        if (['KJV', 'NIV', 'ESV', 'NASB', 'NLT'].includes(possibleTranslation)) {
            translation = possibleTranslation;
            reference = parts.slice(0, -1).join(' ').trim();
        }

        // Check cache first
        let cache = {};
        try {
            cache = JSON.parse(fs.readFileSync(CACHE_FILE));
        } catch (cacheError) {
            console.error('Cache read error:', cacheError);
            // Continue without cache if there's an error
        }

        const cacheKey = `${reference}_${translation}`;
        
        if (cache[cacheKey] && cache[cacheKey].text) {
            return await sendBibleVerse(sock, chatId, message, cache[cacheKey], channelInfo);
        }

        // Fetch from API with timeout
        const response = await axios.get(`${API_URL}/${encodeURIComponent(reference)}?translation=${translation}`, {
            timeout: 5000 // 5 second timeout
        });
        
        if (!response.data || !response.data.text) {
            throw new Error('Invalid API response');
        }

        const verseData = response.data;

        // Cache the result
        try {
            cache[cacheKey] = verseData;
            fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
        } catch (writeError) {
            console.error('Cache write error:', writeError);
            // Continue even if cache fails
        }

        await sendBibleVerse(sock, chatId, message, verseData, channelInfo);

    } catch (error) {
        console.error('Bible command error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Could not fetch the verse. Please check the reference and try again.\nExample: .bible John 3:16 NIV',
            ...channelInfo
        }, { quoted: message });
    }
}

async function getRandomVerse(sock, chatId, message, translation = 'KJV', channelInfo = defaultChannelInfo) {
    try {
        const books = [
            // Old Testament
            'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
            'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
            '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
            'Nehemiah', 'Esther', 'Job', 'Psalm', 'Proverbs',
            'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
            'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
            'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
            'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
            // New Testament
            'Matthew', 'Mark', 'Luke', 'John', 'Acts',
            'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
            'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy',
            '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
            '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
            'Jude', 'Revelation'
        ];

        const randomBook = books[Math.floor(Math.random() * books.length)];
        let randomChapter, randomVerse;

        // Handle books with limited chapters
        switch (randomBook) {
            case 'Obadiah':
            case 'Philemon':
            case '2 John':
            case '3 John':
            case 'Jude':
                randomChapter = 1;
                randomVerse = Math.floor(Math.random() * 10) + 1;
                break;
            case 'Psalm':
                randomChapter = Math.floor(Math.random() * 150) + 1;
                randomVerse = Math.floor(Math.random() * (randomChapter === 150 ? 6 : 30)) + 1;
                break;
            default:
                randomChapter = Math.floor(Math.random() * 50) + 1;
                randomVerse = Math.floor(Math.random() * 30) + 1;
        }

        const reference = `${randomBook} ${randomChapter}:${randomVerse}`;
        const response = await axios.get(`${API_URL}/${encodeURIComponent(reference)}?translation=${translation}`, {
            timeout: 5000
        });
        
        if (!response.data || !response.data.text) {
            throw new Error('Invalid random verse response');
        }

        await sendBibleVerse(sock, chatId, message, response.data, channelInfo);

    } catch (error) {
        console.error('Random verse error:', error);
        // Retry once with different random book
        try {
            await getRandomVerse(sock, chatId, message, translation, channelInfo);
        } catch (retryError) {
            await sock.sendMessage(chatId, { 
                text: '❌ Failed to fetch random verse. Please try again later.',
                ...channelInfo
            }, { quoted: message });
        }
    }
}

async function sendBibleVerse(sock, chatId, message, verseData, channelInfo = defaultChannelInfo) {
    try {
        const text = `📖 *${verseData.reference} (${verseData.translation_name})*\n\n` +
                    `${verseData.text}\n\n` +
                    `_${verseData.verses.length > 1 ? `${verseData.verses.length} verses` : '1 verse'}_`;
        
        await sock.sendMessage(chatId, { 
            text: text,
            ...channelInfo
        }, { quoted: message });
    } catch (sendError) {
        console.error('Error sending verse:', sendError);
        throw sendError;
    }
}

module.exports = bibleCommand;