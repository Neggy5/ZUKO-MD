const fs = require('fs');
const path = require('path');
const os = require('os');
const process = require('process');

// Initialize global variables with proper fallbacks
global.uptime = global.uptime || (() => {
    const seconds = Math.floor(process.uptime());
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
});

global.ram = global.ram || (() => {
    const used = process.memoryUsage().rss;
    return {
        percent: Math.round((used / os.totalmem()) * 100),
        mb: `${Math.floor(used / 1024 / 1024)}MB`
    };
});

global.hostType = global.hostType || (process.env.HOSTED_ON || 'Panel');
global.prefix = global.prefix || '.';
global.totalCommands = global.totalCommands || 121;
global.platform = global.platform || `${os.platform()} ${os.arch()}`;
global.ytch = global.ytch || 'https://youtube.com/@zukotech001?si=5bXEHZK87UT5SYvy';
global.mode = global.mode || 'Public';
global.ping = global.ping || '100';
global.audioURL = global.audioURL || null; // Explicit null if not set

async function helpCommand(sock, chatId, message) {
    const ramInfo = global.ram();
    
    const helpMessage = `
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   Z U K O - M D   B O T
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

◖━━━━━━ BOT INFO ━━━━━━━◗
│ ➤ Version: 1.0.0
│ ➤ Uptime: ${global.uptime()}
│ ➤ RAM: ${ramInfo.percent}% (${ramInfo.mb})
│ ➤ Host: ${global.hostType}
│ ➤ Prefix: ${global.prefix}
│ ➤ Commands: ${global.totalCommands}
│ ➤ Platform: ${global.platform}
│ ➤ Mode: ${global.mode}
│ ➤ Ping: ${global.ping}ms
◖━━━━━━━━━━━━━━━━━━━━━━◗

◖━━━━ CORE COMMANDS ━━━━◗
│ • .help    • .ping     • .alive
│ • .owner   • .mode     • .uptime
│ • .system  • .broadcast
◖━━━━━━━━━━━━━━━━━━━━━━◗

◖━━ GROUP MANAGEMENT ━━◗
│ • .add     • .ban      • .kick
│ • .promote • .demote   • .mute
│ • .unmute  • .warn     • .warnings
│ • .resetlink • .setdesc • .setgroupname
│ • .setppgroup • .tag   • .tagall
│ • .tagadmin • .antilink • .antilinkkick
│ • .antibot • .anticall • .antidelete
│ • .antiedit • .antibug • .antibadword
│ • .welcome • .goodbye  • .sudo
◖━━━━━━━━━━━━━━━━━━━━━━◗

◖━━━━ MEDIA & FUN ━━━━━◗
│ • .sticker • .simage • .stickertelegram
│ • .take    • .emojimix • .img-blur
│ • .tiktokaudio • .toaudio • .blur
│ • .viewonce • .attp   • .qrcode • .vcf
│ • .joke    • .meme   • .quote  • .fact
│ • .dare    • .truth  • .compliment • .insult
│ • .flirt   • .shayari • .character • .ship
│ • .simp    • .stupid • .wasted • .roseday
│ • .goodnight • .hack • .8ball • .hangman
│ • .tictactoe • .trivia • .guess • .answer
│ • .premier • .babaijebu
◖━━━━━━━━━━━━━━━━━━━━━━◗

◖━━── INFORMATION ───━━◗
│ • .weather • .news   • .lyrics
│ • .movie   • .livescore • .bible
│ • .quran   • .time   • .channelinfo
│ • .groupinfo • .staff • .totalmember
│ • .topmembers • .listactive • .device
│ • .currency • .github • .script • .repo
◖━━━━━━━━━━━━━━━━━━━━━━◗

◖━━── AI & TOOLS ───━━◗
│ • .ai      • .chatbot • .imagine
│ • .translate • .tts   • .obfuscatejs
│ • .password • .pair   • .textmaker
│ • .autotyping • .autoreact • .autoread
│ • .autorecord • .autostatus • .autobio
◖━━━━━━━━━━━━━━━━━━━━━━◗

◖━━─ DOWNLOADERS ───━━◗
│ • .play    • .song   • .video
│ • .tiktok  • .instagram • .facebook
│ • .ytmp4   • .apk    • .ss
◖━━━━━━━━━━━━━━━━━━━━━━◗

◖━━── UTILITIES ───━━◗
│ • .clear   • .clearsession • .cleartmp
│ • .getpp   • .setpp • .savestatus
│ • .hideticks • .jid • .url • .wcg
│ • .advice  • .block • .unban
◖━━━━━━━━━━━━━━━━━━━━━━◗

▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
   Contact: .owner
   YouTube: @zukotech001
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');
        
        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            }, { quoted: message });
        } else {
            // First send the audio
            const audioURL = "https://files.catbox.moe/wwm21d.mp3";
            const audioResponse = await fetch(audioURL);
            const audioBuffer = await audioResponse.buffer();
            
            await sock.sendMessage(chatId, {
                audio: audioBuffer,
                mimetype: 'audio/mpeg',
                ptt: true
            }, { quoted: message });

            // Then send the help message
            await sock.sendMessage(chatId, {
                text: helpMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true
                }
            }, { quoted: message });
        }
    } catch (error) {
        console.error('Error in help command:', error);
        // Fallback: try sending just the text with audio URL
        try {
            await sock.sendMessage(chatId, {
                text: helpMessage,
                audio: { url: "https://files.catbox.moe/wwm21d.mp3" },
                mimetype: 'audio/mpeg'
            });
        } catch (e) {
            // Final fallback: just send text
            await sock.sendMessage(chatId, { text: helpMessage });
        }
    }
} // <-- This closing brace was missing

module.exports = helpCommand;