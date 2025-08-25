const fs = require('fs');
const { randomInt, randomBytes } = require('crypto');
const axios = require('axios'); // Added axios for sticker fetching

async function hackCommand(sock, chatId, message, target) {
    try {
        const mentionedJid = message?.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const isGroup = chatId.endsWith('@g.us');
        
        // Improved target detection
        let victim = target;
        if (!victim && mentionedJid.length > 0) {
            victim = mentionedJid[0];
        } else if (!victim) {
            // Check if message is a reply
            const quotedMsg = message?.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            if (quotedMsg) {
                victim = message.message.extendedTextMessage.contextInfo.participant;
            }
        }

        if (!victim) {
            return await sock.sendMessage(chatId, {
                text: '💻 *Hack Prank Command*\n\n' +
                      'Please mention a user, reply to a message, or specify a target!\n' +
                      'Examples:\n' +
                      '• `.hack @user`\n' +
                      '• `.hack +123456789`\n' +
                      '• Reply to a message with `.hack`',
                mentions: []
            }, { quoted: message });
        }

        // Extract number from JID if needed
        const victimNumber = victim.includes('@') ? victim.split('@')[0] : victim;
        
        // Generate realistic fake data
        const fakeIp = `${randomInt(1,255)}.${randomInt(0,255)}.${randomInt(0,255)}.${randomInt(1,255)}`;
        const fakeMac = randomBytes(6).toString('hex').match(/.{1,2}/g).join(':');
        const devices = ['iPhone 15 Pro', 'Samsung Galaxy S23', 'Windows 11 PC', 'MacBook Pro M2', 'Xiaomi Redmi Note 12'];
        const fakeDevice = devices[Math.floor(Math.random() * devices.length)];
        
        // Start the "hacking" process with better messages
        await sock.sendMessage(chatId, {
            text: `🕵️‍♂️ *Initiating advanced hack sequence on ${victimNumber}...*\n` +
                  `🔓 Bypassing firewall encryption (${randomInt(20,80)}% complete)...`,
            mentions: mentionedJid.length ? mentionedJid : undefined
        });

        await new Promise(resolve => setTimeout(resolve, 2500));

        // Mid-process update with more technical jargon
        await sock.sendMessage(chatId, {
            text: `🎯 *Target Acquired!*\n\n` +
                  `📱 Device: ${fakeDevice}\n` +
                  `🛡️ OS: ${['iOS 17', 'Android 13', 'Windows 11', 'macOS Ventura'][Math.floor(Math.random() * 4)]}\n` +
                  `🌐 IP: ${fakeIp}\n` +
                  `🔌 MAC: ${fakeMac}\n\n` +
                  `⚡ Exploiting vulnerabilities... ${randomInt(30,60)}%`,
            mentions: mentionedJid.length ? mentionedJid : undefined
        });

        await new Promise(resolve => setTimeout(resolve, 3500));

        // Generate more realistic fake findings
        const contacts = randomInt(5, 350);
        const photos = randomInt(10, 1200);
        const lastLogin = new Date(Date.now() - randomInt(10000, 86400000)).toLocaleString();
        const fakeEmails = [
            `${victimNumber.substring(0,4)}${randomInt(100,999)}@gmail.com`,
            `${victimNumber.substring(0,4)}${randomInt(100,999)}@yahoo.com`,
            `admin${randomInt(100,999)}@${['company.com','business.org','enterprise.net'][Math.floor(Math.random() * 3)]}`
        ];
        const fakeLocation = `${['New York','London','Tokyo','Paris','Dubai'][Math.floor(Math.random() * 5)]} (Approximate)`;
        
        // Final "results" with more details
        await sock.sendMessage(chatId, {
            text: `💾 *Hack Complete!* 🎉\n\n` +
                  `🎯 *Target:* ${victimNumber}\n` +
                  `📍 Location: ${fakeLocation}\n` +
                  `📞 Contacts: ${contacts}\n` +
                  `🖼️ Media: ${photos} photos | ${randomInt(5,120)} videos\n` +
                  `📧 Emails:\n- ${fakeEmails.join('\n- ')}\n` +
                  `🗝️ Password Hashes: ${randomInt(3,15)} found\n` +
                  `⏲️ Last Login: ${lastLogin}\n\n` +
                  `⚠️ *Disclaimer:* This is just a prank! No actual hacking occurred.\n` +
                  `🔒 Your data is safe (probably) 😉`,
            mentions: mentionedJid.length ? mentionedJid : undefined
        });

        // 60% chance to send a "virus" sticker with more options
        if (Math.random() > 0.4) {
            const virusStickers = [
                'https://media.giphy.com/media/jUwpNzg9IcyrK/giphy.gif',
                'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyY/giphy.gif',
                'https://media.giphy.com/media/LQDLxJfBkB6Vi/giphy.gif',
                'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
                'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif'
            ];
            const randomSticker = virusStickers[Math.floor(Math.random() * virusStickers.length)];
            
            try {
                const stickerResponse = await axios.get(randomSticker, { 
                    responseType: 'arraybuffer',
                    timeout: 5000 // Add timeout to prevent hanging
                });
                await sock.sendMessage(chatId, {
                    sticker: stickerResponse.data
                }, { 
                    quoted: message,
                    ephemeralExpiration: 24 * 60 * 60 // 24 hours
                });
            } catch (e) {
                console.log('Failed to send virus sticker:', e.message);
                // Fallback to text message
                await sock.sendMessage(chatId, {
                    text: '💀 VIRUS DETECTED! 💀\n\n' +
                          'Just kidding! 😜\n' +
                          '(Sticker failed to load)'
                });
            }
        }

    } catch (error) {
        console.error('Hack command error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Hack failed! The target\'s quantum firewall detected our activity! 🔥\n' +
                  'Try again later or target someone less secure 😏',
            mentions: []
        }, { quoted: message });
    }
}

module.exports = hackCommand;