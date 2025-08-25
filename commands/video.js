const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const { fetchBuffer } = require('../lib/myfunc');
const ffmpeg = require('fluent-ffmpeg');
const os = require('os');

// Ensure temp directory exists
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

async function videoCommand(sock, chatId, message, args = []) {
    let tempFilePath;
    let progressMessage;

    try {
        // Get the YouTube URL from message
        const url = message.message?.extendedTextMessage?.contextInfo?.quotedMessage?.videoMessage?.caption 
            || message.message?.videoMessage?.caption 
            || message.message?.extendedTextMessage?.text 
            || message.message?.conversation;

        if (!url || !ytdl.validateURL(url)) {
            return await sock.sendMessage(chatId, {
                text: '❌ *Invalid YouTube URL*\n\nPlease provide a valid YouTube URL.\n\n*Examples:*\n• `.video https://youtu.be/example`\n• Reply to a message containing YouTube link with `.video`\n• `.video https://youtube.com/watch?v=example hd` - for HD quality',
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

        // Parse quality argument
        const qualityArg = args[0]?.toLowerCase();
        let quality = 'highest';
        let format = 'mp4';
        
        if (qualityArg === 'hd' || qualityArg === 'high') {
            quality = 'highest';
        } else if (qualityArg === 'sd' || qualityArg === 'low') {
            quality = 'lowest';
        } else if (qualityArg === 'audio') {
            quality = 'highestaudio';
            format = 'mp3';
        }

        // Get video info
        const info = await ytdl.getInfo(url);
        const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
        const duration = parseInt(info.videoDetails.lengthSeconds);
        const views = parseInt(info.videoDetails.viewCount).toLocaleString();
        const uploadDate = new Date(info.videoDetails.uploadDate).toLocaleDateString();
        
        // Check if video is too long (15 minutes max for video, 30 minutes for audio)
        const maxDuration = format === 'mp3' ? 1800 : 900; // 30min audio, 15min video
        if (duration > maxDuration) {
            return await sock.sendMessage(chatId, {
                text: `❌ *Video Too Long*\n\nDuration: ${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}\nMaximum allowed: ${Math.floor(maxDuration/60)} minutes\n\nUse *.video audio* for longer videos to get audio only.`,
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

        // Send initial message with video info
        const infoMessage = await sock.sendMessage(chatId, {
            text: `📹 *Downloading Video*\n\n*Title:* ${title}\n*Duration:* ${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}\n*Views:* ${views}\n*Uploaded:* ${uploadDate}\n*Quality:* ${qualityArg || 'auto'}\n\n⏳ Please wait...`,
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

        // Temporary file path
        const safeTitle = title.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_');
        tempFilePath = path.join(tempDir, `${Date.now()}_${safeTitle}.${format}`);

        // Download progress tracking
        let downloadedBytes = 0;
        let totalBytes = 0;
        let progressInterval;

        const videoStream = ytdl(url, {
            quality: quality,
            filter: format === 'mp3' ? 'audioonly' : 'audioandvideo',
        });

        videoStream.on('progress', (chunkLength, downloaded, total) => {
            downloadedBytes = downloaded;
            totalBytes = total;
        });

        // Start progress updates every 3 seconds
        progressInterval = setInterval(async () => {
            if (totalBytes > 0) {
                const percent = ((downloadedBytes / totalBytes) * 100).toFixed(1);
                const downloadedMB = (downloadedBytes / (1024 * 1024)).toFixed(1);
                const totalMB = (totalBytes / (1024 * 1024)).toFixed(1);
                
                try {
                    await sock.sendMessage(chatId, {
                        text: `📥 *Download Progress*\n\n${percent}% complete\n${downloadedMB}MB / ${totalMB}MB\n\n⏳ Please wait...`,
                        edit: infoMessage.key
                    });
                } catch (editError) {
                    // Ignore edit errors, continue with download
                }
            }
        }, 3000);

        const writeStream = fs.createWriteStream(tempFilePath);
        videoStream.pipe(writeStream);

        // Wait for download to complete
        await new Promise((resolve, reject) => {
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
            videoStream.on('error', reject);
        });

        clearInterval(progressInterval);

        // Check file size (WhatsApp limit is 16MB for videos, 16MB for audio)
        const stats = fs.statSync(tempFilePath);
        const fileSizeInMB = stats.size / (1024 * 1024);
        const maxSize = 16; // WhatsApp limit

        if (fileSizeInMB > maxSize) {
            // Try to compress if it's a video
            if (format === 'mp4') {
                await sock.sendMessage(chatId, {
                    text: `📦 *File Too Large* (${fileSizeInMB.toFixed(1)}MB)\n\nCompressing video to fit WhatsApp limits...`,
                    edit: infoMessage.key
                });

                const compressedPath = path.join(tempDir, `compressed_${Date.now()}_${safeTitle}.mp4`);
                
                await new Promise((resolve, reject) => {
                    ffmpeg(tempFilePath)
                        .outputOptions([
                            '-crf 28', // Higher compression
                            '-preset fast',
                            '-movflags faststart',
                            '-vf scale=640:360' // Reduce resolution
                        ])
                        .on('end', resolve)
                        .on('error', reject)
                        .save(compressedPath);
                });

                fs.unlinkSync(tempFilePath);
                tempFilePath = compressedPath;

                const newStats = fs.statSync(tempFilePath);
                const newSizeMB = newStats.size / (1024 * 1024);

                if (newSizeMB > maxSize) {
                    fs.unlinkSync(tempFilePath);
                    throw new Error(`Compressed file still too large (${newSizeMB.toFixed(1)}MB)`);
                }
            } else {
                throw new Error(`File too large (${fileSizeInMB.toFixed(1)}MB)`);
            }
        }

        // Send the final file
        if (format === 'mp3') {
            await sock.sendMessage(chatId, {
                audio: fs.readFileSync(tempFilePath),
                mimetype: 'audio/mpeg',
                caption: `🎵 *${title}*\n\n🔗 ${url}\n📊 ${fileSizeInMB.toFixed(1)}MB`,
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
        } else {
            await sock.sendMessage(chatId, {
                video: fs.readFileSync(tempFilePath),
                caption: `📹 *${title}*\n\n🔗 ${url}\n📊 ${fileSizeInMB.toFixed(1)}MB`,
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

        // Clean up
        fs.unlinkSync(tempFilePath);

    } catch (error) {
        console.error('Error in video command:', error);
        
        // Clean up if temp file exists
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            try {
                fs.unlinkSync(tempFilePath);
            } catch (unlinkError) {
                console.error('Error deleting temp file:', unlinkError);
            }
        }

        let errorMessage = '❌ *Download Failed*\n\n';
        
        if (error.message.includes('Private video')) {
            errorMessage += 'This video is private or unavailable.';
        } else if (error.message.includes('Copyright')) {
            errorMessage += 'This video is copyright protected.';
        } else if (error.message.includes('too large')) {
            errorMessage += `File is too large for WhatsApp. Try:\n• Shorter video\n• Use *.video audio* for audio only\n• Lower quality with *.video sd*`;
        } else if (error.message.includes('invalid URL')) {
            errorMessage += 'Please provide a valid YouTube URL.';
        } else if (error.message.includes('Unavailable')) {
            errorMessage += 'Video is not available in your country or has been removed.';
        } else {
            errorMessage += 'Please try again with a different video or check the URL.';
        }

        errorMessage += '\n\n*Usage:*\n• `.video <url>` - Download video\n• `.video <url> hd` - Higher quality\n• `.video <url> sd` - Lower quality\n• `.video <url> audio` - Audio only';

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

// Helper function to display video command help
async function showVideoHelp(sock, chatId, message) {
    await sock.sendMessage(chatId, {
        text: `📹 *Video Download Help*\n\n*Usage:*\n• \`.video <youtube-url>\` - Download video\n• \`.video <url> hd\` - Higher quality\n• \`.video <url> sd\` - Lower quality\n• \`.video <url> audio\` - Audio only\n\n*Examples:*\n• \`.video https://youtu.be/example\`\n• \`.video https://youtube.com/watch?v=example hd\`\n• Reply to a message with YouTube link + \`.video\`\n\n*Limits:*\n• Max 15 minutes for videos\n• Max 30 minutes for audio\n• Max 16MB file size`,
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

module.exports = {
    videoCommand,
    showVideoHelp
};