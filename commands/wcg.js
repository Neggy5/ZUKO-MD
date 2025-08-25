const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const axios = require('axios');

const WCG_DATA_PATH = path.join(__dirname, '../data/wcg_leaderboard.json');
const ACTIVE_GAMES_PATH = path.join(__dirname, '../data/active_games.json');
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

// Game configurations
const GAME_CONFIG = {
    maxPlayers: 4,
    questionTime: 30, // seconds
    totalRounds: 5,
    categories: {
        trivia: {
            name: "Trivia Duel",
            api: "https://opentdb.com/api.php?amount=1&type=multiple",
            difficulties: ['easy', 'medium', 'hard']
        },
        math: {
            name: "Math Showdown",
            difficulties: ['easy', 'hard', 'extreme']
        }
    }
};

// Initialize data files
async function initDataFiles() {
    if (!fs.existsSync(WCG_DATA_PATH)) {
        await writeFile(WCG_DATA_PATH, JSON.stringify({
            leaderboard: {},
            stats: { totalMatches: 0 }
        }, null, 2));
    }
    if (!fs.existsSync(ACTIVE_GAMES_PATH)) {
        await writeFile(ACTIVE_GAMES_PATH, JSON.stringify({ activeGames: [] }, null, 2));
    }
}

// Main WCG command handler
async function wcgCommand(sock, chatId, message, args) {
    try {
        await initDataFiles();
        const [action, ...params] = args;

        switch (action?.toLowerCase()) {
            case 'create':
                return await createGame(sock, chatId, message, params);
            case 'join':
                return await joinGame(sock, chatId, message, params);
            case 'start':
                return await startGame(sock, chatId, message);
            case 'leave':
                return await leaveGame(sock, chatId, message);
            case 'list':
                return await listGames(sock, chatId);
            case 'leaderboard':
                return await showLeaderboard(sock, chatId);
            default:
                return showHelp(sock, chatId, message);
        }
    } catch (error) {
        console.error('WCG Error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ An error occurred. Please try again later.'
        }, { quoted: message });
    }
}

// Helper function to check if a message is an answer to an active game
function isActiveGameAnswer(chatId) {
    const gamesData = JSON.parse(fs.readFileSync(ACTIVE_GAMES_PATH));
    return gamesData.activeGames.some(game => 
        game.chatId === chatId && game.status === 'in-progress');
}

// Show help menu
async function showHelp(sock, chatId, message) {
    const helpText = `🎮 *World Challenge Game Commands* 🎮

🔹 *.wcg create [category] [difficulty]* - Create new game
🔹 *.wcg join [gameID]* - Join existing game
🔹 *.wcg start* - Start game (creator only)
🔹 *.wcg leave* - Leave current game
🔹 *.wcg list* - List available games
🔹 *.wcg leaderboard* - Show leaderboard

📌 *Categories*: ${Object.keys(GAME_CONFIG.categories).join(', ')}
📌 *Reply with numbers* (1-4) to answer questions`;

    await sock.sendMessage(chatId, { 
        text: helpText 
    }, { quoted: message });
}

// Create a new multiplayer game
async function createGame(sock, chatId, message, [category, difficulty]) {
    const playerId = message.key.participant || message.key.remoteJid;
    const gamesData = JSON.parse(await readFile(ACTIVE_GAMES_PATH));

    // Check if player already in a game
    if (gamesData.activeGames.some(game => 
        game.players.some(p => p.id === playerId))) {
        return await sock.sendMessage(chatId, {
            text: '⚠️ You are already in a game! Use .wcg leave first.'
        }, { quoted: message });
    }

    // Validate category and difficulty
    if (!category || !GAME_CONFIG.categories[category]) {
        return await sock.sendMessage(chatId, {
            text: `❌ Invalid category. Available: ${Object.keys(GAME_CONFIG.categories).join(', ')}`
        }, { quoted: message });
    }

    const validDifficulties = GAME_CONFIG.categories[category].difficulties;
    if (!difficulty || !validDifficulties.includes(difficulty)) {
        return await sock.sendMessage(chatId, {
            text: `❌ Invalid difficulty. Available: ${validDifficulties.join(', ')}`
        }, { quoted: message });
    }

    // Create new game
    const gameId = `wcg-${Date.now()}`;
    const newGame = {
        id: gameId,
        creator: playerId,
        category,
        difficulty,
        players: [{ 
            id: playerId, 
            name: message.pushName || playerId.split('@')[0],
            score: 0,
            answered: false
        }],
        status: 'waiting',
        chatId,
        currentRound: 0
    };
    
    gamesData.activeGames.push(newGame);
    await writeFile(ACTIVE_GAMES_PATH, JSON.stringify(gamesData, null, 2));

    await sock.sendMessage(chatId, {
        text: `🎮 *New ${GAME_CONFIG.categories[category].name} Game Created!*\n\n` +
              `Difficulty: ${difficulty.toUpperCase()}\n` +
              `Players: 1/${GAME_CONFIG.maxPlayers}\n\n` +
              `Others can join using:\n.wcg join ${gameId}\n\n` +
              `Start the game with:\n.wcg start`
    }, { quoted: message });
}

