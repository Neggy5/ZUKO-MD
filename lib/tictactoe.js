const TicTacToe = require('./tictactoe');

class TicTacToeUtils {
    // Generate a visual board with emojis
    static generateEmojiBoard(boardArray) {
        const symbols = {
            'X': '❌',
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
        
        return boardArray.map(cell => symbols[cell] || cell);
    }

    // Format board with borders
    static formatBoardWithBorders(boardArray) {
        const cells = this.generateEmojiBoard(boardArray);
        return `
╔═══╦═══╦═══╗
║ ${cells[0]} ║ ${cells[1]} ║ ${cells[2]} ║
╠═══╬═══╬═══╣
║ ${cells[3]} ║ ${cells[4]} ║ ${cells[5]} ║
╠═══╬═══╬═══╣
║ ${cells[6]} ║ ${cells[7]} ║ ${cells[8]} ║
╚═══╩═══╩═══╝
`.trim();
    }

    // Check if game is valid (for loaded games)
    static validateGameState(state) {
        if (!state || typeof state !== 'object') return false;
        if (!state.playerX || !state.playerO) return false;
        if (!Array.isArray(state.board) || state.board.length !== 9) return false;
        if (typeof state.turns !== 'number' || state.turns < 0 || state.turns > 9) return false;
        
        // Count X and O moves
        const xCount = state.board.filter(cell => cell === 'X').length;
        const oCount = state.board.filter(cell => cell === 'O').length;
        
        // Validate turn counts
        if (state.turns !== xCount + oCount) return false;
        
        // X should have same or one more move than O
        if (Math.abs(xCount - oCount) > 1) return false;
        
        return true;
    }

    // Get game status message
    static getStatusMessage(game, playerId) {
        if (!game.isGameOver()) {
            return `Turn: ${game.currentTurn.split('@')[0]} (${game.currentTurn === game.playerX ? '❌' : '⭕'})`;
        }
        
        if (game.winner === 'draw') {
            return 'Game ended in a draw! 🤝';
        }
        
        const winnerName = game.winner.split('@')[0];
        const isYou = game.winner === playerId;
        
        return isYou 
            ? `You win! 🎉` 
            : `${winnerName} wins! 🏆`;
    }

    // Create a new game with random first turn
    static createRandomFirstTurn(playerX, playerO) {
        const firstTurn = Math.random() > 0.5;
        const game = new TicTacToe(playerX, playerO);
        game._currentTurn = firstTurn;
        return game;
    }

    // Analyze board for strategic moves
    static analyzeBoard(game) {
        const analysis = {
            winningMoves: {
                X: [],
                O: []
            },
            blockingMoves: {
                X: [],
                O: []
            },
            forkOpportunities: {
                X: [],
                O: []
            }
        };

        // Check for winning moves
        for (const move of game.getAvailableMoves()) {
            if (game.wouldWin(move, game.playerX)) {
                analysis.winningMoves.X.push(move);
            }
            if (game.wouldWin(move, game.playerO)) {
                analysis.winningMoves.O.push(move);
            }
        }

        return analysis;
    }
}

module.exports = TicTacToe;