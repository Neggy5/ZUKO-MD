/**
 * SSWeb Command - Take screenshot of any webpage
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';

/**
 * Take screenshot of a webpage
 * @param {string} url - Website URL
 * @param {Object} options - Screenshot options
 * @returns {Promise<string>} - Screenshot image URL
 */
async function takeScreenshot(url, options = {}) {
    const {
        width = 1280,
        height = 720,
        full_page = false,
        device_scale = 1
    } = options;

    try {
        if (!url.startsWith('http')) throw new Error('Invalid URL. Please include http:// or https://');
        if (isNaN(width) || isNaN(height) || isNaN(device_scale)) {
            throw new Error('Width, height, and scale must be numbers');
        }
        if (typeof full_page !== 'boolean') throw new Error('Full page must be a boolean');

        // Try multiple screenshot APIs with fallbacks
        const apis = [
            // Primary: Imagy API
            async () => {
                const response = await axios.post(
                    'https://gcp.imagy.app/screenshot/createscreenshot',
                    {
                        url: url,
                        browserWidth: parseInt(width),
                        browserHeight: parseInt(height),
                        fullPage: full_page,
                        deviceScaleFactor: parseInt(device_scale),
                        format: 'png',
                    },
                    {
                        headers: {
                            'content-type': 'application/json',
                            'referer': 'https://imagy.app/full-page-screenshot-taker/',
                            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36',
                        },
                        timeout: 30000
                    }
                );
                return response.data.fileUrl;
            },
            
            // Fallback 1: ScreenshotAPI
            async () => {
                const response = await axios.get(`https://shot.screenshotapi.net/screenshot?url=${encodeURIComponent(url)}&width=${width}&height=${height}&full_page=${full_page}`, {
                    timeout: 30000
                });
                return response.data.screenshot;
            },
            
            // Fallback 2: MiniScreenshot
            async () => {
                const response = await axios.get(`https://miniscreenshot.com/api/v1/screenshot?url=${encodeURIComponent(url)}&width=${width}&height=${height}`, {
                    timeout: 30000
                });
                return response.data.url;
            },
            
            // Fallback 3: PagePeeker
            async () => {
                return `https://pagepeeker.com/screenshot?url=${encodeURIComponent(url)}&width=${width}&height=${height}`;
            }
        ];

        for (const api of apis) {
            try {
                const result = await api();
                if (result) return result;
            } catch (err) {
                console.log(`Screenshot API failed:`, err.message);
                continue;
            }
        }

        throw new Error('All screenshot APIs failed');
    } catch (error) {
        throw new Error(error.message);
    }
}

export default {
    name: 'ssweb',
    description: 'Take a screenshot of any webpage',
    aliases: ['screenshot', 'webss', 'ss', 'capture'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        const url = args[0];
        
        if (!url) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＵＲＬ ＰＲＯＶＩＤＥＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Usage:*\n` +
                      `┃ ${prefix}ssweb <url>\n` +
                      `┃ ${prefix}screenshot <url>\n` +
                      `┃\n` +
                      `┃ *Options:*\n` +
                      `┃ --full - Full page screenshot\n` +
                      `┃ --mobile - Mobile view\n` +
                      `┃ --width=1280 - Custom width\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃ ${prefix}ssweb https://google.com\n` +
                      `┃ ${prefix}ssweb https://github.com --full\n` +
                      `┃ ${prefix}screenshot https://youtube.com --mobile\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'ssweb_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Parse options
        let targetUrl = url;
        let options = {
            width: 1280,
            height: 720,
            full_page: false,
            device_scale: 1
        };
        
        // Check for flags in args
        if (args.includes('--full') || args.includes('-f')) {
            options.full_page = true;
        }
        
        if (args.includes('--mobile') || args.includes('-m')) {
            options.width = 375;
            options.height = 667;
            options.device_scale = 2;
        }
        
        // Check for custom width
        const widthArg = args.find(a => a.startsWith('--width='));
        if (widthArg) {
            options.width = parseInt(widthArg.split('=')[1]) || 1280;
        }
        
        // Check for custom height
        const heightArg = args.find(a => a.startsWith('--height='));
        if (heightArg) {
            options.height = parseInt(heightArg.split('=')[1]) || 720;
        }
        
        // Validate URL
        if (!targetUrl.startsWith('http')) {
            targetUrl = 'https://' + targetUrl;
        }
        
        await react('📸');
        
        try {
            await reply(`⏳ *Taking screenshot of ${targetUrl}...*\nPlease wait.`);
            
            const screenshotUrl = await takeScreenshot(targetUrl, options);
            
            if (!screenshotUrl) {
                throw new Error('Failed to capture screenshot');
            }
            
            // Download the screenshot
            const imageResponse = await axios.get(screenshotUrl, {
                responseType: 'arraybuffer',
                timeout: 30000
            });
            const imageBuffer = Buffer.from(imageResponse.data);
            
            const viewMode = options.full_page ? 'Full Page' : (options.width === 375 ? 'Mobile View' : 'Desktop View');
            const dimensions = `${options.width}x${options.height}`;
            
            await sock.sendMessage(from, {
                image: imageBuffer,
                caption: `📸 *ＷＥＢＳＩＴＥ ＳＣＲＥＥＮＳＨＯＴ* 📸\n\n` +
                        `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                        `┃\n` +
                        `┃ 🔗 *URL:* ${targetUrl.substring(0, 50)}${targetUrl.length > 50 ? '...' : ''}\n` +
                        `┃ 📐 *Mode:* ${viewMode}\n` +
                        `┃ 📏 *Dimensions:* ${dimensions}\n` +
                        `┃ 📦 *Size:* ${(imageBuffer.length / 1024).toFixed(2)} KB\n` +
                        `┃\n` +
                        `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                        `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
            }, { quoted: msg });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＳＣＲＥＥＮＳＨＯＴ ＣＯＭＰＬＥＴＥ* ✅\n\n` +
                      `Screenshot of ${targetUrl} has been sent above.`,
                buttons: [
                    { text: '📸 AGAIN', id: 'ssweb', type: 'reply' },
                    { text: '🖥️ DESKTOP', id: 'ssweb_desktop', type: 'reply' },
                    { text: '📱 MOBILE', id: 'ssweb_mobile', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('SSWeb error:', error);
            
            await buttons.sendButtons(from, {
                text: `❌ *ＳＣＲＥＥＮＳＨＯＴ ＦＡＩＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Error: ${error.message}\n` +
                      `┃\n` +
                      `┃ *Possible reasons:*\n` +
                      `┃ • Website blocked screenshots\n` +
                      `┃ • Invalid URL\n` +
                      `┃ • Website is down\n` +
                      `┃ • Network timeout\n` +
                      `┃\n` +
                      `┃ *Try:*\n` +
                      `┃ • Use full URL with https://\n` +
                      `┃ • Try a different website\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'ssweb', type: 'reply' },
                    { text: '📖 HELP', id: 'ssweb_help', type: 'reply' },
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