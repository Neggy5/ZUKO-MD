/**
 * TicTacToe Game Command - Play TicTacToe with friends
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

// Store active games
const activeGames = new Map();

// Game board representation
const createEmptyBoard = () => [
    ['⬜', '⬜', '⬜'],
    ['⬜', '⬜', '⬜'],
    ['⬜', '⬜', '⬜']
];

const WINNING_COMBINATIONS = [
    // Rows
    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],
    // Columns
    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],
    // Diagonals
    [[0,0], [1,1], [2,2]],
    [[0,2], [1,1], [2,0]]
];

// Check for winner
const checkWinner = (board, player) => {
    const symbol = player === 'X' ? '❌' : '⭕';
    for (const combination of WINNING_COMBINATIONS) {
        let win = true;
        for (const [row, col] of combination) {
            if (board[row][col] !== symbol) {
                win = false;
                break;
            }
        }
        if (win) return true;
    }
    return false;
};

// Check if board is full (draw)
const isDraw = (board) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '⬜') return false;
        }
    }
    return true;
};

// Render board as string
const renderBoard = (board) => {
    let display = '┌───┬───┬───┐\n';
    for (let i = 0; i < 3; i++) {
        display += `│ ${board[i][0]} │ ${board[i][1]} │ ${board[i][2]} │\n`;
        if (i < 2) display += '├───┼───┼───┤\n';
    }
    display += '└───┴───┴───┘';
    return display;
};

// Create game buttons
const createGameButtons = (gameId, board) => {
    const buttons = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '⬜') {
                buttons.push({
                    text: `${i+1}${j+1}`,
                    id: `ttt_${gameId}_${i}_${j}`,
                    type: 'reply'
                });
            }
        }
    }
    return buttons;
};

export default {
    name: 'tictactoe',
    description: 'Play TicTacToe with friends',
    aliases: ['ttt', 'xo', 'tictac', 'tic'],
    
    async execute(sock, msg, args, context) {
        const { from, sender, reply, react, isGroup, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        const action = args[0]?.toLowerCase();
        
        // Show help menu
        if (action === 'help' || !action) {
            await buttons.sendButtons(from, {
                text: `🎮 *ＴＩＣＴＡＣＴＯＥ ＧＡＭＥ* 🎮\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}ttt @user - Challenge someone\n` +
                      `┃ • ${prefix}ttt accept - Accept challenge\n` +
                      `┃ • ${prefix}ttt cancel - Cancel game\n` +
                      `┃ • ${prefix}ttt quit - Quit current game\n` +
                      `┃ • ${prefix}ttt board - Show current board\n` +
                      `┃\n` +
                      `┃ *How to play:*\n` +
                      `┃ • X goes first (challenger)\n` +
                      `┃ • Click buttons 11,12,13,21,22,23,31,32,33\n` +
                      `┃ • First to get 3 in a row wins!\n` +
                      `┃\n` +
                      `┃ *Example:*\n` +
                      `┃ ${prefix}ttt @username\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🎮 NEW GAME', id: 'ttt_new', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        // Challenge someone
        if (action === 'challenge' || (args[0] && args[0].startsWith('@'))) {
            let opponent = args[0];
            if (opponent.startsWith('@')) {
                opponent = opponent.replace('@', '') + '@s.whatsapp.net';
            } else if (args[1] && args[1].startsWith('@')) {
                opponent = args[1].replace('@', '') + '@s.whatsapp.net';
            } else {
                await reply(`❌ Usage: ${prefix}ttt @username`);
                return;
            }
            
            if (opponent === sender) {
                await reply('❌ You cannot play against yourself!');
                return;
            }
            
            // Check if there's already a game
            for (const [id, game] of activeGames.entries()) {
                if (game.players.includes(sender) || game.players.includes(opponent)) {
                    await reply('❌ You or the opponent are already in a game!');
                    return;
                }
            }
            
            const gameId = Date.now().toString();
            activeGames.set(gameId, {
                players: [sender, opponent],
                board: createEmptyBoard(),
                currentTurn: sender,
                winner: null,
                status: 'waiting',
                challenger: sender,
                challenged: opponent
            });
            
            const challengerName = sender.split('@')[0];
            const opponentName = opponent.split('@')[0];
            
            await buttons.sendButtons(from, {
                text: `🎮 *ＴＩＣＴＡＣＴＯＥ ＣＨＡＬＬＥＮＧＥ* 🎮\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ 👤 *Challenger:* @${challengerName}\n` +
                      `┃ 🎯 *Opponent:* @${opponentName}\n` +
                      `┃\n` +
                      `┃ @${opponentName}, you have been challenged!\n` +
                      `┃\n` +
                      `┃ *To accept:* ${prefix}ttt accept\n` +
                      `┃ *To decline:* ${prefix}ttt cancel\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '✅ ACCEPT', id: `ttt_accept_${gameId}`, type: 'reply' },
                    { text: '❌ DECLINE', id: `ttt_cancel_${gameId}`, type: 'reply' }
                ],
                mentions: [sender, opponent]
            }, msg);
            
            await react('🎮');
            return;
        }
        
        // Accept challenge
        if (action === 'accept') {
            let gameId = null;
            let game = null;
            
            for (const [id, g] of activeGames.entries()) {
                if (g.status === 'waiting' && g.challenged === sender) {
                    gameId = id;
                    game = g;
                    break;
                }
            }
            
            if (!game) {
                await reply('❌ No pending challenge found!');
                return;
            }
            
            game.status = 'active';
            game.currentTurn = game.challenger;
            
            const boardDisplay = renderBoard(game.board);
            const challengerName = game.challenger.split('@')[0];
            const opponentName = game.challenged.split('@')[0];
            
            await buttons.sendButtons(from, {
                text: `🎮 *ＴＩＣＴＡＣＴＯＥ ＧＡＭＥ* 🎮\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ ❌ *X:* @${challengerName}\n` +
                      `┃ ⭕ *O:* @${opponentName}\n` +
                      `┃\n` +
                      `┃ 🎯 *Turn:* ${game.currentTurn === game.challenger ? '❌ X' : '⭕ O'}\n` +
                      `┃\n` +
                      `┃ ${boardDisplay}\n` +
                      `┃\n` +
                      `┃ Click a button to place your mark!\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: createGameButtons(gameId, game.board),
                mentions: [game.challenger, game.challenged]
            }, msg);
            
            await react('✅');
            return;
        }
        
        // Cancel/Decline challenge
        if (action === 'cancel') {
            let gameId = null;
            let game = null;
            
            for (const [id, g] of activeGames.entries()) {
                if (g.status === 'waiting' && (g.challenger === sender || g.challenged === sender)) {
                    gameId = id;
                    game = g;
                    break;
                }
            }
            
            if (!game) {
                await reply('❌ No pending challenge found!');
                return;
            }
            
            activeGames.delete(gameId);
            await reply('✅ Challenge cancelled!');
            await react('❌');
            return;
        }
        
        // Quit active game
        if (action === 'quit') {
            let gameId = null;
            let game = null;
            
            for (const [id, g] of activeGames.entries()) {
                if (g.status === 'active' && g.players.includes(sender)) {
                    gameId = id;
                    game = g;
                    break;
                }
            }
            
            if (!game) {
                await reply('❌ You are not in an active game!');
                return;
            }
            
            activeGames.delete(gameId);
            await reply('✅ You have quit the game!');
            await react('👋');
            return;
        }
        
        // Show current board
        if (action === 'board') {
            let game = null;
            for (const [id, g] of activeGames.entries()) {
                if (g.status === 'active' && g.players.includes(sender)) {
                    game = g;
                    break;
                }
            }
            
            if (!game) {
                await reply('❌ You are not in an active game!');
                return;
            }
            
            const boardDisplay = renderBoard(game.board);
            await reply(`🎮 *Current Board*\n\n${boardDisplay}`);
            return;
        }
        
        await reply(`❌ Unknown command. Use ${prefix}ttt help for help.`);
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};

// Handle game moves (called from button response)
export async function handleTicTacToeMove(sock, msg, context, gameId, row, col) {
    const { from, sender, reply, react } = context;
    
    const game = activeGames.get(gameId);
    if (!game) {
        await reply('❌ Game not found or expired!');
        return false;
    }
    
    if (game.status !== 'active') {
        await reply('❌ Game is not active!');
        return false;
    }
    
    if (game.winner) {
        await reply('❌ Game already ended!');
        return false;
    }
    
    if (game.currentTurn !== sender) {
        await reply('❌ Not your turn!');
        return false;
    }
    
    if (game.board[row][col] !== '⬜') {
        await reply('❌ That spot is already taken!');
        return false;
    }
    
    // Make the move
    const symbol = game.currentTurn === game.challenger ? '❌' : '⭕';
    game.board[row][col] = symbol;
    
    // Check for winner
    const player = game.currentTurn === game.challenger ? 'X' : 'O';
    if (checkWinner(game.board, player)) {
        game.winner = game.currentTurn;
        const winnerName = game.winner.split('@')[0];
        const boardDisplay = renderBoard(game.board);
        
        await buttons.sendButtons(from, {
            text: `🎉 *ＧＡＭＥ ＯＶＥＲ* 🎉\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 🏆 *Winner:* @${winnerName}\n` +
                  `┃\n` +
                  `┃ ${boardDisplay}\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `🎮 Play again with ${prefix}ttt @user\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '🎮 NEW GAME', id: 'ttt_new', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ],
            mentions: [game.winner]
        }, msg);
        
        activeGames.delete(gameId);
        await react('🏆');
        return true;
    }
    
    // Check for draw
    if (isDraw(game.board)) {
        const boardDisplay = renderBoard(game.board);
        
        await buttons.sendButtons(from, {
            text: `🤝 *ＧＡＭＥ ＤＲＡＷ* 🤝\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ ${boardDisplay}\n` +
                  `┃\n` +
                  `┃ It's a tie! Well played!\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `🎮 Play again with ${prefix}ttt @user\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '🎮 NEW GAME', id: 'ttt_new', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        activeGames.delete(gameId);
        await react('🤝');
        return true;
    }
    
    // Switch turns
    game.currentTurn = game.currentTurn === game.challenger ? game.challenged : game.challenger;
    
    // Update board
    const boardDisplay = renderBoard(game.board);
    const currentPlayer = game.currentTurn === game.challenger ? '❌ X' : '⭕ O';
    const currentPlayerName = game.currentTurn.split('@')[0];
    
    await buttons.sendButtons(from, {
        text: `🎮 *ＴＩＣＴＡＣＴＯＥ* 🎮\n\n` +
              `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
              `┃\n` +
              `┃ ❌ *X:* @${game.challenger.split('@')[0]}\n` +
              `┃ ⭕ *O:* @${game.challenged.split('@')[0]}\n` +
              `┃\n` +
              `┃ 🎯 *Turn:* ${currentPlayer} (@${currentPlayerName})\n` +
              `┃\n` +
              `┃ ${boardDisplay}\n` +
              `┃\n` +
              `┃ Click a button to place your mark!\n` +
              `┃\n` +
              `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
        buttons: createGameButtons(gameId, game.board),
        mentions: [game.challenger, game.challenged]
    }, msg);
    
    await react('🎲');
    return true;
}