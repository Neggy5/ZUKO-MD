const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

async function viewonceCommand(sock, chatId, message) {
    try {
        // Check if the message is a reply
        const quoted = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (!quoted) {
            return await sock.sendMessage(chatId, 
                { text: '❌ Please reply to a view-once image or video message.' }, 
                { quoted: message }
            );
        }

        // Check for view-once media
        const mediaType = quoted.imageMessage ? 'image' : 
                         quoted.videoMessage ? 'video' : null;
        
        if (!mediaType || !(quoted[`${mediaType}Message`]?.viewOnce)) {
            return await sock.sendMessage(chatId, 
                { text: '❌ The replied message is not a view-once media or has already been viewed.' }, 
                { quoted: message }
            );
        }

        // Download the media
        const mediaMessage = quoted[`${mediaType}Message`];
        const stream = await downloadContentFromMessage(mediaMessage, mediaType);
        
        // Create buffer from stream
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }

        // Validate media size (max 15MB for WhatsApp)
        if (buffer.length > 15 * 1024 * 1024) {
            return await sock.sendMessage(chatId, 
                { text: '❌ Media is too large to process (max 15MB).' }, 
                { quoted: message }
            );
        }

        // Prepare file metadata
        const ext = mediaType === 'image' ? 'jpg' : 'mp4';
        const fileName = `viewonce_${Date.now()}.${ext}`;
        const tempPath = path.join(__dirname, '..', 'temp', fileName);
        
        // Save to temp file (optional)
        await writeFileAsync(tempPath, buffer);

        // Send the media with original caption
        const sendOptions = {
            [mediaType]: buffer,
            fileName: fileName,
            caption: mediaMessage.caption || '',
            mimetype: mediaMessage.mimetype || 
                    (mediaType === 'image' ? 'image/jpeg' : 'video/mp4')
        };

        await sock.sendMessage(chatId, sendOptions, { quoted: message });

        // Delete temp file after sending (optional)
        try {
            fs.unlinkSync(tempPath);
        } catch (cleanupError) {
            console.error('Error cleaning up temp file:', cleanupError);
        }

    } catch (error) {
        console.error('ViewOnce command error:', error);
        
        let errorMessage = '❌ Failed to process view-once media.';
        if (error.message.includes('404')) {
            errorMessage = '⚠️ Media not found (may have expired).';
        } else if (error.message.includes('download')) {
            errorMessage = '⚠️ Failed to download media.';
        }

        await sock.sendMessage(chatId, 
            { text: errorMessage }, 
            { quoted: message }
        );
    }
}

module.exports = viewonceCommand;