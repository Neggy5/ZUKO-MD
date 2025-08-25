const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const { fetchBuffer } = require('../lib/myfunc');

async function toAudioCommand(sock, chatId, message) {
    let tempInputPath, tempOutputPath;
    
    try {
        // Check for YouTube URL
        const url = message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.caption || 
                   message.message?.videoMessage?.caption || 
                   message.message?.extendedTextMessage?.text || 
                   message.message?.conversation;

        // Check for attached video/audio
        const mediaMessage = message.message?.videoMessage || 
                           message.message?.audioMessage || 
                           message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage || 
                           message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.audioMessage;

        if (!url && !mediaMessage) {
            return sock.sendMessage(chatId, {
                text: '❌ Please reply to a video/audio or provide a YouTube URL.\n\nExample: `.toaudio https://youtu.be/example` or reply to a video with `.toaudio`',
                mentions: []
            });
        }

        // Temporary files
        tempInputPath = path.join(__dirname, '../temp', `input_${Date.now()}`);
        tempOutputPath = path.join(__dirname, '../temp', `output_${Date.now()}.mp3`);

        let audioTitle = 'converted_audio';

        if (url && ytdl.validateURL(url)) {
            // YouTube audio download
            await sock.sendMessage(chatId, { text: '⬇️ Downloading YouTube audio...', mentions: [] });

            const info = await ytdl.getInfo(url);
            audioTitle = info.videoDetails.title.replace(/[^\w\s]/gi, '');
            
            // Check duration (max 1 hour)
            if (parseInt(info.videoDetails.lengthSeconds) > 3600) {
                return sock.sendMessage(chatId, {
                    text: '❌ Audio is too long (max 1 hour allowed)',
                    mentions: []
                });
            }

            const audioStream = ytdl(url, { quality: 'highestaudio', filter: 'audioonly' });
            const writeStream = fs.createWriteStream(tempInputPath);
            audioStream.pipe(writeStream);

            await new Promise((resolve, reject) => {
                writeStream.on('finish', resolve);
                writeStream.on('error', reject);
            });

        } else if (mediaMessage) {
            // Media file conversion
            await sock.sendMessage(chatId, { text: '🔄 Converting media to audio...', mentions: [] });

            const buffer = await sock.downloadMediaMessage(message);
            fs.writeFileSync(tempInputPath, buffer);
        } else {
            return sock.sendMessage(chatId, {
                text: '❌ Invalid input. Please provide a valid YouTube URL or media file.',
                mentions: []
            });
        }

        // Convert to MP3 using ffmpeg
        await new Promise((resolve, reject) => {
            ffmpeg(tempInputPath)
                .audioBitrate(128)
                .toFormat('mp3')
                .on('error', reject)
                .on('end', resolve)
                .save(tempOutputPath);
        });

        // Check file size (WhatsApp limit is 16MB)
        const stats = fs.statSync(tempOutputPath);
        const fileSizeInMB = stats.size / (1024 * 1024);

        if (fileSizeInMB > 16) {
            return sock.sendMessage(chatId, {
                text: `❌ Audio file is too large (${fileSizeInMB.toFixed(1)}MB). Maximum allowed size is 16MB.`,
                mentions: []
            });
        }

        // Send the audio file
        await sock.sendMessage(chatId, {
            audio: fs.readFileSync(tempOutputPath),
            mimetype: 'audio/mpeg',
            fileName: `${audioTitle}.mp3`,
            ptt: false,
            mentions: []
        });

    } catch (error) {
        console.error('Error in toaudio command:', error);
        await sock.sendMessage(chatId, {
            text: `❌ Error: ${error.message.includes('ffmpeg') ? 'Conversion failed' : error.message}`,
            mentions: []
        });
    } finally {
        // Clean up temporary files
        [tempInputPath, tempOutputPath].forEach(file => {
            if (file && fs.existsSync(file)) fs.unlinkSync(file);
        });
    }
}

module.exports = toAudioCommand;