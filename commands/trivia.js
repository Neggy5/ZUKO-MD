const axios = require('axios');

// Store ongoing games and scores
const triviaGames = {};
const playerScores = {};

// Categories for selection
const TRIVIA_CATEGORIES = {
    general: 9,
    books: 10,
    films: 11,
    science: 17,
    history: 23,
    geography: 22
};

async function startTrivia(sock, chatId, category = 'general') {
    try {
        // Check for existing game
        if (triviaGames[chatId]) {
            await sock.sendMessage(chatId, { 
                text: '⚠️ A trivia game is already in progress!',
                buttons: [
                    { buttonId: 'endtrivia', buttonText: { displayText: 'End Current Game' }, type: 1 }
                ]
            });
            return;
        }

        // Validate category
        const categoryId = TRIVIA_CATEGORIES[category.toLowerCase()] || TRIVIA_CATEGORIES.general;

        // Initialize scores if new chat
        if (!playerScores[chatId]) {
            playerScores[chatId] = {};
        }

        // Fetch question
        const response = await axios.get(`https://opentdb.com/api.php?amount=1&category=${categoryId}&type=multiple`);
        const questionData = response.data.results[0];

        // Process and store question
        const options = [...questionData.incorrect_answers, questionData.correct_answer]
            .sort(() => Math.random() - 0.5)
            .map((opt, i) => `${i + 1}. ${decodeHtmlEntities(opt)}`);

        triviaGames[chatId] = {
            question: decodeHtmlEntities(questionData.question),
            correctAnswer: decodeHtmlEntities(questionData.correct_answer),
            options: options,
            category: category,
            startTime: Date.now()
        };

        // Send formatted question
        await sock.sendMessage(chatId, {
            text: `🎲 *Trivia Time!* (${category.toUpperCase()})\n\n` +
                 `❓ ${triviaGames[chatId].question}\n\n` +
                 `${options.join('\n')}\n\n` +
                 `Reply with the number (1-4) of your answer!`,
            footer: 'You have 60 seconds to answer'
        });

        // Set timeout for unanswered questions
        triviaGames[chatId].timeout = setTimeout(async () => {
            if (triviaGames[chatId]) {
                await sock.sendMessage(chatId, {
                    text: `⏰ Time's up! The correct answer was:\n"${triviaGames[chatId].correctAnswer}"\n\n` +
                         `Type .trivia to play again!`
                });
                delete triviaGames[chatId];
            }
        }, 60000);

    } catch (error) {
        console.error('Trivia Error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to start trivia. Please try again later.'
        });
    }
}

async function answerTrivia(sock, chatId, answer, userId) {
    try {
        // Validate game exists
        if (!triviaGames[chatId]) {
            await sock.sendMessage(chatId, { 
                text: 'No active trivia game. Start one with .trivia'
            });
            return;
        }

        // Validate answer format
        const answerNum = parseInt(answer);
        if (isNaN(answerNum) || answerNum < 1 || answerNum > 4) {
            await sock.sendMessage(chatId, {
                text: 'Please answer with a number between 1-4'
            });
            return;
        }

        const game = triviaGames[chatId];
        const selectedAnswer = game.options[answerNum - 1].split('. ')[1];
        const isCorrect = selectedAnswer === game.correctAnswer;

        // Update scores
        const playerName = userId.split('@')[0];
        if (!playerScores[chatId][playerName]) {
            playerScores[chatId][playerName] = 0;
        }

        if (isCorrect) {
            playerScores[chatId][playerName] += 1;
            await sock.sendMessage(chatId, {
                text: `✅ *Correct!* ${playerName} gets a point!\n` +
                     `The answer was: "${game.correctAnswer}"\n\n` +
                     `${getScoreboard(chatId)}\n\n` +
                     `Type .trivia for another question!`,
                mentions: [userId]
            });
        } else {
            await sock.sendMessage(chatId, {
                text: `❌ *Wrong!* ${playerName}, the correct answer was:\n"${game.correctAnswer}"\n\n` +
                     `${getScoreboard(chatId)}\n\n` +
                     `Type .trivia to try again!`,
                mentions: [userId]
            });
        }

        // Clean up
        clearTimeout(game.timeout);
        delete triviaGames[chatId];

    } catch (error) {
        console.error('Answer Error:', error);
        await sock.sendMessage(chatId, {
            text: 'Error processing your answer. Please try again.'
        });
    }
}

async function endTrivia(sock, chatId) {
    if (triviaGames[chatId]) {
        clearTimeout(triviaGames[chatId].timeout);
        delete triviaGames[chatId];
        await sock.sendMessage(chatId, {
            text: 'Trivia game ended! Here are the final scores:\n\n' +
                 `${getScoreboard(chatId)}\n\n` +
                 `Start a new game with .trivia`
        });
    } else {
        await sock.sendMessage(chatId, {
            text: 'No active trivia game to end.'
        });
    }
}

// Helper functions
function decodeHtmlEntities(text) {
    return text.replace(/&[^;]+;/g, entity => {
        const map = {
            '&quot;': '"',
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&nbsp;': ' ',
            '&copy;': '©'
        };
        return map[entity] || entity;
    });
}

function getScoreboard(chatId) {
    if (!playerScores[chatId]) return 'No scores yet.';

    const sortedPlayers = Object.entries(playerScores[chatId])
        .sort((a, b) => b[1] - a[1])
        .map(([name, score], index) => 
            `${['🥇','🥈','🥉'][index] || '▫️'} ${name}: ${score} point${score !== 1 ? 's' : ''}`);

    return '🏆 *Scoreboard* 🏆\n' + sortedPlayers.join('\n');
}

module.exports = {
    startTrivia,
    answerTrivia,
    endTrivia,
    TRIVIA_CATEGORIES
};