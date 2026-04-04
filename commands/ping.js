import { ButtonManager } from '../utils/buttonManager.js';

export default {
    name: 'ping',
    description: 'Check bot response time',
    aliases: ['pong', 'latency'],
    
    async execute(sock, msg, args, context) {
        const { from, react } = context;
        const buttons = new ButtonManager(sock);
        
        const start = Date.now();
        await react('⏳');
        
        const end = Date.now();
        const latency = end - start;
        
        // Cool font styles for ZUKO MD
        const poweredBy = `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
        // Alternative styles (choose one):
        // const poweredBy = `✨ ＰＯＷＥＲＥＤ ＢＹ ＺＵＫＯ ＭＤ ✨`;
        // const poweredBy = `🔱 ꜰᴏʀᴛɪꜰɪᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ 🔱`;
        // const poweredBy = `💫 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝚉𝚄𝙺𝙾 𝙼𝙳 💫`;
        
        await buttons.sendButtons(from, {
            text: `🏓 *PONG!* 🏓\n\n` +
                  `┏━━━━━━━━━━━━━━━━━━━━┓\n` +
                  `┃ 📊 *LATENCY*\n` +
                  `┃ ┣━━━━━━━━━━━━━━━━\n` +
                  `┃ ┣ ⚡ ${latency}ms\n` +
                  `┃ ┗━━━━━━━━━━━━━━━━\n` +
                  `┃\n` +
                  `┃ 🤖 *BOT STATUS*\n` +
                  `┃ ┣━━━━━━━━━━━━━━━━\n` +
                  `┃ ┣ ✅ Connected\n` +
                  `┃ ┣ 🟢 Active\n` +
                  `┃ ┗━━━━━━━━━━━━━━━━\n` +
                  `┃\n` +
                  `┃ 📱 *NODE VERSION*\n` +
                  `┃ ┣━━━━━━━━━━━━━━━━\n` +
                  `┃ ┣ ${process.version}\n` +
                  `┃ ┗━━━━━━━━━━━━━━━━\n` +
                  `┗━━━━━━━━━━━━━━━━━━━━┛\n\n` +
                  `${poweredBy}`,
            footer: `Response time: ${latency}ms • ZUKO MD`,
            buttons: [
                { text: '🔄 REFRESH', id: 'ping', type: 'reply' },
                { text: '🏠 MAIN MENU', id: 'menu_main', type: 'reply' },
                { text: '📊 STATUS', id: 'menu_stats', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};