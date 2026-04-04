/**
 * Update Command - Update bot from GitHub repository
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import { exec } from 'child_process';
import util from 'util';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import AdmZip from 'adm-zip';

const execPromise = util.promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// GitHub repository info
const REPO_OWNER = 'Neggy5';
const REPO_NAME = 'ZUKO-MD';
const BRANCH = 'main';

// Paths
const TEMP_DIR = path.join(__dirname, '../temp');
const BACKUP_DIR = path.join(__dirname, '../backup');

export default {
    name: 'update',
    description: 'Update the bot from GitHub repository',
    aliases: ['upgrade', 'gitpull', 'selfupdate'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, isOwner, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Only owner can update
        if (!isOwner) {
            await reply('❌ Only bot owner can update the bot!');
            return;
        }
        
        const action = args[0]?.toLowerCase();
        
        // Check for status
        if (action === 'status') {
            await showUpdateStatus(from, sock, msg, buttons);
            return;
        }
        
        // Check for force update
        const forceUpdate = action === 'force' || action === '--force';
        
        // Show confirmation
        await buttons.sendButtons(from, {
            text: `⚠️ *ＵＰＤＡＴＥ ＣＯＮＦＩＲＭＡＴＩＯＮ* ⚠️\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 🔄 This will update ${config.botName}\n` +
                  `┃    from GitHub repository.\n` +
                  `┃\n` +
                  `┃ 📦 *Repository:* ${REPO_OWNER}/${REPO_NAME}\n` +
                  `┃ 🌿 *Branch:* ${BRANCH}\n` +
                  `┃\n` +
                  `┃ ⚠️ *WARNING:*\n` +
                  `┃ • Bot will restart after update\n` +
                  `┃ • Backup will be created\n` +
                  `┃ • Takes 30-60 seconds\n` +
                  `┃\n` +
                  `┃ 💡 Use .update status to check version\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '✅ CONFIRM UPDATE', id: 'update_confirm', type: 'reply' },
                { text: '❌ CANCEL', id: 'update_cancel', type: 'reply' },
                { text: '📊 STATUS', id: 'update_status', type: 'reply' }
            ]
        }, msg);
        
        await react('⚠️');
    },
    
    ownerOnly: true,
    groupOnly: false,
    adminOnly: false
};

// Show update status
async function showUpdateStatus(from, sock, msg, buttons) {
    try {
        // Get current commit hash
        let currentCommit = 'Unknown';
        try {
            const { stdout } = await execPromise('git rev-parse --short HEAD');
            currentCommit = stdout.trim();
        } catch (e) {}
        
        // Get latest commit from GitHub
        const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits/${BRANCH}`;
        const response = await axios.get(apiUrl);
        const latestCommit = response.data.sha.substring(0, 7);
        const latestDate = new Date(response.data.commit.author.date).toLocaleString();
        const commitMessage = response.data.commit.message.split('\n')[0];
        
        const needsUpdate = currentCommit !== latestCommit && currentCommit !== 'Unknown';
        
        await buttons.sendButtons(from, {
            text: `📊 *ＵＰＤＡＴＥ ＳＴＡＴＵＳ* 📊\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 🔄 *Current Version:* ${currentCommit}\n` +
                  `┃ 📦 *Latest Version:* ${latestCommit}\n` +
                  `┃ 📅 *Latest Release:* ${latestDate}\n` +
                  `┃ 📝 *Latest Update:* ${commitMessage.substring(0, 50)}\n` +
                  `┃\n` +
                  `┃ ${needsUpdate ? '🟢 Update available!' : '✅ Bot is up to date!'}\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: needsUpdate ? [
                { text: '🔄 UPDATE NOW', id: 'update_confirm', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ] : [
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
    } catch (error) {
        console.error('Status check error:', error);
        await sock.sendMessage(from, {
            text: `❌ Failed to check update status: ${error.message}`
        }, { quoted: msg });
    }
}

// Perform the update
async function performUpdate(from, sock, msg, buttons) {
    try {
        await sock.sendMessage(from, {
            text: `🔄 *ＵＰＤＡＴＩＮＧ ＺＵＫＯ ＭＤ* 🔄\n\n` +
                  `Starting update process...\n` +
                  `Please wait 30-60 seconds.\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
        }, { quoted: msg });
        
        // Create backup directory
        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR, { recursive: true });
        }
        
        // Create temp directory
        if (!fs.existsSync(TEMP_DIR)) {
            fs.mkdirSync(TEMP_DIR, { recursive: true });
        }
        
        // Backup current commands
        const commandsPath = path.join(__dirname, '..', 'commands');
        const backupCommandsPath = path.join(BACKUP_DIR, `commands_backup_${Date.now()}`);
        if (fs.existsSync(commandsPath)) {
            await execPromise(`cp -r "${commandsPath}" "${backupCommandsPath}"`);
        }
        
        // Download latest code from GitHub
        const downloadUrl = `https://github.com/${REPO_OWNER}/${REPO_NAME}/archive/refs/heads/${BRANCH}.zip`;
        const zipPath = path.join(TEMP_DIR, 'update.zip');
        
        const response = await axios({
            method: 'get',
            url: downloadUrl,
            responseType: 'arraybuffer'
        });
        
        fs.writeFileSync(zipPath, Buffer.from(response.data));
        
        // Extract zip
        const zip = new AdmZip(zipPath);
        const extractPath = path.join(TEMP_DIR, 'extracted');
        zip.extractAllTo(extractPath, true);
        
        // Find the extracted folder (it will be like ZUKO-MD-main)
        const extractedFolders = fs.readdirSync(extractPath).filter(f => 
            fs.statSync(path.join(extractPath, f)).isDirectory()
        );
        const extractedRepoPath = path.join(extractPath, extractedFolders[0]);
        
        // Update commands folder
        const newCommandsPath = path.join(extractedRepoPath, 'commands');
        if (fs.existsSync(newCommandsPath)) {
            // Remove old commands
            await execPromise(`rm -rf "${commandsPath}"`);
            // Copy new commands
            await execPromise(`cp -r "${newCommandsPath}" "${commandsPath}"`);
        }
        
        // Update utils folder
        const utilsPath = path.join(__dirname, '..', 'utils');
        const newUtilsPath = path.join(extractedRepoPath, 'utils');
        if (fs.existsSync(newUtilsPath)) {
            await execPromise(`rm -rf "${utilsPath}"`);
            await execPromise(`cp -r "${newUtilsPath}" "${utilsPath}"`);
        }
        
        // Update handler.js if exists
        const handlerPath = path.join(__dirname, '..', 'handler.js');
        const newHandlerPath = path.join(extractedRepoPath, 'handler.js');
        if (fs.existsSync(newHandlerPath)) {
            await execPromise(`cp "${newHandlerPath}" "${handlerPath}"`);
        }
        
        // Update index.js if exists
        const indexPath = path.join(__dirname, '..', 'index.js');
        const newIndexPath = path.join(extractedRepoPath, 'index.js');
        if (fs.existsSync(newIndexPath)) {
            await execPromise(`cp "${newIndexPath}" "${indexPath}"`);
        }
        
        // Cleanup temp files
        await execPromise(`rm -rf "${TEMP_DIR}"`);
        
        await sock.sendMessage(from, {
            text: `✅ *ＵＰＤＡＴＥ ＣＯＭＰＬＥＴＥ* ✅\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 🔄 Bot has been updated successfully!\n` +
                  `┃ 📦 Backup saved to backup folder\n` +
                  `┃\n` +
                  `┃ 🔄 Bot will restart in 5 seconds...\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
        }, { quoted: msg });
        
        // Restart bot after 5 seconds
        setTimeout(() => {
            process.exit(0);
        }, 5000);
        
    } catch (error) {
        console.error('Update error:', error);
        await sock.sendMessage(from, {
            text: `❌ *ＵＰＤＡＴＥ ＦＡＩＬＥＤ* ❌\n\n` +
                  `Error: ${error.message}\n\n` +
                  `Check console for details.\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
        }, { quoted: msg });
    }
}

// Cancel update
async function cancelUpdate(from, sock, msg) {
    await sock.sendMessage(from, {
        text: `❌ *ＵＰＤＡＴＥ ＣＡＮＣＥＬＬＥＤ* ❌\n\n` +
              `Update has been cancelled.\n\n` +
              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`
    }, { quoted: msg });
}

// Export handler functions for button responses
export { performUpdate, cancelUpdate, showUpdateStatus };