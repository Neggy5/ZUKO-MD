const axios = require('axios');

const livescoreCommand = {
    name: 'livescore',
    aliases: ['football', 'soccer', 'futbol'],
    description: 'Get live football match scores',
    async execute(sock, chatId, message) {
        try {
            // Register at https://www.football-data.org/ to get a free API key
            const API_KEY = '3129b3e1ad6a49959e0de4581c593b05'; // Replace with your actual key
            
            const response = await axios.get('https://api.football-data.org/v4/matches', {
                headers: {
                    'X-Auth-Token': API_KEY
                }
            });

            const matches = response.data.matches;
            const liveMatches = matches.filter(match => 
                match.status === 'IN_PLAY' || match.status === 'PAUSED'
            );

            if (liveMatches.length === 0) {
                return sock.sendMessage(chatId, {
                    text: '⚽ No live matches currently playing\n\nTry again later!',
                    ...global.channelInfo
                });
            }

            let result = '⚽ *Live Football Scores*\n\n';
            const competitions = {};
            
            // Group matches by competition
            liveMatches.forEach(match => {
                const compName = match.competition.name;
                if (!competitions[compName]) {
                    competitions[compName] = [];
                }
                competitions[compName].push(match);
            });

            // Format output (max 3 competitions)
            Object.entries(competitions).slice(0, 3).forEach(([compName, compMatches]) => {
                result += `🏆 *${compName}*\n`;
                
                compMatches.slice(0, 5).forEach(match => { // Max 5 matches per competition
                    const home = match.homeTeam.shortName || match.homeTeam.name;
                    const away = match.awayTeam.shortName || match.awayTeam.name;
                    const score = match.score.fullTime;
                    const minute = match.minute ? `${match.minute}'` : 
                                  match.status === 'PAUSED' ? 'HT' : 'LIVE';
                    
                    result += `${home} ${score.home || '0'} - ${score.away || '0'} ${away}\n` +
                              `⏱️ ${minute} | ${match.status.replace('_', ' ')}\n\n`;
                });
            });

            result += `ℹ️ ${liveMatches.length} matches live across ${Object.keys(competitions).length} competitions\n` +
                      `🔄 Updated: ${new Date().toLocaleTimeString()}`;

            await sock.sendMessage(chatId, {
                text: result,
                ...global.channelInfo
            });

        } catch (error) {
            console.error('Livescore error:', error.response?.data || error.message);
            await sock.sendMessage(chatId, {
                text: '❌ Failed to fetch live scores. The API may be rate limited.\nTry again in a few minutes.',
                ...global.channelInfo
            });
        }
    }
};

module.exports = livescoreCommand;