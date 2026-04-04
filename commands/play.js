/**
 * Play Command - Download YouTube audio
 * ES Module version with button support
 */

import yts from 'yt-search';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import APIs from '../utils/api.js';
import { ButtonManager } from '../utils/buttonManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

const AXIOS_DEFAULTS = {
  timeout: 60000,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*'
  }
};

// Convert to proper MP3 format
async function convertToMp3(inputBuffer) {
  const tempDir = path.join(__dirname, '../temp');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
  
  const inputPath = path.join(tempDir, `input_${Date.now()}.mp3`);
  const outputPath = path.join(tempDir, `output_${Date.now()}.mp3`);
  
  try {
    fs.writeFileSync(inputPath, inputBuffer);
    
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .audioCodec('libmp3lame')
        .audioBitrate('128k')
        .audioFrequency(44100)
        .format('mp3')
        .on('end', resolve)
        .on('error', reject)
        .save(outputPath);
    });
    
    if (fs.existsSync(outputPath)) {
      return fs.readFileSync(outputPath);
    }
    return inputBuffer;
  } catch (error) {
    console.error('Conversion to MP3 failed:', error.message);
    return inputBuffer;
  } finally {
    try {
      if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
      if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
    } catch (e) {}
  }
}

// Check if buffer is valid audio
function isValidAudio(buffer) {
  if (!buffer || buffer.length < 1000) return false;
  // Check for ID3 tag (MP3)
  if (buffer.slice(0, 3).toString() === 'ID3') return true;
  // Check for MPEG frame sync
  if (buffer[0] === 0xFF && (buffer[1] & 0xE0) === 0xE0) return true;
  return false;
}

export default {
  name: 'play',
  aliases: ['song', 'music', 'yta'],
  description: 'Download audio from YouTube',
  usage: '.play <song name or YouTube link>',
  
  async execute(sock, msg, args, context) {
    const { from, react, prefix = '.' } = context;
    const buttons = new ButtonManager(sock);
    
    try {
      const text = args.join(' ');
      
      if (!text) {
        await buttons.sendButtons(from, {
          text: `❌ *ＮＯ ＱＵＥＲＹ*\n\nUsage: ${prefix}play <song name or URL>`,
          buttons: [{ text: '🏠 MENU', id: 'menu_main', type: 'reply' }]
        }, msg);
        return;
      }
      
      await react('🎵');
      
      let video;
      
      if (text.includes('youtube.com') || text.includes('youtu.be')) {
        video = { url: text };
      } else {
        const search = await yts(text);
        if (!search || !search.videos.length) {
          await react('❌');
          return;
        }
        video = search.videos[0];
      }
      
      // Inform user
      await sock.sendMessage(from, {
        image: { url: video.thumbnail },
        caption: `🎵 *ＤＯＷＮＬＯＡＤＩＮＧ...*\n\n📹 *${video.title}*\n⏱️ *${video.timestamp}*`
      }, { quoted: msg });
      
      await react('⏳');
      
      // Try multiple APIs with fallback chain
      let audioData;
      let audioBuffer;
      let downloadSuccess = false;
      
      const apiMethods = [
        { name: 'EliteProTech', method: () => APIs.getEliteProTechDownloadByUrl(video.url) },
        { name: 'Yupra', method: () => APIs.getYupraDownloadByUrl(video.url) },
        { name: 'Okatsu', method: () => APIs.getOkatsuDownloadByUrl(video.url) },
        { name: 'Izumi', method: () => APIs.getIzumiDownloadByUrl(video.url) }
      ];
      
      for (const apiMethod of apiMethods) {
        try {
          audioData = await apiMethod.method();
          const audioUrl = audioData.download || audioData.dl || audioData.url;
          
          if (!audioUrl) continue;
          
          const audioResponse = await axios.get(audioUrl, {
            responseType: 'arraybuffer',
            timeout: 90000,
            headers: AXIOS_DEFAULTS.headers
          });
          audioBuffer = Buffer.from(audioResponse.data);
          
          if (audioBuffer && audioBuffer.length > 0) {
            downloadSuccess = true;
            break;
          }
        } catch (err) {
          console.log(`${apiMethod.name} failed:`, err.message);
          continue;
        }
      }
      
      if (!downloadSuccess || !audioBuffer) {
        throw new Error('All download sources failed');
      }
      
      // Convert to proper MP3 format
      await react('🔄');
      let finalBuffer = audioBuffer;
      
      if (!isValidAudio(audioBuffer)) {
        console.log('Converting to proper MP3 format...');
        finalBuffer = await convertToMp3(audioBuffer);
      }
      
      const fileSizeMB = (finalBuffer.length / (1024 * 1024)).toFixed(2);
      
      // Send as normal audio (not voice message)
      await sock.sendMessage(from, {
        audio: finalBuffer,
        mimetype: 'audio/mpeg',
        ptt: false
      }, { quoted: msg });
      
      await buttons.sendButtons(from, {
        text: `✅ *ＰＬＡＹ ＣＯＭＰＬＥＴＥ*\n\n🎵 ${video.title}\n📦 ${fileSizeMB} MB\n⏱️ ${video.timestamp}`,
        buttons: [
          { text: '🎵 AGAIN', id: 'play', type: 'reply' },
          { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
        ]
      }, msg);
      
      await react('✅');
      
    } catch (err) {
      console.error('Play command error:', err);
      
      let errorMessage = '❌ Failed to download song.';
      if (err.message && err.message.includes('blocked')) {
        errorMessage = '❌ Download blocked. The content may be unavailable.';
      }
      
      await buttons.sendButtons(from, {
        text: errorMessage,
        buttons: [{ text: '🏠 MENU', id: 'menu_main', type: 'reply' }]
      }, msg);
      await react('❌');
    }
  }
};