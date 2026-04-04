/**
 * Helper Utilities
 * ES Module version for @kelvdra/baileys
 */

import axios from 'axios';
import { downloadContentFromMessage } from '@kelvdra/baileys';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

/**
 * Download media from message
 */
const downloadMedia = async (message) => {
  try {
    const messageType = Object.keys(message)[0];
    const stream = await downloadContentFromMessage(message[messageType], messageType.replace('Message', ''));
    
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    
    return buffer;
  } catch (error) {
    throw new Error(`Media download failed: ${error.message}`);
  }
};

/**
 * Download media with progress callback
 */
const downloadMediaWithProgress = async (message, onProgress = null) => {
  try {
    const messageType = Object.keys(message)[0];
    const mediaMessage = message[messageType];
    const totalSize = mediaMessage.fileLength || 0;
    
    const stream = await downloadContentFromMessage(mediaMessage, messageType.replace('Message', ''));
    
    let buffer = Buffer.from([]);
    let downloadedSize = 0;
    
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
      downloadedSize += chunk.length;
      
      if (onProgress && totalSize > 0) {
        const percent = (downloadedSize / totalSize) * 100;
        onProgress(percent, downloadedSize, totalSize);
      }
    }
    
    return buffer;
  } catch (error) {
    throw new Error(`Media download failed: ${error.message}`);
  }
};

/**
 * Format time duration
 */
const formatDuration = (ms) => {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  
  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  
  return parts.join(' ') || '0s';
};

/**
 * Format file size
 */
const formatSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  if (!bytes || isNaN(bytes)) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Sleep function
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Parse mentions from message text
 */
const parseMentions = (text) => {
  const mentions = [];
  const regex = /@(\d+)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    mentions.push(match[1] + '@s.whatsapp.net');
  }
  
  return mentions;
};

/**
 * Get quoted message from context
 */
const getQuoted = (msg) => {
  if (!msg.message) return null;
  
  // Check for quoted message in extendedTextMessage
  if (msg.message.extendedTextMessage?.contextInfo?.quotedMessage) {
    return msg.message.extendedTextMessage.contextInfo.quotedMessage;
  }
  
  // Check for quoted message in imageMessage
  if (msg.message.imageMessage?.contextInfo?.quotedMessage) {
    return msg.message.imageMessage.contextInfo.quotedMessage;
  }
  
  // Check for quoted message in videoMessage
  if (msg.message.videoMessage?.contextInfo?.quotedMessage) {
    return msg.message.videoMessage.contextInfo.quotedMessage;
  }
  
  // Check for quoted message in documentMessage
  if (msg.message.documentMessage?.contextInfo?.quotedMessage) {
    return msg.message.documentMessage.contextInfo.quotedMessage;
  }
  
  return null;
};

/**
 * Get quoted message type
 */
const getQuotedType = (msg) => {
  const quoted = getQuoted(msg);
  if (!quoted) return null;
  
  const keys = Object.keys(quoted);
  const type = keys.find(key => 
    key.includes('Message') && 
    !key.includes('Protocol') && 
    !key.includes('Context')
  );
  
  return type || null;
};

/**
 * Upload file to temporary hosting (file.io)
 */
const uploadFile = async (buffer, filename = 'file') => {
  try {
    const form = new FormData();
    form.append('file', buffer, { filename });
    
    const response = await axios.post('https://file.io', form, {
      headers: {
        ...form.getHeaders(),
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data.link;
  } catch (error) {
    console.error('Upload error:', error.message);
    throw new Error('File upload failed');
  }
};

/**
 * Upload buffer to telegra.ph
 */
const uploadToTelegraph = async (buffer, type = 'image') => {
  try {
    const form = new FormData();
    form.append('file', buffer, { filename: `file.${type === 'image' ? 'jpg' : 'mp4'}` });
    
    const response = await axios.post('https://telegra.ph/upload', form, {
      headers: form.getHeaders()
    });
    
    if (response.data && response.data[0] && response.data[0].src) {
      return `https://telegra.ph${response.data[0].src}`;
    }
    throw new Error('Upload failed');
  } catch (error) {
    throw new Error('Telegraph upload failed');
  }
};

/**
 * Extract URL from text
 */
const extractUrl = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const match = text.match(urlRegex);
  return match ? match[0] : null;
};

/**
 * Extract all URLs from text
 */
const extractAllUrls = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  const matches = text.match(urlRegex);
  return matches || [];
};

/**
 * Random element from array
 */
const random = (array) => {
  if (!Array.isArray(array) || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Check if text is valid URL
 */
const isUrl = (text) => {
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
  return urlRegex.test(text);
};

/**
 * Runtime information from seconds
 */
const runtime = (seconds) => {
  if (!seconds || isNaN(seconds)) seconds = 0;
  seconds = Number(seconds);
  
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor(seconds % (3600 * 24) / 3600);
  const m = Math.floor(seconds % 3600 / 60);
  const s = Math.floor(seconds % 60);
  
  const parts = [];
  if (d > 0) parts.push(`${d}d`);
  if (h > 0) parts.push(`${h}h`);
  if (m > 0) parts.push(`${m}m`);
  if (s > 0) parts.push(`${s}s`);
  
  return parts.join(' ') || '0s';
};

/**
 * Get current timestamp
 */
const timestamp = () => {
  return Math.floor(Date.now() / 1000);
};

/**
 * Format date
 */
const formatDate = (date = new Date(), format = 'DD/MM/YYYY HH:mm:ss') => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * Truncate text
 */
const truncate = (text, length = 50, suffix = '...') => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + suffix;
};

/**
 * Capitalize first letter
 */
const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Export all functions
export {
  downloadMedia,
  downloadMediaWithProgress,
  formatDuration,
  formatSize,
  sleep,
  parseMentions,
  getQuoted,
  getQuotedType,
  uploadFile,
  uploadToTelegraph,
  extractUrl,
  extractAllUrls,
  random,
  isUrl,
  runtime,
  timestamp,
  formatDate,
  truncate,
  capitalize
};