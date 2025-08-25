const { isAdmin } = require('../lib/isAdmin');

/**
 * Handle setdesc command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 */
async function setDescCommand(sock, chatId, message) {
    try {
        const isGroup = chatId.endsWith('@g.us');
        
        // Only works in groups
        if (!isGroup) {
            await sock.sendMessage(hatId, { 
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
                text: '❌ I need to be admin to change group descriptions!',
                quoted: message
            });
            return;
        }

        if (!isSenderAdmin && !message.key.fromMe) {
            await sock.sendMessage(chatId, { 
                text: '❌ Only admins can change group descriptions!',
                quoted: message
            });
            return;
        }

        // Extract new description
        const newDesc = message.message?.conversation?.replace('.setdesc', '').trim() || 
                       message.message?.extendedTextMessage?.text?.replace('.setdesc', '').trim();

        if (!newDesc || newDesc.length > 512) {
            await sock.sendMessage(chatId, { 
                text: '❌ Please provide a valid description (max 512 characters)!\nExample: .setdesc This is our developer community group',
                quoted: message
            });
            return;
        }

        // Update group description
        await sock.groupUpdateDescription(chatId, newDesc);
        
        await sock.sendMessage(chatId, { 
            text: `✅ Group description updated:\n\n${newDesc}`,
            quoted: message
        });

    } catch (error) {
        console.error('SetDesc Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to change group description. Try again later!',
            quoted: message
        });
    }
}

module.exports = {
    setDescCommand
};