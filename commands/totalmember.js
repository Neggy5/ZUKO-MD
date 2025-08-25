/**
 * Handle totalmember command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 */
async function totalMemberCommand(sock, chatId, message) {
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
        const totalMembers = groupMetadata.participants.length;

        await sock.sendMessage(chatId, { 
            text: `👥 *Group Members*\n\nTotal: ${totalMembers} ${totalMembers === 1 ? 'member' : 'members'}`,
            quoted: message
        });

    } catch (error) {
        console.error('TotalMember Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to get member count. Try again later!',
            quoted: message
        });
    }
}

module.exports = {
    totalMemberCommand
};