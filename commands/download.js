/**
 * Download Commands - Instagram, Facebook, TikTok media downloader
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';

// API endpoints (with fallbacks)
const APIS = {
    instagram: [
        'https://api.nexoracle.com/download/instagram?url=',
        'https://api.siputzx.my.id/api/d/igdl?url=',
        'https://api.akuari.my.id/downloader/instagram?url='
    ],
    facebook: [
        'https://api.nexoracle.com/download/facebook?url=',
        'https://api.siputzx.my.id/api/d/fbdl?url=',
        'https://api.akuari.my.id/downloader/facebook?url='
    ],
    tiktok: [
        'https://api.nexoracle.com/download/tiktok?url=',
        'https://api.siputzx.my.id/api/d/tiktok?url=',
        'https://tikwm.com/api/?url='
    ]
};

// NexOracle API Key (free tier)
const NEX_APIKEY = 'd0634e61e8789b051e';

// Helper: Try multiple APIs
async function tryApis(url, type, reply) {
    const apiList = APIS[type];
    
    for (const api of apiList) {
        try {
            const fullUrl = api.includes('nexoracle') 
                ? `${api}${encodeURIComponent(url)}&apikey=${NEX_APIKEY}`
                : `${api}${encodeURIComponent(url)}`;
            
            const response = await axios.get(fullUrl, { timeout: 15000 });
            
            // Handle different response formats
            let downloadUrl = null;
            let title = null;
            let thumbnail = null;
            
            if (type === 'instagram') {
                if (response.data?.result?.download_url) {
                    downloadUrl = response.data.result.download_url;
                    title = response.data.title || 'Instagram Media';
                    thumbnail = response.data.thumbnail;
                } else if (response.data?.data?.url) {
                    downloadUrl = response.data.data.url;
                    title = response.data.data.title || 'Instagram Media';
                } else if (response.data?.url) {
                    downloadUrl = response.data.url;
                }
            } 
            else if (type === 'facebook') {
                if (response.data?.result?.download_url) {
                    downloadUrl = response.data.result.download_url;
                    title = response.data.title || 'Facebook Video';
                } else if (response.data?.data?.url) {
                    downloadUrl = response.data.data.url;
                    title = response.data.data.title || 'Facebook Video';
                } else if (response.data?.hd || response.data?.sd) {
                    downloadUrl = response.data.hd || response.data.sd;
                }
            }
            else if (type === 'tiktok') {
                if (response.data?.result?.download_url) {
                    downloadUrl = response.data.result.download_url;
                    title = response.data.title || 'TikTok Video';
                } else if (response.data?.data?.play) {
                    downloadUrl = response.data.data.play;
                    title = response.data.data.title || 'TikTok Video';
                } else if (response.data?.video) {
                    downloadUrl = response.data.video;
                }
            }
            
            if (downloadUrl) {
                return { downloadUrl, title, thumbnail };
            }
        } catch (err) {
            console.log(`${type} API failed:`, err.message);
            continue;
        }
    }
    return null;
}

// Instagram Downloader
export const instagram = {
    name: 'instagram',
    description: 'Download Instagram videos/reels',
    aliases: ['igdl', 'ig', 'insta'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        const url = args[0];
        
        if (!url) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＵＲＬ ＰＲＯＶＩＤＥＤ*\n\nUsage: ${prefix}instagram <instagram-url>`,
                buttons: [{ text: '🏠 MENU', id: 'menu_main', type: 'reply' }]
            }, msg);
            return;
        }
        
        if (!url.includes('instagram.com')) {
            await reply('❌ Invalid Instagram link!');
            return;
        }
        
        await react('⏳');
        
        try {
            const result = await tryApis(url, 'instagram', reply);
            
            if (!result) {
                throw new Error('Could not fetch media');
            }
            
            // Download the media
            const mediaResponse = await axios.get(result.downloadUrl, {
                responseType: 'arraybuffer',
                timeout: 30000
            });
            const mediaBuffer = Buffer.from(mediaResponse.data);
            
            // Determine if video or image
            const isVideo = mediaResponse.headers['content-type']?.includes('video') || 
                           result.downloadUrl.includes('.mp4');
            
            if (isVideo) {
                await sock.sendMessage(from, {
                    video: mediaBuffer,
                    caption: `📥 *ＩＮＳＴＡＧＲＡＭ ${result.title?.includes('Video') ? 'ＶＩＤＥＯ' : 'ＲＥＥＬ'}*\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
                }, { quoted: msg });
            } else {
                await sock.sendMessage(from, {
                    image: mediaBuffer,
                    caption: `📥 *ＩＮＳＴＡＧＲＡＭ ＩＭＡＧＥ*\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
                }, { quoted: msg });
            }
            
            await buttons.sendButtons(from, {
                text: `✅ *ＤＯＷＮＬＯＡＤ ＣＯＭＰＬＥＴＥ*`,
                buttons: [
                    { text: '📥 DOWNLOAD AGAIN', id: 'instagram', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('Instagram error:', error);
            await reply(`❌ Failed to download Instagram media. Please try another link or use a different command.`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};

// Facebook Downloader
export const facebook = {
    name: 'facebook',
    description: 'Download Facebook videos',
    aliases: ['fb', 'fbdl', 'fbvideo'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        const url = args[0];
        
        if (!url) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＵＲＬ ＰＲＯＶＩＤＥＤ*\n\nUsage: ${prefix}facebook <facebook-url>`,
                buttons: [{ text: '🏠 MENU', id: 'menu_main', type: 'reply' }]
            }, msg);
            return;
        }
        
        if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
            await reply('❌ Invalid Facebook link!');
            return;
        }
        
        await react('⏳');
        
        try {
            const result = await tryApis(url, 'facebook', reply);
            
            if (!result) {
                throw new Error('Could not fetch video');
            }
            
            const mediaResponse = await axios.get(result.downloadUrl, {
                responseType: 'arraybuffer',
                timeout: 60000
            });
            const mediaBuffer = Buffer.from(mediaResponse.data);
            
            await sock.sendMessage(from, {
                video: mediaBuffer,
                caption: `📥 *ＦＡＣＥＢＯＯＫ ＶＩＤＥＯ*\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
            }, { quoted: msg });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＤＯＷＮＬＯＡＤ ＣＯＭＰＬＥＴＥ*`,
                buttons: [
                    { text: '📥 DOWNLOAD AGAIN', id: 'facebook', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('Facebook error:', error);
            await reply(`❌ Failed to download Facebook video. Please try another link.`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};

// TikTok Downloader
export const tiktok = {
    name: 'tiktok',
    description: 'Download TikTok videos (no watermark)',
    aliases: ['tt', 'ttdl', 'tiktokdl'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        const url = args[0];
        const type = args[1]?.toLowerCase();
        
        if (!url) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＵＲＬ ＰＲＯＶＩＤＥＤ*\n\nUsage:\n• ${prefix}tiktok <url> - Video\n• ${prefix}tiktok <url> audio - Audio only`,
                buttons: [{ text: '🏠 MENU', id: 'menu_main', type: 'reply' }]
            }, msg);
            return;
        }
        
        if (!url.includes('tiktok.com')) {
            await reply('❌ Invalid TikTok link!');
            return;
        }
        
        await react('⏳');
        
        try {
            const isAudio = type === 'audio' || type === '--audio' || type === '-a';
            
            const result = await tryApis(url, 'tiktok', reply);
            
            if (!result) {
                throw new Error('Could not fetch media');
            }
            
            if (isAudio) {
                // Download audio
                const audioResponse = await axios.get(result.downloadUrl, {
                    responseType: 'arraybuffer',
                    timeout: 30000
                });
                const audioBuffer = Buffer.from(audioResponse.data);
                
                await sock.sendMessage(from, {
                    audio: audioBuffer,
                    mimetype: 'audio/mpeg',
                    ptt: false
                }, { quoted: msg });
                
                await reply(`🎵 *ＴＩＫＴＯＫ ＡＵＤＩＯ*\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`);
            } else {
                // Download video
                const mediaResponse = await axios.get(result.downloadUrl, {
                    responseType: 'arraybuffer',
                    timeout: 60000
                });
                const mediaBuffer = Buffer.from(mediaResponse.data);
                
                await sock.sendMessage(from, {
                    video: mediaBuffer,
                    caption: `📥 *ＴＩＫＴＯＫ ＶＩＤＥＯ*\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
                }, { quoted: msg });
            }
            
            await buttons.sendButtons(from, {
                text: `✅ *ＤＯＷＮＬＯＡＤ ＣＯＭＰＬＥＴＥ*`,
                buttons: [
                    { text: '📥 VIDEO', id: 'tiktok', type: 'reply' },
                    { text: '🎵 AUDIO', id: 'tiktok_audio', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('TikTok error:', error);
            await reply(`❌ Failed to download TikTok media. Please try another link.`);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};

// Export all commands
export default { instagram, facebook, tiktok };