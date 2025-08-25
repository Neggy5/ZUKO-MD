const TicTacToe = require('../lib/tictactoe');
const fs = require('fs');
const path = require('path');

// Ensure data directory exists
const statsDir = path.join(__dirname, '../data');
if (!fs.existsSync(statsDir)) {
    fs.mkdirSync(statsDir, { recursive: true });
}

// Store games globally with enhanced structure
const games = {
    tictactoe: new Map(),
    lastActivity: new Map(),
    playerStats: loadPlayerStats() // Load player statistics
};

// Game timeout (30 minutes)
const GAME_TIMEOUT = 30 * 60 * 1000;

// Load player statistics
function loadPlayerStats() {
    try {
        const statsPath = path.join(statsDir, 'tictactoe_stats.json');
        if (fs.existsSync(statsPath)) {
            return JSON.parse(fs.readFileSync(statsPath, 'utf8'));
        }
    } catch (error) {
        console.error('Error loading TicTacToe stats:', error);
    }
    return {};
}

// Save player statistics
function savePlayerStats() {
    try {
        const statsPath = path.join(statsDir, 'tictactoe_stats.json');
        fs.writeFileSync(statsPath, JSON.stringify(games.playerStats, null, 2));
    } catch (error) {
        console.error('Error saving TicTacToe stats:', error);
    }
}

// Update player statistics
function updatePlayerStats(playerId, result) {
    const playerJid = playerId.split('@')[0];
    if (!games.playerStats[playerJid]) {
        games.playerStats[playerJid] = { wins: 0, losses: 0, draws: 0, games: 0 };
    }
    
    games.playerStats[playerJid].games++;
    
    if (result === 'win') {
        games.playerStats[playerJid].wins++;
    } else if (result === 'loss') {
        games.playerStats[playerJid].losses++;
    } else if (result === 'draw') {
        games.playerStats[playerJid].draws++;
    }
    
    savePlayerStats();
}

// Cleanup inactive games
setInterval(() => {
    const now = Date.now();
    for (const [roomId, timestamp] of games.lastActivity) {
        if (now - timestamp > GAME_TIMEOUT) {
            const room = games.tictactoe.get(roomId);
            if (room && room.state === 'PLAYING') {
                // Notify players about timeout
                const timeoutMessage = `⏰ *Game Timed Out*\n\nGame room "${roomId}" has been closed due to inactivity.`;
                if (room.x) {
                    sock.sendMessage(room.x, { text: timeoutMessage });
                }
                if (room.o && room.x !== room.o) {
                    sock.sendMessage(room.o, { text: timeoutMessage });
                }
            }
            games.tictactoe.delete(roomId);
            games.lastActivity.delete(roomId);
        }
    }
}, 60 * 1000); // Check every minute

async function tictactoeCommand(sock, chatId, senderId, text) {
    try {
        // Show stats if requested
        if (text && text.toLowerCase() === 'stats') {
            await showPlayerStats(sock, chatId, senderId);
            return;
        }

        // Show leaderboard if requested
        if (text && text.toLowerCase() === 'leaderboard') {
            await showLeaderboard(sock, chatId);
            return;
        }

        // Show active games if requested
        if (text && text.toLowerCase() === 'list') {
            await showActiveGames(sock, chatId);
            return;
        }

        // Check if player is already in a game
        const currentGame = findPlayerGame(senderId);
        if (currentGame) {
            await sock.sendMessage(chatId, { 
                text: `❌ You are in an active game!\n\nGame ID: ${currentGame.id}\nOpponent: @${getOpponent(currentGame, senderId).split('@')[0]}\n\nType *surrender* to quit or finish your current game.`,
                mentions: [senderId]
            });
            return;
        }

        // Look for existing waiting room
        let room = Array.from(games.tictactoe.values()).find(room => 
            room.state === 'WAITING' && 
            (text ? room.name === text : true)
        );

        if (room) {
            // Join existing room
            room.o = chatId;
            room.game.playerO = senderId;
            room.state = 'PLAYING';
            games.lastActivity.set(room.id, Date.now());

            const board = formatBoard(room.game.render());
            const opponent = room.game.playerX.split('@')[0];
            const currentPlayer = room.game.currentTurn.split('@')[0];

            const message = `
🎮 *TicTacToe Game Started!*

▢ Player ❎: @${opponent}
▢ Player ⭕: @${senderId.split('@')[0]}

${getPlayerStatsMessage(senderId)}
${getPlayerStatsMessage(room.game.playerX)}

Waiting for @${currentPlayer}'s move...

${board}

▢ *Room ID:* ${room.id}
▢ *Rules:*
• Type a number (1-9) to place your symbol
• Make 3 in a row to win
• Type *surrender* to quit
• Game auto-ends after 30 minutes
`;

            await sock.sendMessage(chatId, { 
                text: message,
                mentions: [room.game.currentTurn, room.game.playerX, room.game.playerO]
            });

        } else {
            // Create new room
            const roomId = generateRoomId();
            const newRoom = {
                id: roomId,
                x: chatId,
                o: '',
                game: new TicTacToe(senderId, 'o'),
                state: 'WAITING',
                created: Date.now(),
                name: text || ''
            };

            games.tictactoe.set(roomId, newRoom);
            games.lastActivity.set(roomId, Date.now());

            const inviteMessage = text
                ? `🎯 *TicTacToe Challenge Created!*\n\n▢ Room: "${text}"\n▢ Created by: @${senderId.split('@')[0]}\n\nType \`.ttt ${text}\` to accept the challenge!`
                : `🎯 *Waiting for TicTacToe opponent*\n\nType \`.ttt\` to play against @${senderId.split('@')[0]}!`;

            await sock.sendMessage(chatId, { 
                text: inviteMessage,
                mentions: [senderId]
            });
        }

    } catch (error) {
        console.error('Error in tictactoe command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Failed to start game. Please try again later.' 
        });
    }
}

