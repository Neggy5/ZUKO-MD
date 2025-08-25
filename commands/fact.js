const axios = require('axios');
const NodeCache = require('node-cache');
const factCache = new NodeCache({ stdTTL: 3600 }); // Cache facts for 1 hour

async function factCommand(sock, chatId, message, args) {
    try {
        // Check cache first
        const cachedFact = factCache.get('last_fact');
        if (cachedFact && !args.includes('--new')) {
            await sock.sendMessage(chatId, { 
                text: `💡 Cached Fact:\n\n${cachedFact}\n\nSend ".fact --new" for a fresh fact`,
                mentions: []
            }, { quoted: message });
            return;
        }

        // List of reliable fact APIs as fallbacks
        const factAPIs = [
            'https://uselessfacts.jsph.pl/random.json?language=en',
            'https://api.api-ninjas.com/v1/facts?limit=1',
            'https://asli-fun-fact-api.herokuapp.com/api/random'
        ];

        let fact;
        let lastError;
        
        // Try each API until we get a successful response
        for (const apiUrl of factAPIs) {
            try {
                const response = await axios.get(apiUrl, {
                    timeout: 5000,
                    headers: apiUrl.includes('api-ninjas') 
                        ? { 'X-Api-Key': process.env.API_NINJAS_KEY || '' } 
                        : {}
                });
                
                // Parse response based on API
                if (apiUrl.includes('jsph.pl')) {
                    fact = response.data.text;
                } else if (apiUrl.includes('api-ninjas')) {
                    fact = response.data[0]?.fact;
                } else if (apiUrl.includes('asli-fun-fact')) {
                    fact = response.data.data?.fact;
                }
                
                if (fact) break;
            } catch (error) {
                lastError = error;
                continue; // Try next API
            }
        }

        // If all APIs failed, use fallback facts
        if (!fact) {
            throw lastError || new Error('All fact APIs failed');
        }
        
        // Cache the new fact
        factCache.set('last_fact', fact);
        
        // Format and send response
        const formattedFact = `🤯 *Random Fact*\n\n${fact}\n\n✨ _Powered by multiple fact APIs_`;
        
        await sock.sendMessage(chatId, { 
            text: formattedFact,
            mentions: [],
            footer: "Try '.fact --new' for another fact"
        }, { quoted: message });

    } catch (error) {
        console.error('Fact command error:', error);
        
        const fallbackFacts = [
            "The dot over the letter 'i' is called a tittle.",
            "A group of flamingos is called a flamboyance.",
            "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
            "Octopuses have three hearts and blue blood.",
            "The shortest war in history was between Britain and Zanzibar in 1896. Zanzibar surrendered after 38 minutes.",
            "Bananas are berries, but strawberries aren't."
        ];
        
        const errorMessage = error.code === 'ECONNABORTED' 
            ? '⌛ Fact request timed out. Here\'s a fallback fact:'
            : '❌ Failed to fetch a fact from APIs. Here\'s a fallback fact:';
        
        const randomFact = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
        
        await sock.sendMessage(chatId, { 
            text: `${errorMessage}\n\n💡 ${randomFact}`,
            mentions: []
        }, { quoted: message });
    }
}

// Module export at the end of the file
module.exports = factCommand;