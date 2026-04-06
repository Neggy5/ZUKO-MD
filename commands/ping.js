/**
 * Ping Command - Check bot response time with cool designs
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import os from 'os';

export default {
    name: 'ping',
    description: 'Check bot response time',
    aliases: ['pong', 'latency', 'speed'],
    
    async execute(sock, msg, args, context) {
        const { from, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        // Send typing indicator
        await sock.sendPresenceUpdate('composing', from);
        
        const start = Date.now();
        
        // Send a temporary reaction
        await react('🏓');
        
        // Calculate accurate latency
        const latency = Date.now() - start;
        
        // Get system stats
        const memoryUsage = process.memoryUsage();
        const heapUsed = (memoryUsage.heapUsed / 1024 / 1024).toFixed(0);
        const heapTotal = (memoryUsage.heapTotal / 1024 / 1024).toFixed(0);
        const uptime = process.uptime();
        const uptimeHours = Math.floor(uptime / 3600);
        const uptimeMinutes = Math.floor((uptime % 3600) / 60);
        
        // Determine status emoji
        let statusEmoji = '🚀';
        let statusText = 'PERFECT';
        if (latency > 500) {
            statusEmoji = '🐌';
            statusText = 'SLOW';
        } else if (latency > 200) {
            statusEmoji = '⚡';
            statusText = 'GOOD';
        } else if (latency > 100) {
            statusEmoji = '✨';
            statusText = 'FAST';
        } else {
            statusEmoji = '🚀';
            statusText = 'PERFECT';
        }
        
        const designChoice = args[0]?.toLowerCase();
        
        // ========== DESIGN 1: MINIMAL BOX ==========
        const designMinimal = `┌─────────────────┐
│ 🏓  ${latency}ms  ${statusEmoji}
├─────────────────┤
│ 💾 ${heapUsed}/${heapTotal}MB
│ ⏱️ ${uptimeHours}h ${uptimeMinutes}m
└─────────────────┘
⚡ ZUKO MD`;
        
        // ========== DESIGN 2: SINGLE LINE ==========
        const designSingleLine = `🏓 ${latency}ms ${statusEmoji} | 💾 ${heapUsed}MB | ⏱️ ${uptimeHours}h`;
        
        // ========== DESIGN 3: COMPACT CARD ==========
        const designCompact = `╭──────────────╮
│ 🏓 ${latency}ms ${statusEmoji}  │
│ 📊 ${statusText}  │
├──────────────┤
│ 💾 ${heapUsed}/${heapTotal} │
│ ⏱️ ${uptimeHours}h ${uptimeMinutes}m │
╰──────────────╯`;
        
        // ========== DESIGN 4: SPLIT STYLE ==========
        const designSplit = `⚡ PING: ${latency}ms ${statusEmoji}
📊 STATUS: ${statusText}
💾 RAM: ${heapUsed}MB
⏱️ UPTIME: ${uptimeHours}h ${uptimeMinutes}m`;
        
        // ========== DESIGN 5: PROGRESS BAR ==========
        const barLength = Math.min(20, Math.max(1, Math.floor(latency / 25)));
        const progressBar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
        const designProgress = `🏓 ${latency}ms
${progressBar} ${statusText}
💾 ${heapUsed}/${heapTotal}MB | ⏱️ ${uptimeHours}h`;
        
        // ========== DESIGN 6: STATUS PILLS ==========
        let latencyColor = '';
        if (latency < 100) latencyColor = '🟢';
        else if (latency < 200) latencyColor = '🟡';
        else if (latency < 500) latencyColor = '🟠';
        else latencyColor = '🔴';
        
        const designPills = `🏓 ${latencyColor} ${latency}ms
💾 ${heapUsed}MB ▰▰▰▰▰▰▰▰▰▰
⏱️ ${uptimeHours}h ${uptimeMinutes}m`;
        
        // Select design
        let selectedDesign = designMinimal;
        let designName = 'Minimal';
        
        switch (designChoice) {
            case '1':
            case 'minimal':
                selectedDesign = designMinimal;
                designName = 'Minimal';
                break;
            case '2':
            case 'single':
                selectedDesign = designSingleLine;
                designName = 'Single Line';
                break;
            case '3':
            case 'compact':
                selectedDesign = designCompact;
                designName = 'Compact';
                break;
            case '4':
            case 'split':
                selectedDesign = designSplit;
                designName = 'Split';
                break;
            case '5':
            case 'progress':
                selectedDesign = designProgress;
                designName = 'Progress Bar';
                break;
            case '6':
            case 'pills':
                selectedDesign = designPills;
                designName = 'Status Pills';
                break;
            case 'list':
            case 'designs':
                await buttons.sendButtons(from, {
                    text: `🎨 *ＰＩＮＧ ＤＥＳＩＧＮＳ* 🎨\n\n` +
                          `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                          `┃\n` +
                          `┃ ${prefix}ping 1 - Minimal box\n` +
                          `┃ ${prefix}ping 2 - Single line\n` +
                          `┃ ${prefix}ping 3 - Compact card\n` +
                          `┃ ${prefix}ping 4 - Split style\n` +
                          `┃ ${prefix}ping 5 - Progress bar\n` +
                          `┃ ${prefix}ping 6 - Status pills\n` +
                          `┃\n` +
                          `┃ *Current latency:* ${latency}ms\n` +
                          `┃\n` +
                          `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                    buttons: [
                        { text: '🔄 REFRESH', id: 'ping', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                return;
            default:
                selectedDesign = designMinimal;
                designName = 'Minimal';
        }
        
        await sock.sendMessage(from, { text: selectedDesign }, { quoted: msg });
        
        await buttons.sendButtons(from, {
            text: `✅ ${latency}ms • ${statusText}`,
            buttons: [
                { text: '🔄 REFRESH', id: 'ping', type: 'reply' },
                { text: '🎨 DESIGNS', id: 'ping_list', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};