// Join an existing game
async function joinGame(sock, chatId, message, [gameId]) {
    const playerId = message.key.participant || message.key.remoteJid;
    const gamesData = JSON.parse(await readFile(ACTIVE_GAMES_PATH));

    const gameIndex = gamesData.activeGames.findIndex(game => game.id === gameId);
    if (gameIndex === -1) {
        return await sock.sendMessage(chatId, {
            text: '❌ Game not found. Use .wcg list to see available games.'
        }, { quoted: message });
    }

    const game = gamesData.activeGames[gameIndex];

    // Check if already in game
    if (game.players.some(p => p.id === playerId)) {
        return await sock.sendMessage(chatId, {
            text: '⚠️ You are already in this game!'
        }, { quoted: message });
    }

    // Check if game is full
    if (game.players.length >= GAME_CONFIG.maxPlayers) {
        return await sock.sendMessage(chatId, {
            text: '❌ This game is already full.'
        }, { quoted: message });
    }

    // Add player to game
    game.players.push({ 
        id: playerId,
        name: message.pushName || playerId.split('@')[0],
        score: 0,
        answered: false
    });
    gamesData.activeGames[gameIndex] = game;
    await writeFile(ACTIVE_GAMES_PATH, JSON.stringify(gamesData, null, 2));

    // Notify all players
    const playerName = message.pushName || 'Player';
    await sock.sendMessage(game.chatId, {
        text: `🎉 ${playerName} joined the game!\n\nCurrent players: ${game.players.length}/${GAME_CONFIG.maxPlayers}`,
        mentions: game.players.map(p => p.id)
    });

    if (game.players.length === GAME_CONFIG.maxPlayers) {
        await sock.sendMessage(game.chatId, {
            text: '✅ Game is now full! The creator can start the game with .wcg start'
        });
    }
}

// List available games
async function listGames(sock, chatId) {
    const gamesData = JSON.parse(await readFile(ACTIVE_GAMES_PATH));
    const availableGames = gamesData.activeGames.filter(game => 
        game.status === 'waiting' && game.players.length < GAME_CONFIG.maxPlayers);

    if (availableGames.length === 0) {
        return await sock.sendMessage(chatId, {
            text: 'ℹ️ No available games at the moment. Create one with .wcg create!'
        });
    }

    let listText = '🎲 *Available Games*\n\n';
    availableGames.forEach((game, index) => {
        listText += `${index + 1}. ${GAME_CONFIG.categories[game.category].name} (${game.difficulty.toUpperCase()})\n`;
        listText += `   👥 Players: ${game.players.length}/${GAME_CONFIG.maxPlayers}\n`;
        listText += `   🆔 Join with: .wcg join ${game.id}\n\n`;
    });

    await sock.sendMessage(chatId, { text: listText });
}

// Leave current game
async function leaveGame(sock, chatId, message) {
    const playerId = message.key.participant || message.key.remoteJid;
    const gamesData = JSON.parse(await readFile(ACTIVE_GAMES_PATH));

    const gameIndex = gamesData.activeGames.findIndex(game => 
        game.players.some(p => p.id === playerId));

    if (gameIndex === -1) {
        return await sock.sendMessage(chatId, {
            text: '❌ You are not in any active game.'
        }, { quoted: message });
    }

    const game = gamesData.activeGames[gameIndex];
    const playerName = message.pushName || 'Player';

    // Remove player from game
    game.players = game.players.filter(p => p.id !== playerId);

    // If no players left or creator left, end game
    if (game.players.length === 0 || game.creator === playerId) {
        gamesData.activeGames.splice(gameIndex, 1);
        await sock.sendMessage(chatId, {
            text: `🏁 Game ended because ${playerName} left.`
        });
    } else {
        gamesData.activeGames[gameIndex] = game;
        await sock.sendMessage(game.chatId, {
            text: `🚪 ${playerName} left the game. ${game.players.length} players remaining.`
        });
    }
    
    await writeFile(ACTIVE_GAMES_PATH, JSON.stringify(gamesData, null, 2));
}

