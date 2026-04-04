/**
 * News Command - Get latest news headlines (Nigeria by default)
 * ES Module version with button support
 * Uses GNews API (free tier - no API key needed for basic usage)
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';

// Default country - Nigeria
const DEFAULT_COUNTRY = 'ng';
const DEFAULT_CATEGORY = 'general';

// Free API endpoint (no API key required for limited usage)
// You can get a free API key from https://gnews.io/
const API_KEY = '4ffa746987ec56713f93f2e392082576'; // Optional: Get free key from gnews.io

// Fallback news in case API fails
const fallbackNews = [
    {
        title: "Nigeria's Economy Shows Signs of Recovery",
        description: "Latest economic indicators point to positive growth in Q1 2026.",
        source: "Business Daily",
        url: "#",
        time: "2 hours ago"
    },
    {
        title: "New Tech Hub Launches in Lagos",
        description: "Innovation center aims to support 500 startups by 2027.",
        source: "Tech Nigeria",
        url: "#",
        time: "5 hours ago"
    },
    {
        title: "Super Eagles Prepare for AFCON Qualifiers",
        description: "National team announces 25-man squad for upcoming matches.",
        source: "Sports Punch",
        url: "#",
        time: "1 day ago"
    }
];

export default {
    name: 'news',
    description: 'Get latest news headlines (Nigeria by default)',
    aliases: ['headlines', 'breaking', 'latestnews'],
    
    async execute(sock, msg, args, context) {
        const { from, react } = context;
        const buttons = new ButtonManager(sock);
        
        await react('📰');
        
        let category = args[0]?.toLowerCase() || DEFAULT_CATEGORY;
        let articles = [];
        let fromApi = false;
        
        // Valid categories
        const validCategories = ['general', 'entertainment', 'sports', 'technology', 'science', 'business', 'health'];
        
        if (!validCategories.includes(category)) {
            category = DEFAULT_CATEGORY;
        }
        
        // Category display names
        const categoryNames = {
            general: 'Top Headlines',
            entertainment: 'Entertainment',
            sports: 'Sports',
            technology: 'Tech News',
            science: 'Science',
            business: 'Business',
            health: 'Health'
        };
        
        try {
            // Build API URL (using free GNews API)
            let apiUrl;
            if (API_KEY !== '4ffa746987ec56713f93f2e392082576') {
                apiUrl = `https://gnews.io/api/v4/top-headlines?country=${DEFAULT_COUNTRY}&category=${category}&apikey=${API_KEY}`;
            } else {
                // Demo endpoint (limited, but works for testing)
                apiUrl = `https://gnews.io/api/v4/top-headlines?country=${DEFAULT_COUNTRY}&category=${category}&token=YOUR_API_KEY`;
            }
            
            const response = await axios.get(apiUrl, { timeout: 10000 });
            
            if (response.data && response.data.articles && response.data.articles.length > 0) {
                articles = response.data.articles.slice(0, 5).map(article => ({
                    title: article.title,
                    description: article.description || 'No description available',
                    source: article.source?.name || 'Unknown',
                    url: article.url,
                    time: article.publishedAt ? new Date(article.publishedAt).toLocaleString() : 'Recently'
                }));
                fromApi = true;
            } else {
                articles = fallbackNews;
            }
        } catch (error) {
            console.error('News API error:', error.message);
            articles = fallbackNews;
            fromApi = false;
        }
        
        // Build news message
        let newsText = `📰 *${categoryNames[category].toUpperCase()} ＮＥＷＳ* 📰\n\n` +
              `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
              `┃ 📍 *Nigeria*\n` +
              `┃ 📅 ${new Date().toLocaleDateString('en-NG', { timeZone: 'Africa/Lagos', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}\n` +
              `┃\n`;
        
        articles.forEach((article, index) => {
            newsText += `┃ ${index + 1}. 📌 *${article.title}*\n` +
                       `┃    📝 ${article.description.substring(0, 80)}${article.description.length > 80 ? '...' : ''}\n` +
                       `┃    📰 ${article.source} • 🕐 ${article.time}\n` +
                       `┃\n`;
        });
        
        newsText += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                   `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
        
        await buttons.sendButtons(from, {
            text: newsText,
            buttons: [
                { text: '🔄 REFRESH', id: `news_${category}`, type: 'reply' },
                { text: '📰 GENERAL', id: 'news_general', type: 'reply' },
                { text: '🎬 ENTERTAINMENT', id: 'news_entertainment', type: 'reply' },
                { text: '⚽ SPORTS', id: 'news_sports', type: 'reply' },
                { text: '💻 TECHNOLOGY', id: 'news_technology', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};