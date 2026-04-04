/**
 * Uptime Stats - Detailed system statistics
 * ES Module version with Lagos timezone
 */

import { ButtonManager } from '../utils/buttonManager.js';
import os from 'os';

export default {
    name: 'uptime_stats',
    description: 'Show detailed system statistics',
    aliases: ['stats', 'sysinfo'],
    
    async execute(sock, msg, args, context) {
        const { from, react, isOwner } = context;
        const buttons = new ButtonManager(sock);
        
        await react('📊');
        
        // Get detailed CPU info
        const cpus = os.cpus();
        let totalIdle = 0;
        let totalTick = 0;
        
        cpus.forEach(cpu => {
            for (const type in cpu.times) {
                totalTick += cpu.times[type];
            }
            totalIdle += cpu.times.idle;
        });
        
        const cpuUsagePercent = ((1 - totalIdle / totalTick) * 100).toFixed(1);
        
        // Get load average (Unix only)
        let loadAvg = 'N/A';
        if (os.loadavg) {
            const loads = os.loadavg();
            loadAvg = `${loads[0].toFixed(2)}, ${loads[1].toFixed(2)}, ${loads[2].toFixed(2)}`;
        }
        
        // Get network interfaces (simplified)
        const networkInterfaces = os.networkInterfaces();
        let ipAddress = 'N/A';
        for (const name in networkInterfaces) {
            for (const net of networkInterfaces[name]) {
                if (net.family === 'IPv4' && !net.internal) {
                    ipAddress = net.address;
                    break;
                }
            }
        }
        
        // Get Lagos time
        const lagosTime = new Date().toLocaleString('en-NG', {
            timeZone: 'Africa/Lagos',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        
        const statsText = `📊 *Detailed System Statistics*

💻 *CPU Information*
┣━━━━━━━━━━━━━━━━━━━━━
┣ 🔥 Usage: *${cpuUsagePercent}%*
┣ 🎯 Model: ${cpus[0]?.model.substring(0, 40)}...
┣ ⚡ Cores: ${cpus.length}
┣ 📊 Load Avg: ${loadAvg}
┗━━━━━━━━━━━━━━━━━━━━━

💾 *Memory Details*
┣━━━━━━━━━━━━━━━━━━━━━
┣ 📈 Total: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB
┣ 📉 Free: ${(os.freemem() / 1024 / 1024 / 1024).toFixed(2)} GB
┗━━━━━━━━━━━━━━━━━━━━━

🌐 *Network*
┣━━━━━━━━━━━━━━━━━━━━━
┣ 🌍 IP: ${ipAddress}
┣ 🖥️ Host: ${os.hostname()}
┗━━━━━━━━━━━━━━━━━━━━━

⏱️ *System Uptime*
┣━━━━━━━━━━━━━━━━━━━━━
┣ ⏰ OS: ${formatUptime(os.uptime())}
┣ 🤖 Bot: ${formatUptime(process.uptime())}
┗━━━━━━━━━━━━━━━━━━━━━

🕐 *Lagos Time: ${lagosTime} (WAT)*

> Powered by Node.js ${process.version}`;

        function formatUptime(seconds) {
            const days = Math.floor(seconds / 86400);
            const hours = Math.floor((seconds % 86400) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            
            let parts = [];
            if (days > 0) parts.push(`${days}d`);
            if (hours > 0) parts.push(`${hours}h`);
            if (minutes > 0) parts.push(`${minutes}m`);
            if (secs > 0) parts.push(`${secs}s`);
            return parts.join(' ') || '0s';
        }
        
        await buttons.sendButtons(from, {
            text: statsText,
            footer: `System Stats • ${new Date().toLocaleDateString('en-NG', { timeZone: 'Africa/Lagos' })}`,
            buttons: [
                { text: '🔄 Refresh', id: 'uptime', type: 'reply' },
                { text: '⬅️ Back', id: 'uptime', type: 'reply' },
                { text: '🏠 Menu', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};