async function handleTicTacToeMove(sock, chatId, senderId, text) {
    try {
        // Find player's active game
        const room = findPlayerGame(senderId);
        if (!room || room.state !== 'PLAYING') return;

        const isSurrender = /^(surrender|give up|quit|exit|ff)$/i.test(text);
        const isValidMove = /^[1-9]$/.test(text);
        
        if (!isSurrender && !isValidMove) return;

        // Update last activity
        games.lastActivity.set(room.id, Date.now());

        // Handle surrender
        if (isSurrender) {
            const winner = senderId === room.game.playerX 
                ? room.game.playerO 
                : room.game.playerX;
            
            updatePlayerStats(senderId, 'loss');
            updatePlayerStats(winner, 'win');
            
            const surrenderMessage = `🏳️ *Game Over - Surrender*\n\n@${senderId.split('@')[0]} surrendered!\n@${winner.split('@')[0]} wins!\n\n${getStatsUpdateMessage(senderId, winner)}`;

            await sendToBothPlayers(sock, room, surrenderMessage, [senderId, winner]);
            
            games.tictactoe.delete(room.id);
            games.lastActivity.delete(room.id);
            return;
        }

        // Validate turn
        if (senderId !== room.game.currentTurn) {
            await sock.sendMessage(chatId, { 
                text: `⌛ Not your turn! Waiting for @${room.game.currentTurn.split('@')[0]} to play.`,
                mentions: [room.game.currentTurn]
            });
            return;
        }

        // Process move
        const moveSuccess = room.game.turn(
            senderId === room.game.playerO,
            parseInt(text) - 1
        );

        if (!moveSuccess) {
            await sock.sendMessage(chatId, { 
                text: '❌ Invalid move! That position is already taken.' 
            });
            return;
        }

        // Check game status
        const winner = room.game.winner;
        const isTie = room.game.turns === 9;
        const board = formatBoard(room.game.render());

        // Prepare game status message
        let statusMessage;
        if (winner) {
            const loser = winner === room.game.playerX ? room.game.playerO : room.game.playerX;
            updatePlayerStats(winner, 'win');
            updatePlayerStats(loser, 'loss');
            statusMessage = `🎉 @${winner.split('@')[0]} wins!\n\n${getStatsUpdateMessage(winner, loser)}`;
        } else if (isTie) {
            updatePlayerStats(room.game.playerX, 'draw');
            updatePlayerStats(room.game.playerO, 'draw');
            statusMessage = `🤝 Game ended in a draw!\n\nBoth players earn a draw.`;
        } else {
            statusMessage = `🎲 Turn: @${room.game.currentTurn.split('@')[0]} (${senderId === room.game.playerX ? '❎' : '⭕'})`;
        }

        const fullMessage = `
🎮 *TicTacToe Game* - ${room.name ? `"${room.name}"` : 'Room ' + room.id}

${statusMessage}

${board}

▢ Player ❎: @${room.game.playerX.split('@')[0]}
▢ Player ⭕: @${room.game.playerO.split('@')[0]}

${!winner && !isTie ? '• Type a number (1-9) to play\n• Type *surrender* to quit' : '🏆 Game Over!'}
`;

        const mentions = [
            room.game.playerX, 
            room.game.playerO,
            ...(winner ? [winner] : [room.game.currentTurn])
        ];

        // Send to both players
        await sendToBothPlayers(sock, room, fullMessage, mentions);

        // Cleanup if game ended
        if (winner || isTie) {
            games.tictactoe.delete(room.id);
            games.lastActivity.delete(room.id);
        }

    } catch (error) {
        console.error('Error processing TicTacToe move:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Error processing your move. Please try again.'
        });
    }
}

// Helper functions
function findPlayerGame(playerId) {
    return Array.from(games.tictactoe.values()).find(room => 
        [room.game.playerX, room.game.playerO].includes(playerId)
    );
}

function getOpponent(room, playerId) {
    return playerId === room.game.playerX ? room.game.playerO : room.game.playerX;
}

function generateRoomId() {
    return 'ttt-' + Math.random().toString(36).substr(2, 8).toUpperCase();
}

