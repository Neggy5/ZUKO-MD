const axios = require('axios');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const { fetchBuffer } = require('../lib/myfunc');

async function tiktokAudioCommand(sock, chatId, message) {
    let tempVideoPath, tempAudioPath;
    
    try {
        // Get TikTok URL from message
        const url = message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.caption || 
                   message.message?.videoMessage?.caption || 
                   message.message?.extendedTextMessage?.text || 
                   message.message?.conversation;

        if (!url || !url.match(/tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com/)) {
            return sock.sendMessage(chatId, {
                text: '❌ Please provide a valid TikTok URL.\n\nExample: `.tiktoktoaudio https://vm.tiktok.com/example` or reply to a TikTok video with `.tiktoktoaudio`',
                mentions: []
            });
        }

        // Send initial processing message
        await sock.sendMessage(chatId, {
            text: '⬇️ Downloading TikTok video...',
            mentions: []
        });

        // Temporary files
        tempVideoPath = path.join(__dirname, '../temp', `tiktok_${Date.now()}.mp4`);
        tempAudioPath = path.join(__dirname, '../temp', `tiktok_${Date.now()}.mp3`);

        // Use a TikTok API resolver (you might want to use a specific API service)
        const apiUrl = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);
        
        if (!response.data || !response.data.video) {
            throw new Error('Failed to fetch TikTok video');
        }

        // Download the video
        const videoBuffer = await fetchBuffer(response.data.video);
        fs.writeFileSync(tempVideoPath, videoBuffer);

        // Convert to MP3
        await sock.sendMessage(chatId, {
            text: '🔄 Extracting audio...',
            mentions: []
        });

        await new Promise((resolve, reject) => {
            ffmpeg(tempVideoPath)
                .noVideo()
                .audioBitrate(128)
                .toFormat('mp3')
                .on('error', reject)
                .on('end', resolve)
                .save(tempAudioPath);
        });

        // Check file size (WhatsApp limit is 16MB)
        const stats = fs.statSync(tempAudioPath);
        const fileSizeInMB = stats.size / (1024 * 1024);

        if (fileSizeInMB > 16) {
            return sock.sendMessage(chatId, {
                text: `❌ Audio file is too large (${fileSizeInMB.toFixed(1)}MB). Maximum allowed size is 16MB.`,
                mentions: []
            });
        }

        // Send the audio file
        await sock.sendMessage(chatId, {
            audio: fs.readFileSync(tempAudioPath),
            mimetype: 'audio/mpeg',
            fileName: `tiktok_audio.mp3`,
            ptt: false,
            mentions: []
        });

    } catch (error) {
        console.error('Error in tiktoktoaudio command:', error);
        await sock.sendMessage(chatId, {
            text: `❌ Error: ${error.message.includes('ffmpeg') ? 'Conversion failed' : 'Failed to process TikTok video'}`,
            mentions: []
        });
    } finally {
        // Clean up temporary files
        [tempVideoPath, tempAudioPath].forEach(file => {
            if (file && fs.existsSync(file)) fs.unlinkSync(file);
        });
    }
}

module.exports = tiktokAudioCommand;