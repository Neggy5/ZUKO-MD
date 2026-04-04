/**
 * ZUKO MD Bot - Main Entry Point
 */
process.env.PUPPETEER_SKIP_DOWNLOAD = 'true';
process.env.PUPPETEER_SKIP_CHROMIUM_DOWNLOAD = 'true';
process.env.PUPPETEER_CACHE_DIR = process.env.PUPPETEER_CACHE_DIR || '/tmp/puppeteer_cache_disabled';

const { 
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    Browsers,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    downloadMediaMessage
} = require('@whiskeysockets/baileys');

const pino = require('pino');
const fs = require('fs');
const path = require('path');
const qrcode = require('qrcode-terminal');
const config = require('./config');
const handler = require('./handler');

// Newsletter JID
const NEWSLETTER_JID = '0029VbCUOf389inrrurd6n1z@newsletter';

// Track users who already received connection message
const welcomeSentUsers = new Set();

// Bot name
const BOT_NAME = 'ZUKO-MD';

// Suppress console logs for sensitive data
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const forbiddenPatterns = [
    'closing session', 'prekey bundle', 'registrationid',
    'chainkey', 'ratchet', 'ephemeralkeypair', 'basekey'
];

console.log = (...args) => {
    const msg = args.join(' ').toLowerCase();
    if (!forbiddenPatterns.some(p => msg.includes(p))) {
        originalConsoleLog(...args);
    }
};

console.error = (...args) => {
    const msg = args.join(' ').toLowerCase();
    if (!forbiddenPatterns.some(p => msg.includes(p))) {
        originalConsoleError(...args);
    }
};

// Session folder
const SESSION_FOLDER = './session';

// Create session folder if not exists
if (!fs.existsSync(SESSION_FOLDER)) {
    fs.mkdirSync(SESSION_FOLDER, { recursive: true });
}

// Function to send button message
async function sendButtonMessage(sock, to) {
    try {
        // Method 1: Using template message with buttons (if supported)
        const buttonMessage = {
            text: `╭━━━〔 *${BOT_NAME}* 〕━━━┈
┃
┃ 👋 *Hello! Welcome to ${BOT_NAME}*
┃ 
┃ ✅ *Connected Successfully!*
┃
┃ 📢 *Join Official Newsletter*
┃ Get latest updates, new features,
┃ and bot announcements!
┃
┃ 📌 *Newsletter JID:*
┃ \`${NEWSLETTER_JID}\`
┃
╰━━━━━━━━━━━━━━━━━━━━━━━

> *Powered by ${BOT_NAME}*`,
            footer: 'Select an option below:',
            buttons: [
                { buttonId: 'join_newsletter', buttonText: { displayText: '📢 Join Newsletter' }, type: 1 },
                { buttonId: 'show_menu', buttonText: { displayText: '📋 View Menu' }, type: 1 },
                { buttonId: 'support', buttonText: { displayText: '💬 Support' }, type: 1 }
            ],
            viewOnce: true,
            headerType: 1
        };
        
        await sock.sendMessage(to, buttonMessage);
        
        // Method 2: Send interactive buttons (more modern)
        const interactiveMessage = {
            text: `╭━━━〔 *${BOT_NAME}* 〕━━━┈
┃
┃ 👋 *Welcome!* I'm ${BOT_NAME}
┃ Your WhatsApp assistant
┃
┃ ✅ *Connected Successfully!*
┃
┃ 📌 *Newsletter:* ${NEWSLETTER_JID}
┃
┃ 💡 *Quick Actions:*
┃
╰━━━━━━━━━━━━━━━━━━━━━━━`,
            footer: `${BOT_NAME} - WhatsApp Bot`,
            interactiveButtons: [
                {
                    name: 'cta_url',
                    buttonParamsJson: JSON.stringify({
                        display_text: '📢 Join Newsletter',
                        url: `https://wa.me/${NEWSLETTER_JID}`,
                        merchant_url: `https://wa.me/${NEWSLETTER_JID}`
                    })
                },
                {
                    name: 'cta_copy',
                    buttonParamsJson: JSON.stringify({
                        display_text: '📋 Copy Newsletter JID',
                        copy_code: NEWSLETTER_JID
                    })
                },
                {
                    name: 'quick_reply',
                    buttonParamsJson: JSON.stringify({
                        display_text: '📋 View Menu',
                        id: '.menu'
                    })
                }
            ]
        };
        
        // Send as interactive message
        await sock.sendMessage(to, {
            text: interactiveMessage.text,
            contextInfo: {
                forwardingScore: 0,
                isForwarded: false,
                externalAdReply: {
                    title: BOT_NAME,
                    body: 'Click buttons below to get started!',
                    mediaType: 1,
                    thumbnailUrl: 'https://via.placeholder.com/300x100?text=ZUKO-MD',
                    sourceUrl: `https://wa.me/${NEWSLETTER_JID}`
                }
            }
        });
        
        // Send actual interactive buttons using template
        await sock.sendMessage(to, {
            text: `📢 *${BOT_NAME} - Quick Actions*`,
            templateButtons: [
                { index: 1, urlButton: { displayText: '📢 Join Newsletter', url: `https://wa.me/${NEWSLETTER_JID}` } },
                { index: 2, callButton: { displayText: '📋 Copy JID', phoneNumber: NEWSLETTER_JID.split('@')[0] } },
                { index: 3, quickReplyButton: { displayText: '📋 View Menu', id: '.menu' } }
            ]
        });
        
    } catch (error) {
        console.error('Error sending button message:', error);
        // Fallback to simple text message
        await sock.sendMessage(to, { 
            text: `╭━━━〔 *${BOT_NAME}* 〕━━━┈
┃
┃ 👋 *Welcome!*
┃ 
┃ ✅ Connected Successfully!
┃
┃ 📢 *Join Newsletter:*
┃ ${NEWSLETTER_JID}
┃
┃ 💡 *Commands:*
┃ Type .menu to see all commands
┃
╰━━━━━━━━━━━━━━━━━━━━━━━

> *Powered by ${BOT_NAME}*` 
        });
    }
}

