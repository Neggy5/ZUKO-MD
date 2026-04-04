/**
 * Bible Command - Get random Bible verse or search scriptures
 * ES Module version with button support
 * Uses free Bible API: https://bible-api.com/
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';

// Fallback verses in case API fails
const fallbackVerses = [
    { verse: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
    { verse: "Philippians 4:13", text: "I can do all things through Christ who strengthens me." },
    { verse: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future." },
    { verse: "Psalm 23:4", text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me." },
    { verse: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose." },
    { verse: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight." },
    { verse: "Matthew 11:28", text: "Come to me, all you who are weary and burdened, and I will give you rest." }
];

// Bible books list for validation
const bibleBooks = [
    "genesis", "exodus", "leviticus", "numbers", "deuteronomy", "joshua", "judges", "ruth",
    "1samuel", "2samuel", "1kings", "2kings", "1chronicles", "2chronicles", "ezra", "nehemiah",
    "esther", "job", "psalm", "proverbs", "ecclesiastes", "songofsolomon", "isaiah", "jeremiah",
    "lamentations", "ezekiel", "daniel", "hosea", "joel", "amos", "obadiah", "jonah", "micah",
    "nahum", "habakkuk", "zephaniah", "haggai", "zechariah", "malachi", "matthew", "mark",
    "luke", "john", "acts", "romans", "1corinthians", "2corinthians", "galatians", "ephesians",
    "philippians", "colossians", "1thessalonians", "2thessalonians", "1timothy", "2timothy",
    "titus", "philemon", "hebrews", "james", "1peter", "2peter", "1john", "2john", "3john", "jude", "revelation"
];

// Format book name for display
function formatBookName(book) {
    const specialBooks = {
        '1samuel': '1 Samuel',
        '2samuel': '2 Samuel',
        '1kings': '1 Kings',
        '2kings': '2 Kings',
        '1chronicles': '1 Chronicles',
        '2chronicles': '2 Chronicles',
        'songofsolomon': 'Song of Solomon',
        '1corinthians': '1 Corinthians',
        '2corinthians': '2 Corinthians',
        '1thessalonians': '1 Thessalonians',
        '2thessalonians': '2 Thessalonians',
        '1timothy': '1 Timothy',
        '2timothy': '2 Timothy',
        '1peter': '1 Peter',
        '2peter': '2 Peter',
        '1john': '1 John',
        '2john': '2 John',
        '3john': '3 John'
    };
    
    if (specialBooks[book.toLowerCase()]) {
        return specialBooks[book.toLowerCase()];
    }
    return book.charAt(0).toUpperCase() + book.slice(1);
}

export default {
    name: 'bible',
    description: 'Search Bible scriptures or get random verses',
    aliases: ['verse', 'scripture', 'bibleverse', 'biblesearch', 'searchbible'],
    
    async execute(sock, msg, args, context) {
        const { from, react, reply } = context;
        const buttons = new ButtonManager(sock);
        
        await react('📖');
        
        const searchQuery = args.join(' ').trim();
        let verseRef = '';
        let verseText = '';
        let translation = 'kjv';
        let fromApi = false;
        let isSearch = false;
        
        // Check for translation option
        let cleanQuery = searchQuery;
        if (searchQuery.startsWith('--web') || searchQuery.startsWith('-w')) {
            translation = 'web';
            cleanQuery = searchQuery.replace(/--web|-w/, '').trim();
        } else if (searchQuery.startsWith('--kjv') || searchQuery.startsWith('-k')) {
            translation = 'kjv';
            cleanQuery = searchQuery.replace(/--kjv|-k/, '').trim();
        }
        
        // If no query, show random verse
        if (!cleanQuery) {
            try {
                const randomBook = bibleBooks[Math.floor(Math.random() * bibleBooks.length)];
                const randomChapter = Math.floor(Math.random() * 50) + 1;
                const randomVerse = Math.floor(Math.random() * 30) + 1;
                const formattedBook = formatBookName(randomBook);
                const apiUrl = `https://bible-api.com/${formattedBook}+${randomChapter}:${randomVerse}?translation=${translation}`;
                
                const response = await axios.get(apiUrl, { timeout: 10000 });
                
                if (response.data && response.data.text) {
                    verseRef = response.data.reference || `${formattedBook} ${randomChapter}:${randomVerse}`;
                    verseText = response.data.text;
                    fromApi = true;
                } else {
                    throw new Error('No verse found');
                }
            } catch (error) {
                const random = fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
                verseRef = random.verse;
                verseText = random.text;
                fromApi = false;
            }
        } else {
            // SEARCH MODE - Try to find scriptures matching the query
            
            // Case 1: Exact verse reference (e.g., "John 3:16" or "John 3:16-18")
            const verseMatch = cleanQuery.match(/^([a-zA-Z0-9\s]+)\s+(\d+):(\d+)(?:-(\d+))?$/i);
            
            if (verseMatch) {
                // Exact verse lookup
                let book = verseMatch[1].trim();
                const chapter = verseMatch[2];
                const verse = verseMatch[3];
                const endVerse = verseMatch[4];
                
                // Format book name properly
                book = formatBookName(book);
                const reference = endVerse ? `${book}+${chapter}:${verse}-${endVerse}` : `${book}+${chapter}:${verse}`;
                const apiUrl = `https://bible-api.com/${reference}?translation=${translation}`;
                
                try {
                    const response = await axios.get(apiUrl, { timeout: 10000 });
                    if (response.data && response.data.text) {
                        verseRef = response.data.reference || `${book} ${chapter}:${verse}`;
                        verseText = response.data.text;
                        fromApi = true;
                    } else {
                        throw new Error('Verse not found');
                    }
                } catch (error) {
                    verseRef = cleanQuery;
                    verseText = "Sorry, this verse could not be found. Please check the reference and try again.";
                    fromApi = false;
                }
            } 
            // Case 2: Search by book name only (e.g., "Psalms", "John", "Romans")
            else if (bibleBooks.some(book => cleanQuery.toLowerCase().includes(book) || book.includes(cleanQuery.toLowerCase()))) {
                // Find matching book
                let matchedBook = bibleBooks.find(book => 
                    book.toLowerCase() === cleanQuery.toLowerCase() ||
                    cleanQuery.toLowerCase().includes(book.toLowerCase()) ||
                    book.toLowerCase().includes(cleanQuery.toLowerCase())
                );
                
                if (matchedBook) {
                    const formattedBook = formatBookName(matchedBook);
                    const randomChapter = Math.floor(Math.random() * 50) + 1;
                    const randomVerse = Math.floor(Math.random() * 30) + 1;
                    const apiUrl = `https://bible-api.com/${formattedBook}+${randomChapter}:${randomVerse}?translation=${translation}`;
                    
                    try {
                        const response = await axios.get(apiUrl, { timeout: 10000 });
                        if (response.data && response.data.text) {
                            verseRef = response.data.reference || `${formattedBook} ${randomChapter}:${randomVerse}`;
                            verseText = response.data.text;
                            fromApi = true;
                            isSearch = true;
                        } else {
                            throw new Error('No verse found');
                        }
                    } catch (error) {
                        const random = fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
                        verseRef = random.verse;
                        verseText = random.text;
                        fromApi = false;
                    }
                } else {
                    // Case 3: Keyword search (e.g., "love", "faith", "hope")
                    isSearch = true;
                    const searchKeyword = encodeURIComponent(cleanQuery);
                    
                    // Try to get verses containing the keyword using a different API endpoint
                    // Note: bible-api.com doesn't support keyword search directly, so we'll try multiple random verses
                    let found = false;
                    for (let i = 0; i < 10; i++) {
                        const randomBook = bibleBooks[Math.floor(Math.random() * bibleBooks.length)];
                        const randomChapter = Math.floor(Math.random() * 50) + 1;
                        const randomVerse = Math.floor(Math.random() * 30) + 1;
                        const formattedBook = formatBookName(randomBook);
                        const apiUrl = `https://bible-api.com/${formattedBook}+${randomChapter}:${randomVerse}?translation=${translation}`;
                        
                        try {
                            const response = await axios.get(apiUrl, { timeout: 5000 });
                            if (response.data && response.data.text && 
                                response.data.text.toLowerCase().includes(cleanQuery.toLowerCase())) {
                                verseRef = response.data.reference || `${formattedBook} ${randomChapter}:${randomVerse}`;
                                verseText = response.data.text;
                                fromApi = true;
                                found = true;
                                break;
                            }
                        } catch (e) {
                            continue;
                        }
                    }
                    
                    if (!found) {
                        // If no matching verse found, show a random verse with a note
                        const randomBook = bibleBooks[Math.floor(Math.random() * bibleBooks.length)];
                        const randomChapter = Math.floor(Math.random() * 50) + 1;
                        const randomVerse = Math.floor(Math.random() * 30) + 1;
                        const formattedBook = formatBookName(randomBook);
                        const apiUrl = `https://bible-api.com/${formattedBook}+${randomChapter}:${randomVerse}?translation=${translation}`;
                        
                        try {
                            const response = await axios.get(apiUrl, { timeout: 10000 });
                            if (response.data && response.data.text) {
                                verseRef = response.data.reference || `${formattedBook} ${randomChapter}:${randomVerse}`;
                                verseText = response.data.text;
                                fromApi = true;
                                verseText = `[Note: No exact match found for "${cleanQuery}"]\n\n${verseText}`;
                            } else {
                                throw new Error('No verse found');
                            }
                        } catch (error) {
                            const random = fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
                            verseRef = random.verse;
                            verseText = `[Note: No match found for "${cleanQuery}"]\n\n${random.text}`;
                            fromApi = false;
                        }
                    }
                }
            } 
            else {
                // Keyword search (e.g., "love", "faith", "hope")
                isSearch = true;
                const searchKeyword = encodeURIComponent(cleanQuery);
                
                let found = false;
                for (let i = 0; i < 10; i++) {
                    const randomBook = bibleBooks[Math.floor(Math.random() * bibleBooks.length)];
                    const randomChapter = Math.floor(Math.random() * 50) + 1;
                    const randomVerse = Math.floor(Math.random() * 30) + 1;
                    const formattedBook = formatBookName(randomBook);
                    const apiUrl = `https://bible-api.com/${formattedBook}+${randomChapter}:${randomVerse}?translation=${translation}`;
                    
                    try {
                        const response = await axios.get(apiUrl, { timeout: 5000 });
                        if (response.data && response.data.text && 
                            response.data.text.toLowerCase().includes(cleanQuery.toLowerCase())) {
                            verseRef = response.data.reference || `${formattedBook} ${randomChapter}:${randomVerse}`;
                            verseText = response.data.text;
                            fromApi = true;
                            found = true;
                            break;
                        }
                    } catch (e) {
                        continue;
                    }
                }
                
                if (!found) {
                    const random = fallbackVerses[Math.floor(Math.random() * fallbackVerses.length)];
                    verseRef = random.verse;
                    verseText = `[Note: No verse found containing "${cleanQuery}"]\n\n${random.text}`;
                    fromApi = false;
                }
            }
        }
        
        // Clean up the verse text
        verseText = verseText.replace(/\s+/g, ' ').trim();
        
        // Truncate if too long
        if (verseText.length > 800) {
            verseText = verseText.substring(0, 800) + '...';
        }
        
        const translationName = translation === 'kjv' ? 'King James Version' : 'World English Bible';
        const searchInfo = isSearch ? `\n┃ 🔍 *Search:* "${cleanQuery}"\n┃` : '';
        
        await buttons.sendButtons(from, {
            text: `📖 *ＢＩＢＬＥ ＳＣＲＩＰＴＵＲＥ* 📖\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 📜 *${verseRef}* ${fromApi ? `(${translationName})` : '(Fallback)'}\n` +
                  `${searchInfo}` +
                  `┃\n` +
                  `┃ 💬 "${verseText}"\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '🔄 RANDOM', id: 'bible', type: 'reply' },
                { text: '📖 KJV', id: 'bible_kjv', type: 'reply' },
                { text: '📖 WEB', id: 'bible_web', type: 'reply' },
                { text: '🔍 SEARCH', id: 'bible_search', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};