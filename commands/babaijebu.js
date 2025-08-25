const fs = require('fs');
const path = require('path');

// Baba Ijebu game types and their formats
const BABA_IJEBU_GAMES = {
    'baba-ijebu': { name: 'Baba Ijebu', numbers: 5, min: 1, max: 90 },
    'premier': { name: 'Premier Lotto', numbers: 5, min: 1, max: 90 },
    'gold': { name: 'Gold Lotto', numbers: 5, min: 1, max: 90 },
    'lucky': { name: 'Lucky G', numbers: 5, min: 1, max: 90 },
    'vip': { name: 'VIP Lotto', numbers: 5, min: 1, max: 90 },
    'super': { name: 'Super Lotto', numbers: 5, min: 1, max: 90 },
    'midweek': { name: 'Midweek Lotto', numbers: 5, min: 1, max: 90 },
    'weekend': { name: 'Weekend Lotto', numbers: 5, min: 1, max: 90 },
    'daily': { name: 'Daily Lotto', numbers: 5, min: 1, max: 90 },
    'special': { name: 'Special Lotto', numbers: 5, min: 1, max: 90 }
};

// Function to generate unique random numbers
function generateNumbers(count, min, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

// Function to format numbers with leading zeros
function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

async function babaIjebuCommand(sock, chatId, message, args) {
    try {
        // Determine which game to generate numbers for
        let gameType = 'baba-ijebu'; // Default game
        
        if (args.length > 0) {
            const requestedGame = args[0].toLowerCase();
            if (BABA_IJEBU_GAMES[requestedGame]) {
                gameType = requestedGame;
            }
        }
        
        const game = BABA_IJEBU_GAMES[gameType];
        
        // Generate prediction numbers
        const prediction = generateNumbers(game.numbers, game.min, game.max);
        const formattedPrediction = prediction.map(formatNumber).join('-');
        
        // Get current date and time
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Create prediction message
        const predictionMessage = `
╔══════════════════════════════╗
║       🎰 *BABA IJEBU* 🎰       ║
║        PREDICTION RESULTS     ║
╠══════════════════════════════╣
║ 📅 *Date:* ${dateStr}
║ 🎯 *Game:* ${game.name}
║ 🔢 *Numbers:* ${formattedPrediction}
╠══════════════════════════════╣
║ 💡 *Tip:* This is for entertainment
║     purposes only. Play responsibly!
╚══════════════════════════════╝
        `.trim();

        // Send the prediction
        await sock.sendMessage(chatId, {
            text: predictionMessage,
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

        // Send additional games list if requested or for help
        if (args[0] === 'help' || args[0] === 'list') {
            const gamesList = Object.entries(BABA_IJEBU_GAMES)
                .map(([key, game]) => `• .baba ${key} - ${game.name}`)
                .join('\n');
            
            await sock.sendMessage(chatId, {
                text: `📋 *Available Baba Ijebu Games:*\n\n${gamesList}\n\nExample: .baba premier`,
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

    } catch (error) {
        console.error('Error in babaijebu command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Error generating prediction. Please try again.',
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

module.exports = babaIjebuCommand;