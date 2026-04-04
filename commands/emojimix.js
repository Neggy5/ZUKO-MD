/**
 * EmojiMix Command - Combine two emojis into a sticker
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Temporary directory for processing
const TEMP_DIR = path.join(__dirname, '../temp');
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

/**
 * Fetch Emoji Mix image from API
 * @param {string} emoji1 - First emoji
 * @param {string} emoji2 - Second emoji
 * @returns {Promise<string>} - The image URL
 */
async function fetchEmix(emoji1, emoji2) {
    try {
        if (!emoji1 || !emoji2) {
            throw new Error('Invalid emoji input. Please provide two emojis.');
        }

        // Try multiple API endpoints
        const apis = [
            `https://levanter.onrender.com/emix?q=${encodeURIComponent(emoji1)},${encodeURIComponent(emoji2)}`,
            `https://emojimix.koyeb.app/api/v1/${encodeURIComponent(emoji1)}/${encodeURIComponent(emoji2)}`,
            `https://www.gstatic.com/android/keyboard/emojikitchen/${getEmojiCode(emoji1)}/${getEmojiCode(emoji1)}_${getEmojiCode(emoji2)}.png`
        ];

        for (const apiUrl of apis) {
            try {
                const response = await axios.get(apiUrl, { timeout: 10000 });
                
                if (apiUrl.includes('levanter')) {
                    if (response.data && response.data.result) {
                        return response.data.result;
                    }
                } else if (apiUrl.includes('koyeb')) {
                    if (response.data && response.data.url) {
                        return response.data.url;
                    }
                } else if (apiUrl.includes('gstatic')) {
                    // Emoji Kitchen returns image directly
                    if (response.data && response.data.length > 1000) {
                        return apiUrl;
                    }
                }
            } catch (err) {
                console.log(`API failed: ${apiUrl}`, err.message);
                continue;
            }
        }
        
        throw new Error('No valid image found from any API');
    } catch (error) {
        console.error('Error fetching emoji mix:', error.message);
        throw new Error('Failed to fetch emoji mix.');
    }
}

/**
 * Get emoji code for Emoji Kitchen URL
 */
function getEmojiCode(emoji) {
    const emojiCodes = {
        '😂': '1f602', '😭': '1f62d', '😍': '1f60d', '😘': '1f618',
        '🥲': '1f972', '❤️': '2764', '🔥': '1f525', '💔': '1f494',
        '✨': '2728', '💕': '1f495', '🐱': '1f431', '💀': '1f480',
        '🐶': '1f436', '🐭': '1f42d', '🐹': '1f439', '👻': '1f47b',
        '🎃': '1f383', '👍': '1f44d', '👎': '1f44e', '👏': '1f44f',
        '🙌': '1f64c', '🤝': '1f91d', '😎': '1f60e', '🥺': '1f97a',
        '😊': '1f60a', '😒': '1f612', '😔': '1f614', '😏': '1f60f'
    };
    return emojiCodes[emoji] || emoji.codePointAt(0).toString(16);
}

/**
 * Get buffer from URL
 */
async function getBuffer(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer', timeout: 30000 });
    return Buffer.from(response.data);
}