// Start a game (creator only)
async function startGame(sock, chatId, message) {
    const playerId = message.key.participant || message.key.remoteJid;
    const gamesData = JSON.parse(await readFile(ACTIVE_GAMES_PATH));

    const gameIndex = gamesData.activeGames.findIndex(game => 
        game.chatId === chatId && game.creator === playerId);

    if (gameIndex === -1) {
        return await sock.sendMessage(chatId, {
            text: '❌ You are not the creator of any active game here.'
        }, { quoted: message });
    }

    const game = gamesData.activeGames[gameIndex];

    // Need at least 2 players
    if (game.players.length < 2) {
        return await sock.sendMessage(chatId, {
            text: '❌ You need at least 2 players to start. Wait for others to join!'
        }, { quoted: message });
    }

    // Start the game
    game.status = 'in-progress';
    game.currentRound = 1;
    gamesData.activeGames[gameIndex] = game;
    await writeFile(ACTIVE_GAMES_PATH, JSON.stringify(gamesData, null, 2));

    // Notify players
    await sock.sendMessage(chatId, {
        text: `🎉 Game starting! ${GAME_CONFIG.categories[game.category].name} - ${game.difficulty.toUpperCase()} difficulty\n\n` +
              `Players:\n${game.players.map(p => `• ${p.name}`).join('\n')}\n\n` +
              `First question coming up...`
    });

    // Begin game rounds
    await runGameRound(sock, game);
}

// Get trivia question from API
async function getTriviaQuestion(difficulty) {
    try {
        const response = await axios.get(`${GAME_CONFIG.categories.trivia.api}&difficulty=${difficulty}`);
        const questionData = response.data.results[0];
        
        // Format options by combining incorrect and correct answers
        const options = [...questionData.incorrect_answers, questionData.correct_answer];
        // Shuffle options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        return {
            question: questionData.question,
            correctAnswer: questionData.correct_answer,
            options: options,
            category: questionData.category
        };
    } catch (error) {
        console.error('Error fetching trivia question:', error);
        // Fallback question
        return {
            question: 'What is the capital of France?',
            correctAnswer: 'Paris',
            options: ['London', 'Berlin', 'Madrid', 'Paris'],
            category: 'General Knowledge'
        };
    }
}

// Generate math problem
function generateMathProblem(difficulty) {
    let num1, num2, operator, answer;
    
    switch(difficulty) {
        case 'easy':
            num1 = Math.floor(Math.random() * 10) + 1;
            num2 = Math.floor(Math.random() * 10) + 1;
            operator = ['+', '-'][Math.floor(Math.random() * 2)];
            answer = eval(`${num1}${operator}${num2}`);
            break;
        case 'hard':
            num1 = Math.floor(Math.random() * 50) + 1;
            num2 = Math.floor(Math.random() * 50) + 1;
            operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
            answer = eval(`${num1}${operator}${num2}`);
            break;
        case 'extreme':
            num1 = Math.floor(Math.random() * 100) + 1;
            num2 = Math.floor(Math.random() * 100) + 1;
            operator = ['+', '-', '*', '/'][Math.floor(Math.random() * 4)];
            answer = eval(`${num1}${operator}${num2}`);
            // Round to 2 decimal places for division
            if (operator === '/') answer = Math.round(answer * 100) / 100;
            break;
    }

    // Generate wrong options
    const options = [];
    while (options.length < 3) {
        const wrongAnswer = answer + (Math.floor(Math.random() * 10) - 5);
        if (wrongAnswer !== answer && !options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }
    options.push(answer);
    
    // Shuffle options
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }

    return {
        question: `What is ${num1} ${operator} ${num2}?`,
        correctAnswer: answer.toString(),
        options: options.map(o => o.toString()),
        category: 'Mathematics'
    };
}

