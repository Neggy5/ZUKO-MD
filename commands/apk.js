const axios = require('axios');
const fs = require('fs');
const path = require('path');

/**
 * Downloads an APK file from a given URL and sends it in chat.
 * Usage: .apk <apk_url>
 */
async function apkCommand(sock, chatId, message, args) {
    const channelInfo = {
        contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363420143192043@newsletter',
                newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                serverMessageId: -1
            }
        }
    };

    try {
        // Parse URL from args
        const url = args && args[0] ? args[0] : null;
        if (!url || !/^https?:\/\/.+\.apk$/i.test(url)) {
            await sock.sendMessage(chatId, {
                text: '❌ Usage: `.apk <apk_url>`\nExample: `.apk https://example.com/app.apk`',
                ...channelInfo
            }, { quoted: message });
            return;
        }

        await sock.sendMessage(chatId, {
            text: `⏳ Downloading APK file...\nPlease wait...`,
            ...channelInfo
        }, { quoted: message });

        // Download APK file
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream'
        });

        // Generate a temporary file path
        const fileName = `ZUKO-${Date.now()}.apk`;
        const filePath = path.join(__dirname, '../tmp', fileName);

        // Ensure tmp directory exists
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        // Send APK file
        await sock.sendMessage(chatId, {
            document: { url: filePath },
            mimetype: 'application/vnd.android.package-archive',
            fileName: fileName,
            caption: '✅ APK Downloaded by 𝐙𝐔𝐊𝐎-𝐌𝐃',
            ...channelInfo
        }, { quoted: message });

        // Cleanup temp file
        setTimeout(() => {
            fs.unlink(filePath, () => {});
        }, 60 * 1000);

    } catch (err) {
        console.error('APK download error:', err);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to download APK. Make sure the URL is correct and points to an APK file.',
            ...channelInfo
        }, { quoted: message });
    }
}

module.exports = apkCommand;