export default {
    name: 'emojimix',
    description: 'Combine two emojis into a sticker',
    aliases: ['emix', 'mixemoji', 'emojimix'],
    
    async execute(sock, msg, args, context) {
        const { from, react, reply, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        await react('😃');
        
        // Join args and check for comma separator
        let query = args.join(' ');
        
        if (!query) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＥＭＯＪＩＳ ＰＲＯＶＩＤＥＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Usage:*\n` +
                      `┃ ${prefix}emojimix 😂,🙂\n` +
                      `┃ ${prefix}emojimix 😂 🙂\n` +
                      `┃ ${prefix}emojimix 😂🙂\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃ ${prefix}emojimix 😂,🥲\n` +
                      `┃ ${prefix}emojimix ❤️,🔥\n` +
                      `┃ ${prefix}emojimix 🐱,💀\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🎲 RANDOM', id: 'emojimix_random', type: 'reply' },
                    { text: '📖 EXAMPLES', id: 'emojimix_examples', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        let emoji1, emoji2;
        
        // Parse emojis (handle comma, space, or no separator)
        if (query.includes(',')) {
            [emoji1, emoji2] = query.split(',').map(e => e.trim());
        } else if (query.includes(' ')) {
            const parts = query.split(' ');
            emoji1 = parts[0];
            emoji2 = parts[1];
        } else if (query.length >= 2) {
            // Try to split by emoji characters
            const emojis = [...query];
            if (emojis.length >= 2) {
                emoji1 = emojis[0];
                emoji2 = emojis[1];
            }
        }
        
        // Check for random
        if (emoji1 === 'random' || !emoji1) {
            const randomEmojis = ['😂', '😭', '😍', '🔥', '❤️', '💀', '🐱', '🥲', '😘', '✨'];
            emoji1 = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
            emoji2 = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
        }
        
        if (!emoji1 || !emoji2) {
            await reply(`❌ Please provide two emojis separated by a comma or space.\n\nExample: ${prefix}emojimix 😂,🙂`);
            await react('❌');
            return;
        }
        
        // Check if same emoji
        if (emoji1 === emoji2) {
            await buttons.sendButtons(from, {
                text: `❌ *ＳＡＭＥ ＥＭＯＪＩ*\n\n` +
                      `Cannot mix ${emoji1} with itself!\n\n` +
                      `Try different emojis like:\n` +
                      `• ${prefix}emojimix 😂,🥲\n` +
                      `• ${prefix}emojimix ❤️,🔥\n` +
                      `• ${prefix}emojimix 🐱,💀\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🎲 RANDOM', id: 'emojimix_random', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            await react('❌');
            return;
        }
        
        await react('⏳');
        
        try {
            // Fetch emoji mix image URL
            const imageUrl = await fetchEmix(emoji1, emoji2);
            
            if (!imageUrl) {
                throw new Error('Could not generate emoji mix');
            }
            
            // Get image buffer
            let imageBuffer;
            if (imageUrl.startsWith('http')) {
                imageBuffer = await getBuffer(imageUrl);
            } else {
                imageBuffer = Buffer.from(imageUrl);
            }
            
            if (!imageBuffer || imageBuffer.length < 100) {
                throw new Error('Invalid image data');
            }
            
            // Create sticker
            const sticker = new Sticker(imageBuffer, {
                pack: 'ZUKO MD',
                author: 'Emoji Mix',
                type: StickerTypes.FULL,
                categories: ['🎨', '✨'],
                quality: 80,
                background: 'transparent'
            });
            
            const stickerBuffer = await sticker.toBuffer();
            
            // Send sticker
            await sock.sendMessage(from, {
                sticker: stickerBuffer
            }, { quoted: msg });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＥＭＯＪＩ ＭＩＸ ＣＯＭＰＬＥＴＥ* ✅\n\n` +
                      `🎨 ${emoji1} + ${emoji2} = ${emoji1}${emoji2}\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🎲 NEW MIX', id: 'emojimix', type: 'reply' },
                    { text: '🔄 SWAP', id: `emojimix_swap_${emoji2}_${emoji1}`, type: 'reply' },
                    { text: '🎲 RANDOM', id: 'emojimix_random', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('EmojiMix error:', error);
            
            await buttons.sendButtons(from, {
                text: `❌ *ＥＭＯＪＩ ＭＩＸ ＦＡＩＬＥＤ* ❌\n\n` +
                      `Could not mix ${emoji1} + ${emoji2}\n\n` +
                      `*Try these combinations:*\n` +
                      `• ${prefix}emojimix 😂 🥲\n` +
                      `• ${prefix}emojimix ❤️ 🔥\n` +
                      `• ${prefix}emojimix 🐱 💀\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🎲 RANDOM', id: 'emojimix_random', type: 'reply' },
                    { text: '📖 EXAMPLES', id: 'emojimix_examples', type: 'reply' },
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