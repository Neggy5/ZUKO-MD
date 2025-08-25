const { isAdmin } = require('../lib/isAdmin');

/**
 * Handle setgroupname command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 */
async function setGroupNameCommand(sock, chatId, message) {
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
                text: '❌ I need to be admin to change group names!',
                quoted: message
            });
            return;
        }

        if (!isSenderAdmin && !message.key.fromMe) {
            await sock.sendMessage(chatId, { 
                text: '❌ Only admins can change group names!',
                quoted: message
            });
            return;
        }

        // Extract new group name
        const newName = message.message?.conversation?.replace('.setgroupname', '').trim() || 
                       message.message?.extendedTextMessage?.text?.replace('.setgroupname', '').trim();

        if (!newName || newName.length > 25) {
            await sock.sendMessage(chatId, { 
                text: '❌ Please provide a valid name (max 25 characters)!\nExample: .setgroupname Awesome Group',
                quoted: message
            });
            return;
        }

        // Update group name
        await sock.groupUpdateSubject(chatId, newName);
        
        await sock.sendMessage(chatId, { 
            text: `✅ Group name changed to:\n"${newName}"`,
            quoted: message
        });

    } catch (error) {
        console.error('SetGroupName Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to change group name. Try again later!',
            quoted: message
        });
    }
}

module.exports = {
    setGroupNameCommand
};