const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const { isAdmin } = require('../lib/isAdmin');

/**
 * Handle setppgroup command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 */
async function setPPGroupCommand(sock, chatId, message) {
    try {
        const isGroup = chatId.endsWith('@g.us');
        
        // Only works in groups
        if (!isGroup) {
            await sock.sendMessage(chatId, { 
                text: '❌ This command only works in groups!',
                quoted: message
            });
            return;
        }

        // Check admin status
        const senderId = message.key.participant || message.key.remoteJid;
        const { isSenderAdmin, isBotAdmin } = await isAdmin(sock, chatId, senderId);

        if (!isBotAdmin) {
            await sock.sendMessage(chatId, { 
                text: '❌ I need to be admin to change group profile pictures!',
                quoted: message
            });
            return;
        }

        if (!isSenderAdmin && !message.key.fromMe) {
            await sock.sendMessage(chatId, { 
                text: '❌ Only admins can change group profile pictures!',
                quoted: message
            });
            return;
        }

        // Check if message contains an image
        const imageMsg = message.message?.imageMessage || 
                       message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage;

        if (!imageMsg) {
            await sock.sendMessage(chatId, { 
                text: '❌ Please send/reply to an image to set as group profile picture!\nExample: Reply to an image with `.setppgroup`',
                quoted: message
            });
            return;
        }

        // Download image
        await sock.sendMessage(chatId, { 
            text: '🖼️ Processing image...',
            quoted: message
        });

        const buffer = await downloadMediaMessage(message, 'buffer', {});
        
        // Update group picture
        await sock.updateProfilePicture(chatId, { url: buffer })
            .then(async () => {
                await sock.sendMessage(chatId, { 
                    text: '✅ Group profile picture updated successfully!',
                    quoted: message
                });
            })
            .catch(async (error) => {
                console.error('SetPPGroup Error:', error);
                await sock.sendMessage(chatId, { 
                    text: '❌ Failed to update group profile picture. Try again later!',
                    quoted: message
                });
            });

    } catch (error) {
        console.error('SetPPGroup Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error processing your request. Try again later!',
            quoted: message
        });
    }
}

module.exports = {
    setPPGroupCommand
};