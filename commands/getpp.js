/**
 * Get Profile Picture Command - Get user/group profile picture
 * Works in both group and private chats
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';

// Simple normalize function
const normalizeJid = (jid) => {
    if (!jid) return null;
    if (typeof jid !== 'string') return null;
    let number = jid.split('@')[0];
    number = number.split(':')[0];
    return number;
};

export default {
    name: 'getpp',
    description: 'Get profile picture of a user or group',
    aliases: ['getprofile', 'pp', 'avatar', 'getavatar'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        await react('📸');
        
        let targetJid = null;
        let targetName = '';
        let isGroupPp = false;
        
        // Parse target based on where command is used
        if (args[0] && args[0].startsWith('@')) {
            // Mentioned user - works in both group and private
            const mentioned = args[0].replace('@', '');
            targetJid = `${mentioned}@s.whatsapp.net`;
            targetName = `@${mentioned}`;
            
        } else if (args[0] === 'group' || args[0] === 'gc') {
            // Get group profile picture
            if (!isGroup) {
                await reply('❌ You can only get group PP from within a group!');
                return;
            }
            targetJid = from;
            targetName = 'this group';
            isGroupPp = true;
            
        } else if (args[0] && args[0].match(/^\d+$/)) {
            // Phone number provided
            targetJid = `${args[0]}@s.whatsapp.net`;
            targetName = `@${args[0]}`;
            
        } else if (args[0] === 'me' || !args[0]) {
            // Get sender's own profile picture
            targetJid = sender;
            targetName = 'your';
            
        } else if (isGroup && args[0]) {
            // Try to find user by name in group
            if (args[0].includes('@')) {
                targetJid = args[0];
                targetName = args[0].split('@')[0];
            } else {
                targetJid = `${args[0]}@s.whatsapp.net`;
                targetName = `@${args[0]}`;
            }
        } else {
            // Invalid format - show help
            await buttons.sendButtons(from, {
                text: `📸 *ＧＥＴ ＰＲＯＦＩＬＥ ＰＩＣＴＵＲＥ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Usage:*\n` +
                      `┃ • ${prefix}getpp - Your profile picture\n` +
                      `┃ • ${prefix}getpp @user - User's PP\n` +
                      `┃ • ${prefix}getpp group - Group icon\n` +
                      `┃ • ${prefix}getpp 1234567890 - By number\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📸 MY PP', id: 'getpp', type: 'reply' },
                    { text: '👥 GROUP PP', id: isGroup ? 'getpp_group' : 'getpp', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        if (!targetJid) {
            await reply('❌ Invalid target!');
            await react('❌');
            return;
        }
        
        try {
            let ppUrl = null;
            let ppBuffer = null;
            
            // Try to get profile picture URL
            try {
                // Method 1: Using profilePictureUrl
                ppUrl = await sock.profilePictureUrl(targetJid, 'image');
            } catch (err1) {
                console.log('Method 1 failed:', err1.message);
                
                // Method 2: Try with different format
                try {
                    ppUrl = await sock.profilePictureUrl(targetJid);
                } catch (err2) {
                    console.log('Method 2 failed:', err2.message);
                    
                    // Method 3: Try with @s.whatsapp.net format
                    const formattedJid = targetJid.includes('@') ? targetJid : `${targetJid}@s.whatsapp.net`;
                    try {
                        ppUrl = await sock.profilePictureUrl(formattedJid, 'image');
                    } catch (err3) {
                        console.log('Method 3 failed:', err3.message);
                        throw new Error('No profile picture found');
                    }
                }
            }
            
            if (!ppUrl) {
                throw new Error('No profile picture URL');
            }
            
            // Download the image
            const response = await axios.get(ppUrl, { 
                responseType: 'arraybuffer',
                timeout: 15000
            });
            ppBuffer = Buffer.from(response.data);
            
            if (!ppBuffer || ppBuffer.length < 100) {
                throw new Error('Downloaded image is too small');
            }
            
            const fileSizeKB = (ppBuffer.length / 1024).toFixed(2);
            
            // Send the profile picture
            const caption = isGroupPp
                ? `🖼️ *ＧＲＯＵＰ ＩＣＯＮ*\n\n📛 *Group:* ${targetName}\n📏 *Size:* ${fileSizeKB} KB`
                : `🖼️ *ＰＲＯＦＩＬＥ ＰＩＣＴＵＲＥ*\n\n👤 *User:* ${targetName}\n📏 *Size:* ${fileSizeKB} KB`;
            
            await sock.sendMessage(from, {
                image: ppBuffer,
                caption: caption
            }, { quoted: msg });
            
            await buttons.sendButtons(from, {
                text: `✅ *ＰＲＯＦＩＬＥ ＰＩＣＴＵＲＥ ＳＥＮＴ* ✅`,
                buttons: [
                    { text: '📸 GET ANOTHER', id: 'getpp', type: 'reply' },
                    { text: '🔄 SET NEW PP', id: 'setpp', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('GetPP Error:', error);
            
            let errorMsg = 'No profile picture found';
            if (error.message.includes('404')) {
                errorMsg = 'No profile picture set for this user/group';
            } else if (error.message.includes('401')) {
                errorMsg = 'Cannot access profile picture (privacy settings)';
            }
            
            await buttons.sendButtons(from, {
                text: `❌ *ＦＡＩＬＥＤ ＴＯ ＧＥＴ ＰＲＯＦＩＬＥ ＰＩＣＴＵＲＥ*\n\n` +
                      `Error: ${errorMsg}\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'getpp', type: 'reply' },
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