const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function getProfilePicture(sock, targetJid) {
    try {
        const ppUrl = await sock.profilePictureUrl(targetJid, 'image');
        if (!ppUrl) return null;
        
        const response = await axios.get(ppUrl, { responseType: 'arraybuffer' });
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error('Error fetching profile picture:', error);
        return null;
    }
}

const getppCommand = {
    name: 'getpp',
    description: 'Get profile picture of user/group',
    async execute(sock, chatId, message, args, isGroup) {
        try {
            let targetJid;
            const quotedMsg = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            const mentionedJid = message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];

            // Determine target
            if (mentionedJid) {
                targetJid = mentionedJid;
            } else if (quotedMsg) {
                targetJid = quotedMsg.key?.participant || quotedMsg.key?.remoteJid;
            } else if (args[0]?.includes('@')) {
                targetJid = args[0];
            } else {
                targetJid = isGroup ? chatId : message.key.participant || message.key.remoteJid;
            }

            // Get and send picture
            const buffer = await getProfilePicture(sock, targetJid);
            if (!buffer) {
                return sock.sendMessage(chatId, {
                    text: '❌ No profile picture found!',
                    ...global.channelInfo
                });
            }

            const fileName = `pp_${targetJid.split('@')[0]}_${Date.now()}.jpg`;
            const filePath = path.join(__dirname, '../tmp', fileName);
            
            fs.writeFileSync(filePath, buffer);
            await sock.sendMessage(chatId, {
                image: { url: filePath },
                caption: `🖼️ Profile picture of ${targetJid.split('@')[0]}`,
                ...global.channelInfo
            });
            fs.unlinkSync(filePath);

        } catch (error) {
            console.error('getpp error:', error);
            await sock.sendMessage(chatId, {
                text: error.response?.status === 404 
                    ? '❌ No profile picture found!' 
                    : '❌ Failed to get profile picture',
                ...global.channelInfo
            });
        }
    }
};

module.exports = getppCommand;