// Main game loop
async function runGameRound(sock, game) {
    // Reset answered status for all players
    game.players.forEach(player => player.answered = false);

    // Get question based on category
    let question;
    switch (game.category) {
        case 'trivia':
            question = await getTriviaQuestion(game.difficulty);
            break;
        case 'math':
            question = generateMathProblem(game.difficulty);
            break;
    }

    // Store current question in game state
    const gamesData = JSON.parse(await readFile(ACTIVE_GAMES_PATH));
    const gameIndex = gamesData.activeGames.findIndex(g => g.id === game.id);
    gamesData.activeGames[gameIndex].currentQuestion = {
        text: question.question,
        answer: question.correctAnswer,
        options: question.options,
        endTime: Date.now() + (GAME_CONFIG.questionTime * 1000)
    };
    await writeFile(ACTIVE_GAMES_PATH, JSON.stringify(gamesData, null, 2));

    // Send question to all players
    await sock.sendMessage(game.chatId, {
        text: formatQuestion(question, game)
    });

    // Set timeout for answer
    setTimeout(async () => {
        const updatedGames = JSON.parse(await readFile(ACTIVE_GAMES_PATH));
        const updatedGame = updatedGames.activeGames.find(g => g.id === game.id);
        
        if (!updatedGame) return;

        // Reveal answer
        await sock.sendMessage(game.chatId, {
            text: `⏰ Time's up! The correct answer was: ${question.correctAnswer}\n\n` +
                  `Scores:\n${formatScores(updatedGame.players)}`
        });

        // Continue to next round or end game
        if (updatedGame.currentRound < GAME_CONFIG.totalRounds) {
            updatedGame.currentRound++;
            updatedGames.activeGames = updatedGames.activeGames.map(g => 
                g.id === game.id ? updatedGame : g);
            await writeFile(ACTIVE_GAMES_PATH, JSON.stringify(updatedGames, null, 2));
            
            // Delay before next round
            await new Promise(resolve => setTimeout(resolve, 3000));
            await runGameRound(sock, updatedGame);
        } else {
            await endGame(sock, updatedGame);
        }
    }, GAME_CONFIG.questionTime * 1000);
}

      // Format question for display
function formatQuestion(question, game) {
    let formattedText = `🏆 *${GAME_CONFIG.categories[game.category].name}*\n`;
    formattedText += `🔹 Round ${game.currentRound} of ${GAME_CONFIG.totalRounds}\n`;
    formattedText += `🔹 Difficulty: ${game.difficulty.toUpperCase()}\n\n`;
    formattedText += `❓ ${question.question}\n\n`;
    
    if (question.options) {
        question.options.forEach((opt, i) => {
            formattedText += `${i + 1}. ${opt}\n`;
        });
    }
    
    formattedText += `\nYou have ${GAME_CONFIG.questionTime} seconds to answer!`;
    return formattedText;
}

// Format player scores
function formatScores(players) {
    // Sort by score (descending)
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    
    return sortedPlayers.map((p, index) => {
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '▫️';
        return `${medal} ${p.name}: ${p.score} points`;
    }).join('\n');
}

// Handle player answers
async function handleAnswer(sock, chatId, message, answer) {
    try {
        const playerId = message.key.participant || message.key.remoteJid;
        const gamesData = JSON.parse(await readFile(ACTIVE_GAMES_PATH));
        
        // Find active game in this chat
        const gameIndex = gamesData.activeGames.findIndex(game => 
            game.chatId === chatId && game.status === 'in-progress');
        
        if (gameIndex === -1) {
            return await sock.sendMessage(chatId, {
                text: '❌ No active game in this chat'
            }, { quoted: message });
        }

        const game = gamesData.activeGames[gameIndex];
        
        // Check if player is in this game
        const playerIndex = game.players.findIndex(p => p.id === playerId);
        if (playerIndex === -1) {
            return await sock.sendMessage(chatId, {
                text: '❌ You are not part of this game'
            }, { quoted: message });
        }

        // Check if there's an active question
        if (!game.currentQuestion || Date.now() > game.currentQuestion.endTime) {
            return await sock.sendMessage(chatId, {
                text: '⏳ No active question or time has expired'
            }, { quoted: message });
        }

        // Check if already answered
        if (game.players[playerIndex].answered) {
            return await sock.sendMessage(chatId, {
                text: '⚠️ You already answered this question'
            }, { quoted: message });
        }

        // Validate answer format
        const answerNum = parseInt(answer);
        if (isNaN(answerNum)) {
            return await sock.sendMessage(chatId, {
                text: '❌ Please answer with a number'
            }, { quoted: message });
        }

        if (answerNum < 1 || answerNum > game.currentQuestion.options.length) {
            return await sock.sendMessage(chatId, {
                text: `❌ Please answer with a number between 1-${game.currentQuestion.options.length}`
            }, { quoted: message });
        }

        // Check if correct
        const selectedOption = game.currentQuestion.options[answerNum - 1];
        const isCorrect = selectedOption === game.currentQuestion.answer;
        
        // Update player status
        game.players[playerIndex].answered = true;
        if (isCorrect) {
            game.players[playerIndex].score += getPointsForDifficulty(game.difficulty);
            await sock.sendMessage(chatId, {
                text: '✅ Correct answer! Points added.'
            }, { quoted: message });
        } else {
            await sock.sendMessage(chatId, {
                text: '❌ Incorrect answer!'
            }, { quoted: message });
        }

        // Update game data
        gamesData.activeGames[gameIndex] = game;
        await writeFile(ACTIVE_GAMES_PATH, JSON.stringify(gamesData, null, 2));

        // Check if all players answered
        if (game.players.every(p => p.answered)) {
            await sock.sendMessage(chatId, {
                text: `🏆 All players answered! The correct answer was: ${game.currentQuestion.answer}\n\n` +
                      `Current scores:\n${formatScores(game.players)}`
            });
        }

    } catch (error) {
        console.error('Error handling answer:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Error processing your answer'
        }, { quoted: message });
    }
}

