// Updated movie.js with TMDB API and download options from davidcyriltech API
const axios = require('axios');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

async function movieCommand(sock, chatId, message, query) {
    try {
        if (!query) {
            return await sock.sendMessage(chatId, {
                text: '🎬 *Movie Search*\n\nPlease specify a movie name!\nExample: `.movie The Dark Knight`',
                mentions: []
            }, { quoted: message });
        }

        // Use TMDB API (requires free API key from https://www.themoviedb.org/)
        const apiKey = '78b951ac8c9a854d34b51bcdde50fab1'; // Replace with your actual key
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);
        const movies = response.data.results;

        if (!movies || movies.length === 0) {
            return await sock.sendMessage(chatId, {
                text: '❌ Movie not found! Try another title.',
                mentions: []
            }, { quoted: message });
        }

        const movie = movies[0]; // Get first result

        // Format movie information
        let movieInfo = `
🎥 *${movie.title}* (${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})
⭐ Rating: ${movie.vote_average || 'N/A'} (${movie.vote_count || '0'} votes)

📝 *Plot:* ${movie.overview ? movie.overview.substring(0, 200) + (movie.overview.length > 200 ? '...' : '') : 'Not available'}

🔗 *More Info:* https://www.themoviedb.org/movie/${movie.id}
        `.trim();

        // Create a sticker with movie poster (if available)
        let sticker;
        if (movie.poster_path) {
            const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            try {
                sticker = await createSticker(posterUrl, {
                    pack: 'Movie Info',
                    author: 'TMDB Search',
                    type: StickerTypes.FULL,
                    categories: ['🎬'],
                    quality: 70
                });
            } catch (e) {
                console.log('Failed to create sticker:', e);
            }
        }

        // Send the movie info first
        const messageOptions = {
            text: movieInfo,
            mentions: [],
            ...(movie.poster_path && !sticker && { image: { url: `https://image.tmdb.org/t/p/w500${movie.poster_path}` } }),
            ...(sticker && { sticker: sticker })
        };

        await sock.sendMessage(chatId, messageOptions, { quoted: message });

        // Then search and send download links separately
        try {
            const loadingMsg = await sock.sendMessage(chatId, {
                text: '🔍 Searching for download links...',
                mentions: []
            }, { quoted: message });

            const downloadLinks = await searchDownloadLinks(movie.title, movie.release_date ? movie.release_date.substring(0, 4) : '');

            if (downloadLinks && downloadLinks.length > 0) {
                let downloadText = `📥 *Download Options for ${movie.title}:*\n\n`;
                downloadLinks.forEach((link, index) => {
                    downloadText += `*${index + 1}. ${link.quality}*\n`;
                    downloadText += `🔗 ${link.url}\n\n`;
                });
                downloadText += `_Note: Links are from third-party sources_`;

                await sock.sendMessage(chatId, {
                    text: downloadText,
                    mentions: []
                }, { quoted: message });

                // Delete the loading message
                await sock.sendMessage(chatId, {
                    delete: loadingMsg.key
                });
            } else {
                await sock.sendMessage(chatId, {
                    text: '⚠️ No download links found for this movie',
                    mentions: []
                }, { quoted: message });
                await sock.sendMessage(chatId, {
                    delete: loadingMsg.key
                });
            }
        } catch (downloadError) {
            console.error('Download link error:', downloadError);
            await sock.sendMessage(chatId, {
                text: '⚠️ Failed to fetch download links',
                mentions: []
            }, { quoted: message });
        }

    } catch (error) {
        console.error('Movie Command Error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch movie info. Please try again later.',
            mentions: []
        }, { quoted: message });
    }
}

// Helper function to search for download links using davidcyriltech API
async function searchDownloadLinks(title, year) {
    try {
        const searchQuery = `${title} ${year}`.trim();
        const apiUrl = `https://apis.davidcyriltech.my.id/zoom/movie?url=${encodeURIComponent(searchQuery)}`;
        
        const response = await axios.get(apiUrl, {
            timeout: 10000 // 10 seconds timeout
        });

        if (!response.data || !response.data.result) {
            return [];
        }

        // Process the API response
        const results = response.data.result;
        const downloadLinks = [];

        // Extract download links from the response
        if (results.download_links && results.download_links.length > 0) {
            results.download_links.forEach(link => {
                downloadLinks.push({
                    quality: link.quality || 'Unknown',
                    url: link.url
                });
            });
        }

        // Also check for streaming links if available
        if (results.streaming_links && results.streaming_links.length > 0) {
            results.streaming_links.forEach(link => {
                downloadLinks.push({
                    quality: `Streaming (${link.quality || 'Unknown'})`,
                    url: link.url
                });
            });
        }

        return downloadLinks.slice(0, 5); // Return max 5 links to avoid message being too long

    } catch (error) {
        console.error('Error searching download links:', error);
        return [];
    }
}

module.exports = movieCommand;