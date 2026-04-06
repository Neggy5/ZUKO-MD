/**
 * Pair Command - Generate WhatsApp pairing code
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

// Pairing API endpoint
const PAIRING_API = 'https://zuko-md-web-pair-production.up.railway.app';

export default {
    name: 'pair',
    description: 'Generate WhatsApp pairing code for bot connection',
    aliases: ['paircode', 'getpair', 'pairing'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Only owner can pair (for security)
        if (!isOwner) {
            await reply('❌ Only bot owner can use this command!');
            return;
        }
        
        const phoneNumber = args[0];
        
        if (!phoneNumber) {
            await buttons.sendButtons(from, {
                text: `🔐 *ＰＡＩＲ ＣＯＭＭＡＮＤ* 🔐\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃ ${prefix}pair <phone number>\n` +
                      `┃\n` +
                      `┃ *Example:*\n` +
                      `┃ ${prefix}pair 2348123456789\n` +
                      `┃\n` +
                      `┃ *Requirements:*\n` +
                      `┃ • Include country code\n` +
                      `┃ • No spaces or symbols\n` +
                      `┃ • Number must be active on WhatsApp\n` +
                      `┃\n` +
                      `┃ *How it works:*\n` +
                      `┃ 1️⃣ Send your number\n` +
                      `┃ 2️⃣ Bot generates pairing code\n` +
                      `┃ 3️⃣ Enter code on WhatsApp\n` +
                      `┃ 4️⃣ Bot connects automatically!\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'pair_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Validate phone number
        if (!phoneNumber.match(/^\d{10,15}$/)) {
            await reply('❌ Invalid phone number! Use format: 2348123456789 (country code + number, no spaces or symbols)');
            return;
        }
        
        await react('🔐');
        
        try {
            // Send request to pairing API
            const response = await axios.post(`${PAIRING_API}/api/pair`, {
                phoneNumber: phoneNumber
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'ZUKO-MD-Bot/1.0'
                },
                timeout: 30000
            });
            
            if (response.data && response.data.success) {
                const pairCode = response.data.code || response.data.pairCode;
                const expiry = response.data.expiry || '5 minutes';
                
                await buttons.sendButtons(from, {
                    text: `✅ *ＰＡＩＲ ＣＯＤＥ ＧＥＮＥＲＡＴＥＤ* ✅\n\n` +
                          `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                          `┃\n` +
                          `┃ 📱 *Number:* ${phoneNumber}\n` +
                          `┃ 🔑 *Pair Code:* *${pairCode}*\n` +
                          `┃ ⏱️ *Expires:* ${expiry}\n` +
                          `┃\n` +
                          `┃ *How to complete pairing:*\n` +
                          `┃ 1️⃣ Open WhatsApp on your phone\n` +
                          `┃ 2️⃣ Go to Settings → Linked Devices\n` +
                          `┃ 3️⃣ Tap "Link a Device"\n` +
                          `┃ 4️⃣ Enter this code: *${pairCode}*\n` +
                          `┃ 5️⃣ Bot will connect automatically!\n` +
                          `┃\n` +
                          `┃ *Note:* Code expires in ${expiry}\n` +
                          `┃\n` +
                          `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '🔄 GET NEW CODE', id: 'pair', type: 'reply' },
                        { text: '📖 HELP', id: 'pair_help', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                
                await react('✅');
                
            } else {
                throw new Error(response.data?.message || 'Failed to generate pair code');
            }
            
        } catch (error) {
            console.error('Pair error:', error);
            
            let errorMsg = error.response?.data?.message || error.message;
            
            await buttons.sendButtons(from, {
                text: `❌ *ＰＡＩＲ ＣＯＤＥ ＦＡＩＬＥＤ* ❌\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ Error: ${errorMsg}\n` +
                      `┃\n` +
                      `┃ *Possible reasons:*\n` +
                      `┃ • Invalid phone number\n` +
                      `┃ • Number not registered on WhatsApp\n` +
                      `┃ • API is down\n` +
                      `┃ • Network issue\n` +
                      `┃\n` +
                      `┃ *Try:*\n` +
                      `┃ • Use the pairing website directly:\n` +
                      `┃   ${PAIRING_API}\n` +
                      `┃ • Check your number format\n` +
                      `┃ • Try again later\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'pair', type: 'reply' },
                    { text: '🌐 OPEN WEBSITE', id: 'pair_website', type: 'reply' },
                    { text: '📖 HELP', id: 'pair_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            await react('❌');
        }
    },
    
    ownerOnly: true,
    groupOnly: false,
    adminOnly: false
};