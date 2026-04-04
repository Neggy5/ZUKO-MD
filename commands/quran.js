/**
 * Quran Command - Get random Quran verse
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';

// Quran verses database (simplified)
const quranVerses = [
    { surah: "Al-Baqarah (2:255)", text: "Allah! There is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth." },
    { surah: "Ar-Rahman (55:13)", text: "So which of the favors of your Lord would you deny?" },
    { surah: "Al-Ikhlas (112:1-4)", text: "Say, 'He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, nor is there to Him any equivalent.'" },
    { surah: "Al-Fatiha (1:1-4)", text: "In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds. The Entirely Merciful, the Especially Merciful. Sovereign of the Day of Recompense." },
    { surah: "Al-Asr (103:1-3)", text: "By time, indeed mankind is in loss, except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience." },
    { surah: "Al-Kawthar (108:1-3)", text: "Indeed, We have granted you al-Kawthar. So pray to your Lord and sacrifice. Indeed, your enemy is the one cut off." },
    { surah: "An-Nas (114:1-6)", text: "Say, 'I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer who whispers in the breasts of mankind.'" }
];

export default {
    name: 'quran',
    description: 'Get a random Quran verse',
    aliases: ['quranverse', 'quranic', 'quranayah'],
    
    async execute(sock, msg, args, context) {
        const { from, react } = context;
        const buttons = new ButtonManager(sock);
        
        await react('🕋');
        
        const random = quranVerses[Math.floor(Math.random() * quranVerses.length)];
        
        await buttons.sendButtons(from, {
            text: `🕋 *ＱＵＲＡＮ ＶＥＲＳＥ* 🕋\n\n` +
                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                  `┃\n` +
                  `┃ 📜 *Surah ${random.surah}*\n` +
                  `┃\n` +
                  `┃ 💬 "${random.text}"\n` +
                  `┃\n` +
                  `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                  `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
            buttons: [
                { text: '🔄 NEW AYAH', id: 'quran', type: 'reply' },
                { text: '📖 RANDOM', id: 'quran', type: 'reply' },
                { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
            ]
        }, msg);
        
        await react('✅');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};