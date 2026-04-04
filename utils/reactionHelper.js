/**
 * Reaction Helper - Shared function for all reaction commands
 */

import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

ffmpeg.setFfmpegPath(ffmpegStatic);

const TMP_DIR = path.join(__dirname, '../temp/reactions');
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true });

const NEX_APIKEY = 'd0634e61e8789b051e';

async function fetchGifBufferFromUrl(url) {
    const res = await axios.get(url, { responseType: 'arraybuffer', timeout: 20000 });
    return Buffer.from(res.data);
}

async function fetchGifFromApiEndpoint(apiEndpoint) {
    try {
        const resJson = await axios.get(apiEndpoint, { responseType: 'json', timeout: 10000 });
        if (resJson && resJson.data && resJson.data.url) {
            return await fetchGifBufferFromUrl(resJson.data.url);
        }
    } catch (err) {}
    
    try {
        const resBin = await axios.get(apiEndpoint, { responseType: 'arraybuffer', timeout: 20000 });
        return Buffer.from(resBin.data);
    } catch (err) {
        throw new Error(`Failed to fetch GIF: ${err.message || err}`);
    }
}

async function gifToVideoBuffer(gifBuffer) {
    const filename = crypto.randomBytes(6).toString('hex');
    const gifPath = path.join(TMP_DIR, `${filename}.gif`);
    const mp4Path = path.join(TMP_DIR, `${filename}.mp4`);
    
    try {
        fs.writeFileSync(gifPath, gifBuffer);
        
        await new Promise((resolve, reject) => {
            ffmpeg(gifPath)
                .outputOptions(['-movflags faststart', '-pix_fmt yuv420p', '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'])
                .on('error', reject)
                .on('end', resolve)
                .save(mp4Path);
        });
        
        return fs.readFileSync(mp4Path);
    } finally {
        try { if (fs.existsSync(gifPath)) fs.unlinkSync(gifPath); } catch (_) {}
        try { if (fs.existsSync(mp4Path)) fs.unlinkSync(mp4Path); } catch (_) {}
    }
}

export async function sendReaction(sock, msg, context, action, displayText, emoji = '') {
    const { from, sender, react, reply } = context;
    
    try {
        const apiUrl = `https://api.nexoracle.com/reactions-pack/${action}?apikey=${NEX_APIKEY}`;
        
        const senderTag = `@${sender.split('@')[0]}`;
        
        let target = context.args?.[0] || msg.message?.extendedTextMessage?.contextInfo?.mentionedJid?.[0];
        let targetTag = null;
        
        if (target && target.startsWith('@')) {
            target = `${target.replace('@', '')}@s.whatsapp.net`;
            targetTag = `@${target.split('@')[0]}`;
        }
        
        const caption = targetTag
            ? `${emoji} ${senderTag} ${displayText} ${targetTag}`
            : `${emoji} ${senderTag} is ${displayText.replace(/ed$|ing$/, '')}ing`;
        
        await react('⏳');
        
        const gifBuffer = await fetchGifFromApiEndpoint(apiUrl);
        const videoBuffer = await gifToVideoBuffer(gifBuffer);
        
        await sock.sendMessage(from, {
            video: videoBuffer,
            caption: caption,
            gifPlayback: true,
            mentions: targetTag ? [sender, target] : [sender]
        }, { quoted: msg });
        
        await react(emoji);
        
    } catch (err) {
        console.error(`${action} error:`, err);
        await reply(`❌ Failed to send ${action} reaction.`);
        await react('❌');
    }
}