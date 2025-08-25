const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { promisify } = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);

async function uploadToCatbox(fileBuffer, fileName, fileType) {
    try {
        const formData = new FormData();
        formData.append('reqtype', 'fileupload');
        formData.append('userhash', '');
        formData.append('fileToUpload', fileBuffer, {
            filename: fileName,
            contentType: fileType
        });

        const response = await axios.post('https://catbox.moe/user/api.php', formData, {
            headers: {
                ...formData.getHeaders(),
            },
            timeout: 30000
        });

        if (response.data && response.data.includes('https://')) {
            return response.data.trim();
        } else {
            throw new Error('Invalid response from catbox.moe');
        }
    } catch (error) {
        console.error('Catbox upload error:', error.message);
        throw new Error(`Upload failed: ${error.message}`);
    }
}

async function uploadTextToCatbox(text, fileName = 'text.txt') {
    try {
        const formData = new FormData();
        formData.append('reqtype', 'fileupload');
        formData.append('userhash', '');
        formData.append('fileToUpload', Buffer.from(text), {
            filename: fileName,
            contentType: 'text/plain'
        });

        const response = await axios.post('https://catbox.moe/user/api.php', formData, {
            headers: {
                ...formData.getHeaders(),
            },
            timeout: 30000
        });

        if (response.data && response.data.includes('https://')) {
            return response.data.trim();
        } else {
            throw new Error('Invalid response from catbox.moe');
        }
    } catch (error) {
        console.error('Catbox text upload error:', error.message);
        throw new Error(`Text upload failed: ${error.message}`);
    }
}

async function urlCommand(sock, chatId, message) {
    try {
        // Check if message has media or is quoted message
        const quotedMessage = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const hasMedia = message.message?.imageMessage || message.message?.videoMessage || 
                        message.message?.audioMessage || message.message?.documentMessage ||
                        (quotedMessage && (quotedMessage.imageMessage || quotedMessage.videoMessage || 
                         quotedMessage.audioMessage || quotedMessage.documentMessage));

        if (!hasMedia && !quotedMessage) {
            await sock.sendMessage(chatId, {
                text: `📁 *CATBOX.MOE UPLOADER* 📁

❌ Please reply to a media file (image, video, audio, document) or text message with .url

📋 *Usage:*
• Reply to any media file with .url
• Reply to a text message with .url
• Send .url with text to upload as file

⚡ *Supported files:* Images, Videos, Audio, Documents, Text`,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
            return;
        }

        // Send processing message
        await sock.sendMessage(chatId, {
            text: '⏳ Uploading to catbox.moe...',
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });

        let downloadUrl;
        let fileName = 'file';
        let fileType = 'application/octet-stream';

        // Handle quoted message
        if (quotedMessage) {
            if (quotedMessage.imageMessage) {
                downloadUrl = quotedMessage.imageMessage.url;
                fileName = quotedMessage.imageMessage.fileName || `image_${Date.now()}.jpg`;
                fileType = quotedMessage.imageMessage.mimetype || 'image/jpeg';
            } else if (quotedMessage.videoMessage) {
                downloadUrl = quotedMessage.videoMessage.url;
                fileName = quotedMessage.videoMessage.fileName || `video_${Date.now()}.mp4`;
                fileType = quotedMessage.videoMessage.mimetype || 'video/mp4';
            } else if (quotedMessage.audioMessage) {
                downloadUrl = quotedMessage.audioMessage.url;
                fileName = quotedMessage.audioMessage.fileName || `audio_${Date.now()}.mp3`;
                fileType = quotedMessage.audioMessage.mimetype || 'audio/mpeg';
            } else if (quotedMessage.documentMessage) {
                downloadUrl = quotedMessage.documentMessage.url;
                fileName = quotedMessage.documentMessage.fileName || `document_${Date.now()}`;
                fileType = quotedMessage.documentMessage.mimetype || 'application/octet-stream';
            } else if (quotedMessage.conversation || quotedMessage.extendedTextMessage?.text) {
                // Handle text message upload
                const text = quotedMessage.conversation || quotedMessage.extendedTextMessage.text;
                const url = await uploadTextToCatbox(text, `text_${Date.now()}.txt`);
                
                await sock.sendMessage(chatId, {
                    text: `✅ *TEXT UPLOADED SUCCESSFULLY* ✅

📄 *File Type:* Text File
🔗 *URL:* ${url}

💡 *Tip:* This URL will expire after 24 hours of inactivity`,
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363420143192043@newsletter',
                            newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                            serverMessageId: -1
                        }
                    }
                });
                return;
            }
        } else {
            // Handle direct media message
            if (message.message.imageMessage) {
                downloadUrl = message.message.imageMessage.url;
                fileName = message.message.imageMessage.fileName || `image_${Date.now()}.jpg`;
                fileType = message.message.imageMessage.mimetype || 'image/jpeg';
            } else if (message.message.videoMessage) {
                downloadUrl = message.message.videoMessage.url;
                fileName = message.message.videoMessage.fileName || `video_${Date.now()}.mp4`;
                fileType = message.message.videoMessage.mimetype || 'video/mp4';
            } else if (message.message.audioMessage) {
                downloadUrl = message.message.audioMessage.url;
                fileName = message.message.audioMessage.fileName || `audio_${Date.now()}.mp3`;
                fileType = message.message.audioMessage.mimetype || 'audio/mpeg';
            } else if (message.message.documentMessage) {
                downloadUrl = message.message.documentMessage.url;
                fileName = message.message.documentMessage.fileName || `document_${Date.now()}`;
                fileType = message.message.documentMessage.mimetype || 'application/octet-stream';
            }
        }

        if (!downloadUrl) {
            throw new Error('No downloadable media found');
        }

        // Download the file
        const response = await axios({
            method: 'GET',
            url: downloadUrl,
            responseType: 'arraybuffer',
            timeout: 60000
        });

        const fileBuffer = Buffer.from(response.data);

        // Upload to catbox.moe
        const catboxUrl = await uploadToCatbox(fileBuffer, fileName, fileType);

        // Get file size
        const fileSize = (fileBuffer.length / (1024 * 1024)).toFixed(2);

        // Determine file type category
        let fileCategory = 'Document';
        if (fileType.includes('image')) fileCategory = 'Image';
        if (fileType.includes('video')) fileCategory = 'Video';
        if (fileType.includes('audio')) fileCategory = 'Audio';

        // Send success message
        await sock.sendMessage(chatId, {
            text: `✅ *FILE UPLOADED SUCCESSFULLY* ✅

📁 *File Name:* ${fileName}
📊 *File Type:* ${fileCategory}
💾 *File Size:* ${fileSize} MB
🔗 *URL:* ${catboxUrl}

⚡ *Powered by zuko*
💡 *Tip:* This URL will expire after 24 hours of inactivity`,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });

    } catch (error) {
        console.error('URL command error:', error);
        
        let errorMessage = '❌ Failed to upload file. ';
        
        if (error.message.includes('timeout')) {
            errorMessage += 'Upload timed out. Please try again.';
        } else if (error.message.includes('network')) {
            errorMessage += 'Network error. Check your connection.';
        } else if (error.message.includes('Invalid response')) {
            errorMessage += 'Catbox.moe service unavailable.';
        } else {
            errorMessage += error.message;
        }

        await sock.sendMessage(chatId, {
            text: errorMessage,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });
    }
}

module.exports = urlCommand;