function formatBoard(cells) {
    const symbols = {
        'X': '❎',
        'O': '⭕',
        '1': '1️⃣',
        '2': '2️⃣',
        '3': '3️⃣',
        '4': '4️⃣',
        '5': '5️⃣',
        '6': '6️⃣',
        '7': '7️⃣',
        '8': '8️⃣',
        '9': '9️⃣'
    };
    
    const arr = cells.map(v => symbols[v] || v);
    return `
╔═══╦═══╦═══╗
║ ${arr[0]} ║ ${arr[1]} ║ ${arr[2]} ║
╠═══╬═══╬═══╣
║ ${arr[3]} ║ ${arr[4]} ║ ${arr[5]} ║
╠═══╬═══╬═══╣
║ ${arr[6]} ║ ${arr[7]} ║ ${arr[8]} ║
╚═══╩═══╩═══╝
`.trim();
}

async function sendToBothPlayers(sock, room, message, mentions) {
    if (room.x) {
        await sock.sendMessage(room.x, { 
            text: message,
            mentions
        });
    }
    if (room.o && room.x !== room.o) {
        await sock.sendMessage(room.o, { 
            text: message,
            mentions
        });
    }
}

function getPlayerStatsMessage(playerId) {
    const playerJid = playerId.split('@')[0];
    const stats = games.playerStats[playerJid];
    if (!stats) return `📊 ${playerJid}: New player`;
    
    const winRate = ((stats.wins / stats.games) * 100).toFixed(1);
    return `📊 ${playerJid}: ${stats.wins}W ${stats.losses}L ${stats.draws}D (${winRate}% win rate)`;
}

function getStatsUpdateMessage(winner, loser) {
    const winnerStats = games.playerStats[winner.split('@')[0]];
    const loserStats = games.playerStats[loser.split('@')[0]];
    
    const winnerRate = winnerStats ? ((winnerStats.wins / winnerStats.games) * 100).toFixed(1) : '100.0';
    const loserRate = loserStats ? ((loserStats.wins / loserStats.games) * 100).toFixed(1) : '0.0';
    
    return `📈 Stats updated:\n• @${winner.split('@')[0]}: ${winnerRate}% win rate\n• @${loser.split('@')[0]}: ${loserRate}% win rate`;
}

async function showPlayerStats(sock, chatId, playerId) {
    const playerJid = playerId.split('@')[0];
    const stats = games.playerStats[playerJid] || { wins: 0, losses: 0, draws: 0, games: 0 };
    const winRate = stats.games > 0 ? ((stats.wins / stats.games) * 100).toFixed(1) : 0;
    
    const message = `
📊 *TicTacToe Statistics* - @${playerJid}

🏆 Wins: ${stats.wins}
💔 Losses: ${stats.losses}
🤝 Draws: ${stats.draws}
🎯 Total Games: ${stats.games}
📈 Win Rate: ${winRate}%

*Rank:* ${getRank(stats.wins)}
    `.trim();
    
    await sock.sendMessage(chatId, { text: message, mentions: [playerId] });
}

async function showLeaderboard(sock, chatId) {
    const players = Object.entries(games.playerStats)
        .sort(([,a], [,b]) => (b.wins - a.wins) || (a.losses - b.losses))
        .slice(0, 10);
    
    if (players.length === 0) {
        await sock.sendMessage(chatId, { text: '🏆 *TicTacToe Leaderboard*\n\nNo games played yet!' });
        return;
    }
    
    let leaderboard = '🏆 *TicTacToe Leaderboard*\n\n';
    players.forEach(([player, stats], index) => {
        const winRate = ((stats.wins / stats.games) * 100).toFixed(1);
        const trophy = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '▫️';
        leaderboard += `${trophy} ${index + 1}. @${player} - ${stats.wins}W ${stats.losses}L (${winRate}%)\n`;
    });
    
    await sock.sendMessage(chatId, { text: leaderboard });
}

async function showActiveGames(sock, chatId) {
    const activeGames = Array.from(games.tictactoe.values())
        .filter(room => room.state === 'PLAYING');
    
    if (activeGames.length === 0) {
        await sock.sendMessage(chatId, { text: '🎮 *Active TicTacToe Games*\n\nNo active games right now!' });
        return;
    }
    
    let gamesList = '🎮 *Active TicTacToe Games*\n\n';
    activeGames.forEach((room, index) => {
        const duration = Math.floor((Date.now() - room.created) / 60000);
        gamesList += `${index + 1}. ${room.name || 'Room ' + room.id}\n`;
        gamesList += `   👥 @${room.game.playerX.split('@')[0]} vs @${room.game.playerO.split('@')[0]}\n`;
        gamesList += `   ⏰ ${duration}m | Turn: @${room.game.currentTurn.split('@')[0]}\n\n`;
    });
    
    await sock.sendMessage(chatId, { text: gamesList });
}

function getRank(wins) {
    if (wins >= 100) return 'TicTacToe Grand Master 🏆';
    if (wins >= 50) return 'TicTacToe Master 🎯';
    if (wins >= 25) return 'Skilled Player ⭐';
    if (wins >= 10) return 'Experienced Player 🔥';
    if (wins >= 5) return 'Rookie Player 🌱';
    return 'New Player 🎮';
}

module.exports = {
    tictactoeCommand,
    handleTicTacToeMove,
    games
};