async function startBot() {
    console.log(`🚀 Starting ${BOT_NAME} Bot...\n`);
    
    // Use multi-file auth state
    const { state, saveCreds } = await useMultiFileAuthState(SESSION_FOLDER);
    
    // Get latest version
    const { version } = await fetchLatestBaileysVersion();
    
    // Create socket connection
    const sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        browser: Browsers.ubuntu('Chrome'),
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" })),
        },
        syncFullHistory: false,
        markOnlineOnConnect: false,
        generateHighQualityLinkPreview: true,
        defaultQueryTimeoutMs: undefined,
        keepAliveIntervalMs: 30000,
        retryRequestDelayMs: 5000,
        maxRetries: 3,
        connectTimeoutMs: 60000
    });

    // Handle credentials update
    sock.ev.on('creds.update', saveCreds);

    // Connection update handler
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('📱 Scan this QR code with WhatsApp:\n');
            qrcode.generate(qr, { small: true });
            console.log('\n');
        }
        
        if (connection === 'close') {
            const statusCode = lastDisconnect?.error?.output?.statusCode;
            const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
            
            if (statusCode === 515 || statusCode === 503 || statusCode === 408) {
                console.log(`⚠️ Connection closed (${statusCode}). Reconnecting...`);
            } else {
                console.log('❌ Connection closed:', lastDisconnect?.error);
            }
            
            if (shouldReconnect) {
                console.log('🔄 Reconnecting in 5 seconds...\n');
                setTimeout(startBot, 5000);
            } else {
                console.log('🔒 Logged out. Please delete session folder and restart.');
            }
        } else if (connection === 'open') {
            console.log('\n✅ Bot Connected Successfully!');
            console.log(`📱 Bot Number: ${sock.user.id.split(':')[0]}`);
            console.log(`🤖 Bot Name: ${BOT_NAME}`);
            console.log(`⚡ Prefix: ${config.prefix}`);
            console.log('💬 Bot is ready to receive messages!\n');
            
            // Set bot status if enabled
            if (config.autoBio) {
                await sock.updateProfileStatus(`${BOT_NAME} | Active 24/7`);
            }
            
            // Initialize anti-call feature
            if (config.defaultGroupSettings.anticall && handler.initializeAntiCall) {
                handler.initializeAntiCall(sock);
            }
        }
    });

    // Message deduplication
    const processedMessages = new Set();
    setInterval(() => processedMessages.clear(), 5 * 60 * 1000);
    
    // System JID filter
    const isSystemJid = (jid) => {
        if (!jid) return true;
        return jid.includes('@broadcast') || 
               jid.includes('status.broadcast') || 
               jid.includes('@newsletter');
    };

    // Message handler - delegates to external handler.js
    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return;
        
        for (const msg of messages) {
            if (!msg.message || !msg.key?.id) continue;
            
            const from = msg.key.remoteJid;
            if (!from || isSystemJid(from)) continue;
            
            // Deduplication
            const msgId = msg.key.id;
            if (processedMessages.has(msgId)) continue;
            
            // Check message age (ignore old messages)
            if (msg.messageTimestamp) {
                const messageAge = Date.now() - (msg.messageTimestamp * 1000);
                if (messageAge > 300000) continue; // 5 minutes
            }
            
            processedMessages.add(msgId);
            
            // ========== CONNECTION MESSAGE WITH BUTTONS ==========
            // Send welcome message when a user first messages the bot (private chat only)
            if (!from.endsWith('@g.us') && !from.includes('@broadcast') && !from.includes('@newsletter')) {
                const userId = from.split('@')[0];
                
                if (!welcomeSentUsers.has(userId)) {
                    welcomeSentUsers.add(userId);
                    
                    try {
                        // Send simple welcome text
                        await sock.sendMessage(from, { 
                            text: `╭━━━〔 *${BOT_NAME}* 〕━━━┈
┃
┃ 👋 *Hello!* I'm ${BOT_NAME}
┃ 
┃ ✅ *Connected Successfully!*
┃
┃ 📢 *Join my Official Newsletter*
┃ Stay updated with new features!
┃
┃ 📌 *Newsletter:* ${NEWSLETTER_JID}
┃
╰━━━━━━━━━━━━━━━━━━━━━━━

> *Powered by ${BOT_NAME}*` 
                        });
                        
                        // Send interactive buttons
                        await sock.sendMessage(from, {
                            text: `📢 *${BOT_NAME} - Quick Actions*`,
                            buttons: [
                                { buttonId: 'join_newsletter', buttonText: { displayText: '📢 Join Newsletter' }, type: 1 },
                                { buttonId: '.menu', buttonText: { displayText: '📋 View Menu' }, type: 1 },
                                { buttonId: 'copy_jid', buttonText: { displayText: '📋 Copy JID' }, type: 1 }
                            ],
                            headerType: 1,
                            footer: `Tap a button to get started!`
                        });
                        
                        // Send the newsletter JID as a contact/share button
                        await sock.sendMessage(from, {
                            text: `🔗 *Click to join newsletter:*\n${NEWSLETTER_JID}`,
                            contextInfo: {
                                forwardingScore: 0,
                                isForwarded: false,
                                externalAdReply: {
                                    title: `${BOT_NAME} Newsletter`,
                                    body: 'Click to join and get updates!',
                                    mediaType: 1,
                                    thumbnailUrl: 'https://via.placeholder.com/300x100?text=ZUKO-MD',
                                    sourceUrl: `https://wa.me/${NEWSLETTER_JID}`
                                }
                            }
                        });
                        
                        console.log(`📨 Welcome message with buttons sent to: ${userId}`);
                        
                    } catch (welcomeError) {
                        console.error(`Failed to send welcome message to ${userId}:`, welcomeError.message);
                    }
                }
            }
            
            // Handle button responses
            if (msg.message?.buttonsResponseMessage) {
                const buttonId = msg.message.buttonsResponseMessage.selectedButtonId;
                
                if (buttonId === 'join_newsletter') {
                    await sock.sendMessage(from, {
                        text: `📢 *Join ${BOT_NAME} Newsletter*\n\nNewsletter JID:\n\`${NEWSLETTER_JID}\`\n\nSimply forward this JID to any chat and click to join!`,
                        contextInfo: {
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: NEWSLETTER_JID,
                                newsletterName: `${BOT_NAME} Updates`,
                                serverMessageId: Date.now().toString()
                            }
                        }
                    });
                } else if (buttonId === 'copy_jid') {
                    await sock.sendMessage(from, {
                        text: `📋 *Newsletter JID:*\n\`${NEWSLETTER_JID}\`\n\nLong press to copy!`
                    });
                }
            }
            
            // Delegate to external handler
            await handler.handleMessage(sock, msg);
            
            // Auto-read messages (if enabled)
            if (config.autoRead && from.endsWith('@g.us')) {
                try {
                    await sock.readMessages([msg.key]);
                } catch (e) {}
            }
        }
    });
    
    // Group participants update
    sock.ev.on('group-participants.update', async (update) => {
        await handler.handleGroupUpdate(sock, update);
    });
    
    return sock;
}

// Start the bot
console.log('=' .repeat(50));
console.log(`🤖 ${BOT_NAME} Bot Starting...`);
console.log('=' .repeat(50));

startBot().catch(err => {
    console.error('❌ Failed to start bot:', err.message);
    process.exit(1);
});

// Error handlers
process.on('uncaughtException', (err) => {
    if (err.code === 'ENOSPC') {
        console.error('⚠️ No space left on device');
    } else if (!err.message?.includes('rate-overlimit')) {
        console.error('Uncaught Exception:', err.message);
    }
});

process.on('unhandledRejection', (err) => {
    if (err.message?.includes('rate-overlimit')) {
        console.warn('⚠️ Rate limit reached');
    } else if (!err.message?.includes('ENOSPC')) {
        console.error('Unhandled Rejection:', err.message);
    }
});