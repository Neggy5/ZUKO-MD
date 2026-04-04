/**
 * Klipy GIF Helper - Fetch GIFs from Klipy API (Tenor replacement)
 * Simply change the base URL - everything else works the same!
 */

import axios from 'axios';

// Get your free API key from https://partner.klipy.com
const KLIPY_API_KEY = 'U1Q32c4oP6hwiz1r1tEEGarzlgTjunyOBX14BQTn4QdxGLfYP7alOIev2ADTtnlS'; // Replace with your actual key

export async function getGif(query, limit = 30) {
    try {
        // Klipy uses the exact same API structure as Tenor!
        const url = `https://g.klipy.com/v2/search?q=${encodeURIComponent(query)}&key=${KLIPY_API_KEY}&limit=${limit}`;
        const response = await axios.get(url);
        
        if (response.data && response.data.results && response.data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            return response.data.results[randomIndex].media_formats.gif.url;
        }
        return null;
    } catch (error) {
        console.error('Klipy API error:', error.message);
        return null;
    }
}

export async function getSticker(query, limit = 30) {
    try {
        const url = `https://g.klipy.com/v2/search?q=${encodeURIComponent(query)}&key=${KLIPY_API_KEY}&limit=${limit}&arange=sticker`;
        const response = await axios.get(url);
        
        if (response.data && response.data.results && response.data.results.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.data.results.length);
            return response.data.results[randomIndex].media_formats.tinygif.url;
        }
        return null;
    } catch (error) {
        console.error('Klipy API error:', error.message);
        return null;
    }
}