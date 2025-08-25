const fetch = require('node-fetch');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

// Cache setup
const CACHE_DIR = path.join(__dirname, '../cache/lyrics');
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours cache

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Multiple API endpoints as fallback
const LYRIC_APIS = [
    {
        name: 'some-random-api',
        url: (title) => `https://some-random-api.com/lyrics?title=${encodeURIComponent(title)}`
    },
    {
        name: 'lyrics.ovh',
        url: (title, artist = '') => `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`
    }
];

async function lyricsCommand(sock, chatId, message, query) {
    try {
        if (!query) {
            return await sock.sendMessage(chatId, { 
                text: '🔍 *Usage:*\n\n.lyrics <song name>\n.lyrics <artist> - <song name>\n\nExample: .lyrics Adele - Hello',
                mentions: []
            }, { quoted: message });
        }

        // Try to extract artist and song name
        const [artist, song] = query.split('-').map(s => s.trim());
        const searchQuery = song ? `${artist} ${song}` : query;
        const cacheKey = `${searchQuery.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`;
        const cachePath = path.join(CACHE_DIR, cacheKey);

        // Check cache first
        if (fs.existsSync(cachePath)) {
            const cachedData = JSON.parse(await readFile(cachePath));
            if (Date.now() - cachedData.timestamp < CACHE_TTL) {
                return await sendLyrics(sock, chatId, message, cachedData.data);
            }
        }

        // Try multiple APIs with fallback
        let lyricsData;
        let lastError;

        for (const api of LYRIC_APIS) {
            try {
                const apiUrl = api.url(song || searchQuery, artist);
                const res = await fetch(apiUrl, { timeout: 5000 });
                
                if (!res.ok) {
                    throw new Error(`API Error: ${res.status}`);
                }
                
                const json = await res.json();
                
                if (json.lyrics || (api.name === 'lyrics.ovh' && json.error !== 'No lyrics found')) {
                    lyricsData = {
                        title: song || searchQuery,
                        artist: artist || json.artist || 'Unknown',
                        lyrics: json.lyrics || json.data?.lyrics,
                        source: api.name
                    };
                    break;
                }
            } catch (apiError) {
                lastError = apiError;
                continue;
            }
        }

        if (!lyricsData) {
            throw lastError || new Error('No lyrics found from any API');
        }

        // Cache the result
        await writeFile(cachePath, JSON.stringify({
            timestamp: Date.now(),
            data: lyricsData
        }));

        await sendLyrics(sortedLyricsData(sock, chatId, message, lyricsData));

    } catch (error) {
        console.error('Lyrics command error:', error);
        
        const fallbackMessages = [
            "Couldn't find the lyrics, but here's a music fact: The longest officially released song is 'The Rise and Fall of Bossanova' by PC III at 13 hours!",
            "Lyrics not found. Did you know? The most expensive musical instrument ever sold was a Stradivarius violin for $15.9 million!",
            "No lyrics available. Fun fact: The world's shortest song is 'You Suffer' by Napalm Death at 1.316 seconds!"
        ];
        
        await sock.sendMessage(chatId, { 
            text: `❌ Couldn't find lyrics for "${query}".\n\n${fallbackMessages[Math.floor(Math.random() * fallbackMessages.length)]}`,
            mentions: []
        }, { quoted: message });
    }
}

async function sendLyrics(sock, chatId, message, { title, artist, lyrics, source }) {
    // Split long lyrics into multiple messages if needed
    const MAX_LENGTH = 4000;
    const lyricChunks = [];
    
    for (let i = 0; i < lyrics.length; i += MAX_LENGTH) {
        lyricChunks.push(lyrics.substring(i, i + MAX_LENGTH));
    }

    // Send header first
    await sock.sendMessage(chatId, {
        text: `🎵 *${title}* by *${artist}*\n\nSource: ${source}\n\n📜 *Lyrics (Part 1/${lyricChunks.length})*:`,
        mentions: []
    }, { quoted: message });

    // Send lyric chunks
    for (let i = 0; i < lyricChunks.length; i++) {
        await sock.sendMessage(chatId, {
            text: `${lyricChunks[i]}\n\n${i < lyricChunks.length - 1 ? `(Part ${i + 2}/${lyricChunks.length})` : '🎶 Enjoy the music!'}`,
            mentions: []
        });
    }
}

module.exports = {
    lyricsCommand
};