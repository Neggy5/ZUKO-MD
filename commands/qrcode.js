const qrcode = require('qrcode');
const fs = require('fs');
const path = require('path');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');

// QR Code storage directory
const QR_DIR = path.join(__dirname, '../media/qrcodes');
if (!fs.existsSync(QR_DIR)) {
    fs.mkdirSync(QR_DIR, { recursive: true });
}

// Default QR options
const DEFAULT_OPTIONS = {
    errorCorrectionLevel: 'H', // High error correction
    margin: 2,
    width: 400,
    color: {
        dark: '#000000', // Black dots
        light: '#ffffff' // White background
    }
};

/**
 * Generate QR code from text
 * @param {string} text - Text/URL to encode
 * @param {object} options - QR code options
 * @returns {Promise<Buffer>} - QR code image buffer
 */
async function generateQR(text, options = {}) {
    try {
        const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
        const filePath = path.join(QR_DIR, `qr_${Date.now()}.png`);

        await qrcode.toFile(filePath, text, mergedOptions);
        const buffer = fs.readFileSync(filePath);
        fs.unlinkSync(filePath); // Clean up temp file

        return buffer;
    } catch (error) {
        console.error('QR Generation Error:', error);
        throw new Error('Failed to generate QR code.');
    }
}

/**
 * Handle QR code command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 * @param {string} userMessage - User's input
 */
async function qrCommand(sock, chatId, message, userMessage) {
    try {
        const args = userMessage.split(' ');
        const command = args[0].toLowerCase();

        // Show help if no text provided
        if (args.length < 2 && !message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            await sock.sendMessage(chatId, {
                text: `🖨️ *QR Code Generator*\n\nGenerate QR codes from text/URLs.\n\n*Usage:*\n\`.qr <text/URL>\` - Basic QR\n\`.qr #color <text>\` - Colored QR\n\`.qr #sticker <text>\` - QR as sticker\n\n*Examples:*\n\`.qr https://google.com\`\n\`.qr #sticker Hello World\`\n\`.qr #ff0000 I love red\``,
                quoted: message
            });
            return;
        }

        // Extract text from quoted message if available
        let text;
        if (message.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            const quoted = message.message.extendedTextMessage.contextInfo.quotedMessage;
            text = quoted.conversation || quoted.extendedTextMessage?.text || '';
        } else {
            text = args.slice(1).join(' ');
        }

        if (!text) {
            await sock.sendMessage(chatId, {
                text: '❌ Please provide text or reply to a message.',
                quoted: message
            });
            return;
        }

        // Check for special flags
        let options = { ...DEFAULT_OPTIONS };
        let sendAsSticker = false;

        if (command.includes('#sticker')) {
            sendAsSticker = true;
            text = args.slice(2).join(' ');
        } else if (command.includes('#')) {
            // Custom color (e.g., #ff0000 for red)
            const color = command.split('#')[1];
            if (/^[0-9a-f]{6}$/i.test(color)) {
                options.color.dark = `#${color}`;
            }
            text = args.slice(2).join(' ');
        }

        // Generate QR code
        await sock.sendMessage(chatId, {
            text: '🔄 Generating QR code...',
            quoted: message
        });

        const qrBuffer = await generateQR(text, options);

        // Send as sticker if requested
        if (sendAsSticker) {
            const sticker = new Sticker(qrBuffer, {
                pack: 'QR Code',
                author: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                type: StickerTypes.FULL,
                categories: ['utility'],
                quality: 50,
            });
            await sock.sendMessage(chatId, await sticker.toMessage());
        } else {
            // Send as image
            await sock.sendMessage(chatId, {
                image: qrBuffer,
                caption: `🔗 QR Code for: ${text.slice(0, 50)}${text.length > 50 ? '...' : ''}`
            });
        }

    } catch (error) {
        console.error('QR Command Error:', error);
        await sock.sendMessage(chatId, {
            text: `❌ Error: ${error.message}`,
            quoted: message
        });
    }
}

module.exports = {
    qrCommand,
    generateQR
};