// Calculate points based on difficulty
function getPointsForDifficulty(difficulty) {
    const pointsMap = {
        easy: 10,
        medium: 20,
        hard: 30,
        extreme: 50
    };
    return pointsMap[difficulty] || 10;
}

// End game and update leaderboard
async function endGame(sock, game) {
    try {
        // Update leaderboard
        const leaderboardData = JSON.parse(await readFile(WCG_DATA_PATH));
        
        game.players.forEach(player => {
            if (!leaderboardData.leaderboard[player.id]) {
                leaderboardData.leaderboard[player.id] = {
                    name: player.name,
                    wins: 0,
                    points: 0
                };
            }
            leaderboardData.leaderboard[player.id].points += player.score;
        });
        
        // Award win to highest scorer
        const winner = [...game.players].sort((a, b) => b.score - a.score)[0];
        leaderboardData.leaderboard[winner.id].wins++;
        leaderboardData.stats.totalMatches++;
        
        await writeFile(WCG_DATA_PATH, JSON.stringify(leaderboardData, null, 2));
        
        // Remove game from active games
        const gamesData = JSON.parse(await readFile(ACTIVE_GAMES_PATH));
        const updatedGames = gamesData.activeGames.filter(g => g.id !== game.id);
        await writeFile(ACTIVE_GAMES_PATH, JSON.stringify({ activeGames: updatedGames }, null, 2));
        
        // Announce winner
        await sock.sendMessage(game.chatId, {
            text: `🏁 *Game Over!* 🏁\n\n` +
                  `🎉 Winner: ${winner.name} with ${winner.score} points!\n\n` +
                  `Final Scores:\n${formatScores(game.players)}\n\n` +
                  `Use .wcg leaderboard to see overall standings`
        });
        
    } catch (error) {
        console.error('Error ending game:', error);
        await sock.sendMessage(game.chatId, {
            text: '❌ Error finalizing game results'
        });
    }
}
      // Show leaderboard
async function showLeaderboard(sock, chatId) {
    try {
        const leaderboardData = JSON.parse(await readFile(WCG_DATA_PATH));
        const sortedPlayers = Object.entries(leaderboardData.leaderboard)
            .sort((a, b) => b[1].points - a[1].points)
            .slice(0, 10); // Top 10
        
        if (sortedPlayers.length === 0) {
            return await sock.sendMessage(chatId, {
                text: 'ℹ️ No leaderboard data yet. Play some games first!'
            });
        }
        
        let leaderboardText = '🏆 *Global Leaderboard* 🏆\n\n';
        sortedPlayers.forEach(([id, player], index) => {
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '▫️';
            leaderboardText += `${medal} ${player.name}: ${player.points} points (${player.wins} wins)\n`;
        });
        
        leaderboardText += `\nTotal matches played: ${leaderboardData.stats.totalMatches}`;
        
        await sock.sendMessage(chatId, { text: leaderboardText });
        
    } catch (error) {
        console.error('Error showing leaderboard:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Error loading leaderboard'
        });
    }
}

module.exports = {
    wcgCommand,
    handleAnswer
};