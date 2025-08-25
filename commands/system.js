const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Handle system commands (owner-only)
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 * @param {string} cmd - Command type (restart/update/shutdown)
 */
async function systemCommand(sock, chatId, message, cmd) {
    try {
        // Owner check
        if (!message.key.fromMe) {
            await sock.sendMessage(chatId, { 
                text: '❌ This command is only available for the owner!',
                quoted: message
            });
            return;
        }

        // Confirmation message
        const confirmMsg = {
            restart: '♻️ *Restarting bot...* Back in 10 seconds!',
            update: '🔄 *Updating bot...* Please wait 30 seconds before using commands!',
            shutdown: '⏏️ *Shutting down bot...* Goodbye!'
        };

        await sock.sendMessage(chatId, { 
            text: confirmMsg[cmd],
            quoted: message
        });

        // Execute system command
        switch (cmd) {
            case 'restart':
                setTimeout(() => {
                    exec('pm2 restart ZUKO-MD', (error) => {
                        if (error) process.exit(1);
                    });
                }, 2000);
                break;

            case 'update':
                setTimeout(() => {
                    exec('git pull && npm install && pm2 restart ZUKO-MD', (error) => {
                        if (error) process.exit(1);
                    });
                }, 2000);
                break;

            case 'shutdown':
                setTimeout(() => {
                    exec('pm2 stop ZUKO-MD', (error) => {
                        if (error) process.exit(0);
                    });
                }, 2000);
                break;
        }

    } catch (error) {
        console.error('System Command Error:', error);
        await sock.sendMessage(chatId, { 
            text: `❌ Failed to execute ${cmd} command`,
            quoted: message
        });
    }
}

module.exports = {
    systemCommand
};