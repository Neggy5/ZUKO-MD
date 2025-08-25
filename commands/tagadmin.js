const { isAdmin } = require('../lib/isAdmin');

/**
 * Handle tagadmin command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 */
async function tagAdminCommand(sock, chatId, message) {
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

        // Get group metadata
        const groupMetadata = await sock.groupMetadata(chatId);
        const admins = groupMetadata.participants
            .filter(p => p.admin)
            .map(p => p.id);

        if (admins.length === 0) {
            await sock.sendMessage(chatId, { 
                text: 'ℹ️ This group has no admins!',
                quoted: message
            });
            return;
        }

        // Extract custom message
        const text = message.message?.conversation?.replace('.tagadmin', '').trim() || 
                    message.message?.extendedTextMessage?.text?.replace('.tagadmin', '').trim() || 
                    'Attention Admins!';

        await sock.sendMessage(chatId, { 
            text: `${text}\n\n${admins.map(id => `@${id.split('@')[0]}`).join(' ')}`,
            mentions: admins
        });

    } catch (error) {
        console.error('TagAdmin Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to tag admins. Try again later!',
            quoted: message
        });
    }
}

module.exports = {
    tagAdminCommand
};