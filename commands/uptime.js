/**
 * Uptime Command - Show bot uptime and system statistics
 * ES Module version with button support
 * Timezone: Africa/Lagos (West African Time)
 */

import { ButtonManager } from '../utils/buttonManager.js';
import os from 'os';

export default {
    name: 'uptime',
    description: 'Show bot uptime and system statistics',
    aliases: ['runtime', 'status', 'botinfo'],
    
    async execute(sock, msg, args, context) {
        const { from, react, isOwner } = context;
        const buttons = new ButtonManager(sock);
        
        await react('⏱️');
        
        // Calculate uptime
        const uptimeSeconds = process.uptime();
        const days = Math.floor(uptimeSeconds / 86400);
        const hours = Math.floor((uptimeSeconds % 86400) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeSeconds % 60);
        
        // Format uptime string
        let uptimeString = '';
        if (days > 0) uptimeString += `${days}d `;
        if (hours > 0) uptimeString += `${hours}h `;
        if (minutes > 0) uptimeString += `${minutes}m `;
        uptimeString += `${seconds}s`;
        
        // Get system info
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        const memoryPercent = ((usedMemory / totalMemory) * 100).toFixed(1);
        const cpuCores = os.cpus().length;
        const cpuModel = os.cpus()[0]?.model || 'Unknown';
        const platform = os.platform();
        const nodeVersion = process.version;
        
        // Format memory sizes
        const formatMemory = (bytes) => {
            const mb = bytes / (1024 * 1024);
            if (mb > 1024) return `${(mb / 1024).toFixed(2)} GB`;
            return `${mb.toFixed(2)} MB`;
        };
        
        // Get current time in Lagos/Africa timezone
        const getLagosTime = () => {
            return new Date().toLocaleString('en-NG', {
                timeZone: 'Africa/Lagos',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        };
        
        // Get bot start time in Lagos timezone
        const getStartTime = () => {
            const startTimestamp = Date.now() - (uptimeSeconds * 1000);
            return new Date(startTimestamp).toLocaleString('en-NG', {
                timeZone: 'Africa/Lagos',
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        };
        
        const currentTime = getLagosTime();
        const startTime = getStartTime();
        
        // Build status message
        const statusText = `╭━━━❲ *BOT STATUS* ❳━━━╮
┃
┃ ⏱️ *Uptime Information*
┃ ┣━━━━━━━━━━━━━━━━━━━━━
┃ ┣ 📅 Running: *${uptimeString}*
┃ ┣ 🚀 Started: *${startTime}*
┃ ┗━━━━━━━━━━━━━━━━━━━━━
┃
┃ 💻 *System Resources*
┃ ┣━━━━━━━━━━━━━━━━━━━━━
┃ ┣ 🧠 RAM: ${formatMemory(usedMemory)} / ${formatMemory(totalMemory)}
┃ ┣ 📊 RAM Usage: *${memoryPercent}%*
┃ ┣ 🔧 CPU: ${cpuModel.substring(0, 30)}...
┃ ┣ 🎯 Cores: ${cpuCores}
┃ ┗━━━━━━━━━━━━━━━━━━━━━
┃
┃ 🤖 *Bot Information*
┃ ┣━━━━━━━━━━━━━━━━━━━━━
┃ ┣ 📦 Node.js: ${nodeVersion}
┃ ┣ 💻 Platform: ${platform}
┃ ┣ ⚡ Status: *Active ✅*
┃ ┗━━━━━━━━━━━━━━━━━━━━━
┃
┃ 🕐 *Lagos Time (WAT)*
┃ ┣━━━━━━━━━━━━━━━━━━━━━
┃ ┣ 📅 ${currentTime}
┃ ┗━━━━━━━━━━━━━━━━━━━━━
╰━━━━━━━━━━━━━━━━━━━━━━━╯`;

        // Create buttons
        const actionButtons = [
            { text: '🔄 Refresh', id: 'uptime', type: 'reply' },
            { text: '📊 More Stats', id: 'uptime_stats', type: 'reply' },
            { text: '🏠 Main Menu', id: 'menu_main', type: 'reply' }
        ];
        
        await buttons.sendButtons(from, {
            text: statusText,
            footer: `WAT • ${currentTime.split(',')[0]}`,
            buttons: actionButtons
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};