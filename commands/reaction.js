const axios = require('axios');
const { fetchBuffer } = require('../lib/myfunc');

// Reaction types with their API endpoints or local files
const REACTION_TYPES = {
    // Positive reactions
    'pat': 'https://api.waifu.pics/sfw/pat',
    'hug': 'https://api.waifu.pics/sfw/hug',
    'cuddle': 'https://api.waifu.pics/sfw/cuddle',
    'kiss': 'https://api.waifu.pics/sfw/kiss',
    'lick': 'https://api.waifu.pics/sfw/lick',
    'poke': 'https://api.waifu.pics/sfw/poke',
    'smug': 'https://api.waifu.pics/sfw/smug',
    'highfive': 'https://api.waifu.pics/sfw/highfive',
    'handhold': 'https://api.waifu.pics/sfw/handhold',
    'nom': 'https://api.waifu.pics/sfw/nom',
    'bite': 'https://api.waifu.pics/sfw/bite',
    'wave': 'https://api.waifu.pics/sfw/wave',
    'blush': 'https://api.waifu.pics/sfw/blush',
    'happy': 'https://api.waifu.pics/sfw/smile',
    
    // Neutral/playful reactions
    'bonk': 'https://api.waifu.pics/sfw/bonk',
    'yeet': 'https://api.waifu.pics/sfw/yeet',
    'kick': 'https://api.waifu.pics/sfw/kick',
    'slap': 'https://api.waifu.pics/sfw/slap',
    'kill': 'https://api.nekos.life/v2/img/slap', // Alternative API
    'wink': 'https://api.waifu.pics/sfw/wink',
    'dance': 'https://api.waifu.pics/sfw/dance',
    
    // Negative reactions
    'cry': 'https://api.waifu.pics/sfw/cry',
    'facepalm': 'https://api.waifu.pics/sfw/facepalm',
    'pout': 'https://api.waifu.pics/sfw/pout',
    'stare': 'https://api.waifu.pics/sfw/stare',
    'thumbsup': 'https://api.waifu.pics/sfw/thumbsup',
    'thumbsdown': 'https://api.waifu.pics/sfw/thumbsdown'
};

// Reaction messages based on type
const REACTION_MESSAGES = {
    'pat': '{sender} pats {target}!',
    'hug': '{sender} hugs {target}! 🤗',
    'cuddle': '{sender} cuddles with {target}! 💕',
    'kiss': '{sender} kisses {target}! 💋',
    'lick': '{sender} licks {target}! 👅',
    'poke': '{sender} pokes {target}! 👉',
    'smug': '{sender} looks smug! 😏',
    'highfive': '{sender} gives {target} a high five! ✋',
    'handhold': '{sender} holds hands with {target}! 🤝',
    'nom': '{sender} noms on {target}! 🍖',
    'bite': '{sender} bites {target}! 🦷',
    'wave': '{sender} waves at {target}! 👋',
    'blush': '{sender} blushes! 😊',
    'happy': '{sender} looks happy! 😄',
    'bonk': '{sender} bonks {target}! 🔨',
    'yeet': '{sender} yeets {target}! 🚀',
    'kick': '{sender} kicks {target}! 👟',
    'slap': '{sender} slaps {target}! 👋',
    'kill': '{sender} attacks {target}! ⚔️',
    'wink': '{sender} winks at {target}! 😉',
    'dance': '{sender} dances with {target}! 💃',
    'cry': '{sender} cries! 😢',
    'facepalm': '{sender} facepalms! 🤦',
    'pout': '{sender} pouts! 😤',
    'stare': '{sender} stares at {target}! 👀',
    'thumbsup': '{sender} gives a thumbs up! 👍',
    'thumbsdown': '{sender} gives a thumbs down! 👎'
};

async function reactionCommand(sock, chatId, message, reactionType) {
    try {
        const sender = message.key.participant || message.key.remoteJid;
        const senderName = message.pushName || 'Someone';
        
        // Check if reaction type is valid
        if (!REACTION_TYPES[reactionType]) {
            // Show available reactions
            const availableReactions = Object.keys(REACTION_TYPES).join(', ');
            await sock.sendMessage(chatId, {
                text: `❌ Invalid reaction type!\n\nAvailable reactions: ${availableReactions}\n\nUsage: .reaction <type> [@user]`,
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
        
        // Get mentioned user or default to everyone
        let targetUser = null;
        let targetName = 'everyone';
        const mentionedJid = message.message?.extendedTextMessage?.contextInfo?.mentionedJid;
        
        if (mentionedJid && mentionedJid.length > 0) {
            targetUser = mentionedJid[0];
            // Extract username from JID
            targetName = targetUser.split('@')[0];
        }
        
        // Get reaction message
        const reactionMessage = REACTION_MESSAGES[reactionType]
            .replace('{sender}', senderName)
            .replace('{target}', targetName);
        
        // Fetch reaction GIF/image
        let reactionMedia;
        try {
            if (REACTION_TYPES[reactionType].startsWith('http')) {
                // Fetch from API
                const response = await axios.get(REACTION_TYPES[reactionType]);
                const mediaUrl = response.data.url || response.data.link;
                reactionMedia = await fetchBuffer(mediaUrl);
            } else {
                // Load from local file (if implemented later)
                reactionMedia = await fetchBuffer(REACTION_TYPES[reactionType]);
            }
        } catch (mediaError) {
            console.error('Error fetching reaction media:', mediaError);
            // Fallback to text only
            await sock.sendMessage(chatId, {
                text: reactionMessage,
                mentions: targetUser ? [targetUser] : [],
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
        
        // Send reaction with media
        await sock.sendMessage(chatId, {
            [reactionMedia.mimetype?.includes('gif') ? 'video' : 'image']: reactionMedia,
            caption: reactionMessage,
            mentions: targetUser ? [targetUser] : [],
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
        console.error('Error in reaction command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to process reaction. Please try again later.',
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

// Function to show all available reactions
async function showReactionHelp(sock, chatId, message) {
    const reactionList = Object.keys(REACTION_TYPES)
        .map((reaction, index) => `${index + 1}. ${reaction}`)
        .join('\n');
    
    await sock.sendMessage(chatId, {
        text: `🎭 *REACTION COMMANDS*\n\nAvailable reactions:\n${reactionList}\n\n*Usage:*\n.reaction <type> [@user]\n*Example:*\n.reaction hug @user\n.reaction slap\n.reaction dance`,
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
    reactionCommand,
    showReactionHelp,
    REACTION_TYPES
};