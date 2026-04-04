/**
 * APK Download Command - Search and download APK from Aptoide
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Temporary storage for search results
const searchCache = new Map();

// Clear cache after 5 minutes
setInterval(() => {
    searchCache.clear();
}, 5 * 60 * 1000);

// Alternative APK download APIs
const APIS = {
    // Aptoide API (primary)
    aptoide: {
        search: async (query) => {
            try {
                // Try different Aptoide API endpoints
                const endpoints = [
                    `https://ws75.aptoide.com/api/7/apps/search?query=${encodeURIComponent(query)}&limit=10`,
                    `https://ws50.aptoide.com/api/7/apps/search?query=${encodeURIComponent(query)}&limit=10`,
                    `https://ws.aptoide.com/api/7/apps/search?query=${encodeURIComponent(query)}&limit=10`
                ];
                
                for (const url of endpoints) {
                    try {
                        const response = await axios.get(url, { timeout: 15000 });
                        const data = response.data;
                        
                        if (data?.datalist?.list?.length > 0) {
                            return data.datalist.list.map(v => ({
                                name: v.name,
                                size: v.size || 'Unknown',
                                version: v.file?.vername || 'Unknown',
                                id: v.package,
                                download: v.stats?.downloads || 'N/A',
                                icon: v.icon,
                                developer: v.store?.name || 'Unknown'
                            }));
                        }
                    } catch (e) {
                        continue;
                    }
                }
                return [];
            } catch (error) {
                console.error('Aptoide search error:', error.message);
                return [];
            }
        },
        
        download: async (packageId) => {
            try {
                const endpoints = [
                    `https://ws75.aptoide.com/api/7/apps/search?query=${encodeURIComponent(packageId)}&limit=1`,
                    `https://ws50.aptoide.com/api/7/apps/search?query=${encodeURIComponent(packageId)}&limit=1`
                ];
                
                for (const url of endpoints) {
                    try {
                        const response = await axios.get(url, { timeout: 15000 });
                        const app = response.data?.datalist?.list?.[0];
                        
                        if (app?.file?.path) {
                            return {
                                img: app.icon,
                                developer: app.store?.name || 'Unknown',
                                appname: app.name,
                                link: app.file.path,
                                size: app.size,
                                version: app.file?.vername
                            };
                        }
                    } catch (e) {
                        continue;
                    }
                }
                throw new Error('No download link found');
            } catch (error) {
                console.error('Aptoide download error:', error.message);
                throw error;
            }
        }
    },
    
    // Alternative: APKPure (fallback)
    apkpure: {
        search: async (query) => {
            try {
                const response = await axios.get(`https://apkpure.net/search?q=${encodeURIComponent(query)}`, {
                    timeout: 15000,
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                // Note: This needs HTML parsing - simplified for now
                return [];
            } catch (error) {
                return [];
            }
        }
    }
};

// Download file from URL
async function downloadFile(url) {
    const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 60000,
        maxContentLength: 100 * 1024 * 1024 // 100MB max
    });
    return Buffer.from(response.data);
}

export default {
    name: 'apk',
    description: 'Search and download APK from Aptoide',
    aliases: ['apkdl', 'downloadapk', 'getapk'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        const query = args.join(' ');
        
        // Check if user is selecting a number from search results
        const isNumber = !isNaN(query) && query.length <= 2 && searchCache.has(sender);
        
        if (isNumber) {
            // User is selecting an app to download
            const selectedIndex = parseInt(query) - 1;
            const searchData = searchCache.get(sender);
            
            if (!searchData || selectedIndex < 0 || selectedIndex >= searchData.results.length) {
                await reply('❌ Invalid selection. Please try searching again.');
                searchCache.delete(sender);
                return;
            }
            
            const selectedApp = searchData.results[selectedIndex];
            await react('⏳');
            
            try {
                // Get download info
                const downloadInfo = await APIS.aptoide.download(selectedApp.id);
                
                if (!downloadInfo || !downloadInfo.link) {
                    throw new Error('No download link found');
                }
                
                // Send loading message
                const loadingMsg = await reply(`📥 *Downloading ${downloadInfo.appname}...*\n⏳ Please wait, this may take a moment.`);
                
                // Download APK
                const apkBuffer = await downloadFile(downloadInfo.link);
                const fileSizeMB = (apkBuffer.length / (1024 * 1024)).toFixed(2);
                
                // Send APK file
                await sock.sendMessage(from, {
                    document: apkBuffer,
                    fileName: `${downloadInfo.appname.replace(/[^\w\s]/g, '')}.apk`,
                    mimetype: 'application/vnd.android.package-archive',
                    caption: `📱 *ＡＰＫ ＤＯＷＮＬＯＡＤ* 📱\n\n` +
                            `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                            `┃\n` +
                            `┃ 📱 *Name:* ${downloadInfo.appname}\n` +
                            `┃ 👤 *Developer:* ${downloadInfo.developer}\n` +
                            `┃ 📦 *Size:* ${fileSizeMB} MB\n` +
                            `┃ 📌 *Version:* ${downloadInfo.version || 'Unknown'}\n` +
                            `┃\n` +
                            `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                            `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
                }, { quoted: msg });
                
                // Clear cache
                searchCache.delete(sender);
                
                await buttons.sendButtons(from, {
                    text: `✅ *ＡＰＫ ＤＯＷＮＬＯＡＤ ＣＯＭＰＬＥＴＥ* ✅\n\n` +
                          `${downloadInfo.appname} has been sent above.`,
                    buttons: [
                        { text: '📥 SEARCH AGAIN', id: 'apk', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                
                await react('✅');
                
            } catch (error) {
                console.error('APK download error:', error);
                await reply(`❌ Failed to download APK. The app may not be available or the download link is invalid.`);
                await react('❌');
                searchCache.delete(sender);
            }
            
        } else {
            // Search for apps
            if (!query) {
                await buttons.sendButtons(from, {
                    text: `❌ *ＮＯ ＡＰＰ ＮＡＭＥ ＰＲＯＶＩＤＥＤ*\n\n` +
                          `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                          `┃\n` +
                          `┃ *Usage:*\n` +
                          `┃ ${prefix}apk <app name>\n` +
                          `┃\n` +
                          `┃ *Examples:*\n` +
                          `┃ ${prefix}apk whatsapp\n` +
                          `┃ ${prefix}apk telegram\n` +
                          `┃ ${prefix}apk spotify\n` +
                          `┃\n` +
                          `┃ *After search:*\n` +
                          `┃ Reply with number to download\n` +
                          `┃\n` +
                          `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '📖 HELP', id: 'apk_help', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                return;
            }
            
            await react('🔍');
            
            try {
                const results = await APIS.aptoide.search(query);
                
                if (!results || results.length === 0) {
                    await buttons.sendButtons(from, {
                        text: `❌ *ＮＯ ＲＥＳＵＬＴＳ ＦＯＵＮＤ*\n\n` +
                              `No apps found for "${query}".\n\n` +
                              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                        buttons: [
                            { text: '🔄 TRY AGAIN', id: 'apk', type: 'reply' },
                            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                        ]
                    }, msg);
                    await react('❌');
                    return;
                }
                
                // Store results in cache
                searchCache.set(sender, { results, timestamp: Date.now() });
                
                // Build results message
                let resultsText = `📱 *ＡＰＫ ＳＥＡＲＣＨ ＲＥＳＵＬＴＳ* 📱\n\n` +
                                 `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
                
                for (let i = 0; i < Math.min(results.length, 10); i++) {
                    const app = results[i];
                    resultsText += `┃ *${i + 1}.* ${app.name}\n`;
                    resultsText += `┃    📦 Size: ${app.size}\n`;
                    resultsText += `┃    📌 Version: ${app.version}\n`;
                    resultsText += `┃    📥 Downloads: ${app.download}\n┃\n`;
                }
                
                resultsText += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                              `*Reply with a number (1-${Math.min(results.length, 10)}) to download*\n` +
                              `Example: ${prefix}apk 2\n\n` +
                              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
                
                await buttons.sendButtons(from, {
                    text: resultsText,
                    buttons: [
                        { text: '🔄 NEW SEARCH', id: 'apk', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                
                await react('✅');
                
            } catch (error) {
                console.error('APK search error:', error);
                await reply(`❌ Failed to search for apps. Please try again later.`);
                await react('❌');
            }
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};