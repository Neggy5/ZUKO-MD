const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Available translations (add more as needed)
const TRANSLATIONS = {
    en: {
        name: "English (Saheeh International)",
        code: "en.sahih"
    },
    ur: {
        name: "Urdu (Abul A'la Maududi)",
        code: "ur.maududi"
    },
    id: {
        name: "Indonesian (Indonesian Ministry of Religion)",
        code: "id.indonesian"
    }
};

async function quranCommand(sock, chatId, message, args) {
    try {
        const [surahInput, ayahInput, translationCode] = args;
        
        // Show help if no arguments
        if (!surahInput) {
            return showHelp(sock, chatId, message);
        }

        // Validate surah number (1-114)
        const surah = parseInt(surahInput);
if (isNaN(surah)) {
    return await sock.sendMessage(chatId, {
        text: `❌ Invalid surah number. Please enter between 1-114.`,
        mentions: []
    }, { quoted: message });
}

        // Validate ayah number
        const ayah = ayahInput ? parseInt(ayahInput) : null;
        
        // Get translation (default to English)
        const translation = TRANSLATIONS[translationCode?.toLowerCase()] || TRANSLATIONS.en;

        // Fetch Quran data
        const apiUrl = `https://api.alquran.cloud/v1/ayah/${surah}:${ayah || 1}/editions/quran-uthmani,${translation.code}`;
        const response = await axios.get(apiUrl);
        const data = response.data.data;

        if (!data || data.length < 2) {
            return await sock.sendMessage(chatId, {
                text: '❌ Verse not found. Please check surah/ayah numbers.',
                mentions: []
            }, { quoted: message });
        }

        const arabicText = data[0].text;
        const translationText = data[1].text;
        const surahName = data[0].surah.englishName;
        const surahNameArabic = data[0].surah.name;
        const totalAyahs = data[0].surah.numberOfAyahs;

        // Format the response
        const responseText = 
            `📖 *Quran ${surahName} (${surahNameArabic}) ${surah}:${ayah || 1}*\n\n` +
            `۞ ${arabicText}\n\n` +
            `*Translation (${translation.name}):*\n${translationText}\n\n` +
            `🔢 *Total Ayahs in Surah:* ${totalAyahs}\n` +
            `📜 *Surah Type:* ${data[0].surah.revelationType}\n\n` +
            `💡 *Tip:* Use \`.quran [surah] [ayah] [translation code]\`\n` +
            `Example: \`.quran 1 1 ur\` for Urdu`;

        await sock.sendMessage(chatId, {
            text: responseText,
            mentions: []
        }, { quoted: message });

    } catch (error) {
        console.error('Quran command error:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Failed to fetch Quran verse. Please try again later.',
            mentions: []
        }, { quoted: message });
    }
}

async function showHelp(sock, chatId, message) {
    const translationsList = Object.entries(TRANSLATIONS)
        .map(([code, {name}]) => `• ${code} - ${name}`)
        .join('\n');

    await sock.sendMessage(chatId, {
        text: `📖 *Quran Command Help*\n\n` +
              `Usage:\n` +
              `.quran [surah] (ayah) (translation)\n\n` +
              `Examples:\n` +
              `• .quran 1 - Surah Al-Fatihah, Ayah 1\n` +
              `• .quran 2 255 - Ayatul Kursi\n` +
              `• .quran 36 1 ur - Surah Ya-Sin in Urdu\n\n` +
              `Available Translations:\n${translationsList}\n\n` +
              `🌍 Source: api.alquran.cloud`,
        mentions: []
    }, { quoted: message });
}

module.exports = quranCommand;