const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { fetchBuffer } = require('../lib/myfunc');

// Meme templates configuration
const MEME_TEMPLATES = {
    'drake': {
        id: 181913649,
        name: 'Drake Hotline Bling',
        lines: 2,
        example: '.meme drake "Bad Idea" "Good Idea"'
    },
    'distracted': {
        id: 112126428,
        name: 'Distracted Boyfriend',
        lines: 3,
        example: '.meme distracted "You" "Your GF" "Other Girl"'
    },
    'changemind': {
        id: 129242436,
        name: 'Change My Mind',
        lines: 1,
        example: '.meme changemind "Pineapple belongs on pizza"'
    },
    'batman': {
        id: 438680,
        name: 'Batman Slapping Robin',
        lines: 2,
        example: '.meme batman "Something dumb" "Batman slap"'
    },
    'exit': {
        id: 124822590,
        name: 'Nobody: / Me:',
        lines: 1,
        example: '.meme exit "When someone says WhatsApp is better than Telegram"'
    },
    'tuxedo': {
        id: 195515965,
        name: 'Tuxedo Winnie The Pooh',
        lines: 2,
        example: '.meme tuxedo "Normal thing" "Fancy version"'
    }
};

// Path for custom memes storage
const MEMES_DIR = path.join(__dirname, '../media/memes');
if (!fs.existsSync(MEMES_DIR)) {
    fs.mkdirSync(MEMES_DIR, { recursive: true });
}

/**
 * Generate a meme using imgflip API
 * @param {string} template - Meme template name
 * @param {Array} texts - Array of text lines
 * @returns {Promise<Buffer>} - Meme image buffer
 */
async function generateMeme(template, texts) {
    try {
        const templateConfig = MEME_TEMPLATES[template];
        if (!templateConfig) {
            throw new Error('Invalid meme template');
        }

        if (texts.length !== templateConfig.lines) {
            throw new Error(`This template requires exactly ${templateConfig.lines} text lines`);
        }

        const params = new URLSearchParams();
        params.append('template_id', templateConfig.id);
        texts.forEach((text, i) => {
            params.append(`boxes[${i}][text]`, text);
        });

        const response = await axios.post('https://api.imgflip.com/caption_image', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.data.success) {
            throw new Error(response.data.error_message || 'Failed to generate meme');
        }

        const imageUrl = response.data.data.url;
        const imageBuffer = await fetchBuffer(imageUrl);
        
        return imageBuffer;
    } catch (error) {
        console.error('Meme generation error:', error);
        throw error;
    }
}

/**
 * Save custom meme template
 * @param {string} name - Template name
 * @param {Buffer} imageBuffer - Image buffer
 * @returns {Promise<string>} - Path to saved template
 */
async function saveCustomTemplate(name, imageBuffer) {
    try {
        const filename = `${name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
        const filePath = path.join(MEMES_DIR, filename);
        
        await fs.promises.writeFile(filePath, imageBuffer);
        return filePath;
    } catch (error) {
        console.error('Error saving custom template:', error);
        throw error;
    }
}

/**
 * Get list of available meme templates
 * @returns {string} - Formatted list of templates
 */
function getMemeTemplatesList() {
    let list = '🎭 *Available Meme Templates* 🎭\n\n';
    Object.entries(MEME_TEMPLATES).forEach(([key, template]) => {
        list += `▢ *${key}* - ${template.name}\nExample: ${template.example}\n\n`;
    });
    list += 'To create a meme: `.meme template "text1" "text2"`\n';
    list += 'To add custom image: Reply to image with `.meme custom "name" "text1" "text2"`';
    return list;
}

/**
 * Handle meme command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 * @param {Array} args - Command arguments
 */
async function memeCommand(sock, chatId, message, args) {
    try {
        // Show help if no arguments
        if (args.length === 0) {
            await sock.sendMessage(chatId, { 
                text: getMemeTemplatesList()
            });
            return;
        }

        const subCommand = args[0].toLowerCase();
        
        // Handle custom meme from replied image
        if (subCommand === 'custom' && message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage) {
            const name = args[1];
            if (!name) {
                await sock.sendMessage(chatId, { 
                    text: 'Please provide a name for your custom template.\nExample: `.meme custom mymeme "Top text" "Bottom text"`'
                });
                return;
            }

            const texts = args.slice(2);
            if (texts.length === 0) {
                await sock.sendMessage(chatId, { 
                    text: 'Please provide text for your meme.\nExample: `.meme custom mymeme "Top text" "Bottom text"`'
                });
                return;
            }

            // Download the quoted image
            const quotedMsg = message.message.extendedTextMessage.contextInfo.quotedMessage;
            const imageBuffer = await sock.downloadMediaMessage(quotedMsg);
            
            // For now we'll just create a sticker from it since custom meme generation would require more complex processing
            const sticker = new Sticker(imageBuffer, {
                pack: 'Custom Meme',
                author: 'Meme Generator',
                type: StickerTypes.FULL,
                categories: ['fun', 'meme'],
                id: '12345',
                quality: 70,
            });
            
            await sock.sendMessage(chatId, await sticker.toMessage());
            return;
        }

        // Handle predefined meme templates
        const template = MEME_TEMPLATES[subCommand];
        if (!template) {
            await sock.sendMessage(chatId, { 
                text: `Invalid meme template. Use .meme without arguments to see available templates.`
            });
            return;
        }

        // Extract text lines from arguments (supporting quoted text)
        const texts = [];
        let currentText = '';
        let inQuotes = false;

        for (let i = 1; i < args.length; i++) {
            const arg = args[i];
            
            if (arg.startsWith('"') && arg.endsWith('"') && arg.length > 1) {
                // Complete quoted text
                texts.push(arg.slice(1, -1));
            } else if (arg.startsWith('"')) {
                // Start of quoted text
                inQuotes = true;
                currentText = arg.slice(1) + ' ';
            } else if (arg.endsWith('"') && inQuotes) {
                // End of quoted text
                currentText += arg.slice(0, -1);
                texts.push(currentText);
                currentText = '';
                inQuotes = false;
            } else if (inQuotes) {
                // Middle of quoted text
                currentText += arg + ' ';
            } else {
                // Unquoted text
                texts.push(arg);
            }
        }

        // Handle any remaining text
        if (currentText) {
            texts.push(currentText.trim());
        }

        // Validate text lines
        if (texts.length < template.lines) {
            await sock.sendMessage(chatId, { 
                text: `This template requires ${template.lines} text lines.\nExample: ${template.example}`
            });
            return;
        }

        // Generate the meme
        await sock.sendMessage(chatId, { 
            text: '🖌️ Creating your meme...'
        });

        const memeBuffer = await generateMeme(subCommand, texts.slice(0, template.lines));
        
        // Send as image
        await sock.sendMessage(chatId, {
            image: memeBuffer,
            caption: 'Here\'s your meme! 🎭'
        });

        // Optional: Also send as sticker
        try {
            const sticker = new Sticker(memeBuffer, {
                pack: 'Meme Generator',
                author: 'Your Bot',
                type: StickerTypes.FULL,
                categories: ['fun', 'meme'],
                quality: 50,
            });
            
            await sock.sendMessage(chatId, await sticker.toMessage());
        } catch (stickerError) {
            console.error('Failed to create sticker:', stickerError);
        }

    } catch (error) {
        console.error('Error in meme command:', error);
        await sock.sendMessage(chatId, { 
            text: `❌ Failed to generate meme: ${error.message}`
        });
    }
}

module.exports = {
    memeCommand,
    getMemeTemplatesList,
    generateMeme,
    saveCustomTemplate
};