const fs = require('fs');
const path = require('path');

// Premier League teams with their strengths (1-10 scale)
const PREMIER_LEAGUE_TEAMS = {
    'ARS': { name: 'Arsenal', strength: 9, short: 'ARS' },
    'MCI': { name: 'Manchester City', strength: 10, short: 'MCI' },
    'LIV': { name: 'Liverpool', strength: 9, short: 'LIV' },
    'CHE': { name: 'Chelsea', strength: 8, short: 'CHE' },
    'TOT': { name: 'Tottenham', strength: 8, short: 'TOT' },
    'MUN': { name: 'Manchester United', strength: 8, short: 'MUN' },
    'NEW': { name: 'Newcastle', strength: 7, short: 'NEW' },
    'AVL': { name: 'Aston Villa', strength: 7, short: 'AVL' },
    'BHA': { name: 'Brighton', strength: 7, short: 'BHA' },
    'WHU': { name: 'West Ham', strength: 7, short: 'WHU' },
    'BRE': { name: 'Brentford', strength: 6, short: 'BRE' },
    'CRY': { name: 'Crystal Palace', strength: 6, short: 'CRY' },
    'FUL': { name: 'Fulham', strength: 6, short: 'FUL' },
    'WOL': { name: 'Wolves', strength: 6, short: 'WOL' },
    'BOU': { name: 'Bournemouth', strength: 5, short: 'BOU' },
    'NFO': { name: 'Nottingham Forest', strength: 5, short: 'NFO' },
    'EVE': { name: 'Everton', strength: 5, short: 'EVE' },
    'BUR': { name: 'Burnley', strength: 4, short: 'BUR' },
    'SHU': { name: 'Sheffield United', strength: 4, short: 'SHU' },
    'LUT': { name: 'Luton Town', strength: 4, short: 'LUT' }
};

// Upcoming fixtures (you can update this regularly)
const UPCOMING_FIXTURES = [
    { home: 'ARS', away: 'MCI', date: '2024-03-10' },
    { home: 'LIV', away: 'MUN', date: '2024-03-11' },
    { home: 'CHE', away: 'TOT', date: '2024-03-12' },
    { home: 'NEW', away: 'AVL', date: '2024-03-13' },
    { home: 'WHU', away: 'BHA', date: '2024-03-14' },
    { home: 'BRE', away: 'CRY', date: '2024-03-15' },
    { home: 'FUL', away: 'WOL', date: '2024-03-16' },
    { home: 'BOU', away: 'NFO', date: '2024-03-17' },
    { home: 'EVE', away: 'BUR', date: '2024-03-18' },
    { home: 'SHU', away: 'LUT', date: '2024-03-19' }
];

// Function to predict match outcome
function predictMatch(homeTeam, awayTeam) {
    const home = PREMIER_LEAGUE_TEAMS[homeTeam];
    const away = PREMIER_LEAGUE_TEAMS[awayTeam];
    
    if (!home || !away) return null;
    
    const homeStrength = home.strength;
    const awayStrength = away.strength;
    
    // Home advantage adds 1 to home team strength
    const homeAdvantage = 1;
    const totalStrength = homeStrength + awayStrength + homeAdvantage;
    
    // Calculate probabilities
    const homeWinProb = Math.round((homeStrength + homeAdvantage) / totalStrength * 100);
    const drawProb = Math.round(30 + (Math.abs(homeStrength - awayStrength) * 2)); // Closer teams = more likely draw
    const awayWinProb = Math.round(awayStrength / totalStrength * 100);
    
    // Normalize probabilities to sum to 100
    const total = homeWinProb + drawProb + awayWinProb;
    const normalizedHome = Math.round((homeWinProb / total) * 100);
    const normalizedDraw = Math.round((drawProb / total) * 100);
    const normalizedAway = Math.round((awayWinProb / total) * 100);
    
    // Predict score based on team strengths
    const homeGoals = Math.max(0, Math.floor((homeStrength / 10) * 3 * Math.random()));
    const awayGoals = Math.max(0, Math.floor((awayStrength / 10) * 2 * Math.random()));
    
    // Determine most likely outcome
    let prediction;
    if (normalizedHome > normalizedDraw && normalizedHome > normalizedAway) {
        prediction = `${home.short} Win`;
    } else if (normalizedAway > normalizedHome && normalizedAway > normalizedDraw) {
        prediction = `${away.short} Win`;
    } else {
        prediction = 'Draw';
    }
    
    return {
        home: home.name,
        away: away.name,
        prediction,
        score: `${homeGoals}-${awayGoals}`,
        probabilities: {
            home: normalizedHome,
            draw: normalizedDraw,
            away: normalizedAway
        },
        date: UPCOMING_FIXTURES.find(f => f.home === homeTeam && f.away === awayTeam)?.date || 'TBD'
    };
}

// Function to get team by name or code
function getTeam(teamInput) {
    const input = teamInput.toUpperCase();
    
    // Check by short code first
    if (PREMIER_LEAGUE_TEAMS[input]) {
        return PREMIER_LEAGUE_TEAMS[input];
    }
    
    // Check by name
    const team = Object.values(PREMIER_LEAGUE_TEAMS).find(
        t => t.name.toLowerCase().includes(input.toLowerCase())
    );
    
    return team || null;
}

async function premierLeagueCommand(sock, chatId, message, args) {
    try {
        const now = new Date();
        const dateStr = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // If specific teams are mentioned
        if (args.length >= 2) {
            const team1 = getTeam(args[0]);
            const team2 = getTeam(args[1]);
            
            if (!team1 || !team2) {
                await sock.sendMessage(chatId, {
                    text: '❌ One or both teams not found. Use .premier list to see all teams.',
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363420143192043@newsletter',
                            newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                            serverMessageId: -1
                        }
                    }
                });
                return;
            }
            
            const prediction = predictMatch(team1.short, team2.short);
            
            const predictionMessage = `
╔══════════════════════════════╗
║       ⚽ *PREMIER LEAGUE* ⚽      ║
║         MATCH PREDICTION      ║
╠══════════════════════════════╣
║ 📅 *Date:* ${dateStr}
║ 🏟️ *Fixture:* ${prediction.home} vs ${prediction.away}
║ 🎯 *Prediction:* ${prediction.prediction}
║ ⚽ *Expected Score:* ${prediction.score}
╠══════════════════════════════╣
║ 📊 *Probabilities:*
║   ${team1.short} Win: ${prediction.probabilities.home}%
║   Draw: ${prediction.probabilities.draw}%
║   ${team2.short} Win: ${prediction.probabilities.away}%
╚══════════════════════════════╝
            `.trim();
            
            await sock.sendMessage(chatId, {
                text: predictionMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
            
            return;
        }
        
        // Show upcoming fixtures predictions
        if (args[0] === 'fixtures' || args[0] === 'upcoming') {
            let fixturesMessage = `
╔══════════════════════════════╗
║       ⚽ *PREMIER LEAGUE* ⚽      ║
║       UPCOMING FIXTURES       ║
╠══════════════════════════════╣
║ 📅 *Date:* ${dateStr}
╠══════════════════════════════╣
            `.trim();
            
            for (const fixture of UPCOMING_FIXTURES.slice(0, 5)) {
                const prediction = predictMatch(fixture.home, fixture.away);
                const matchDate = new Date(fixture.date).toLocaleDateString('en-GB');
                
                fixturesMessage += `\n║ 📅 ${matchDate}`;
                fixturesMessage += `\n║ ⚽ ${prediction.home} vs ${prediction.away}`;
                fixturesMessage += `\n║ 🎯 ${prediction.prediction} (${prediction.score})`;
                fixturesMessage += `\n╠══════════════════════════════╣`;
            }
            
            fixturesMessage += `\n║ 🔮 *Powered by ZUKO-MD AI*`;
            fixturesMessage += `\n╚══════════════════════════════╝`;
            
            await sock.sendMessage(chatId, {
                text: fixturesMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
            
            return;
        }
        
        // Show team list
        if (args[0] === 'list' || args[0] === 'teams') {
            let teamsMessage = `
╔══════════════════════════════╗
║       ⚽ *PREMIER LEAGUE* ⚽      ║
║          ALL TEAMS           ║
╠══════════════════════════════╣
            `.trim();
            
            const teams = Object.values(PREMIER_LEAGUE_TEAMS).sort((a, b) => b.strength - a.strength);
            
            for (const team of teams) {
                teamsMessage += `\n║ ${team.short} - ${team.name} ⭐${team.strength}/10`;
            }
            
            teamsMessage += `\n╠══════════════════════════════╣`;
            teamsMessage += `\n║ Usage: .premier ARS MCI`;
            teamsMessage += `\n║         .premier fixtures`;
            teamsMessage += `\n╚══════════════════════════════╝`;
            
            await sock.sendMessage(chatId, {
                text: teamsMessage,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420143192043@newsletter',
                        newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                        serverMessageId: -1
                    }
                }
            });
            
            return;
        }
        
        // Default help message
        const helpMessage = `
╔══════════════════════════════╗
║       ⚽ *PREMIER LEAGUE* ⚽      
║         PREDICTION BOT        
╠══════════════════════════════╣
║ 📅 *Date:* ${dateStr}
╠══════════════════════════════╣
║ 📋 *Available Commands:*
║ • .premier [team1] [team2]
║   - Predict specific match
║ • .premier fixtures
║   - Show upcoming predictions
║ • .premier list
║   - Show all teams
╠══════════════════════════════╣
║ 🏆 *Examples:*
║ • .premier ARS MCI
║ • .premier Liverpool City
║ • .premier fixtures
╚══════════════════════════════╝
        `.trim();
        
        await sock.sendMessage(chatId, {
            text: helpMessage,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });

    } catch (error) {
        console.error('Error in premierleague command:', error);
        await sock.sendMessage(chatId, {
            text: '❌ Error generating prediction. Please try again.',
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420143192043@newsletter',
                    newsletterName: '𝐙𝐔𝐊𝐎-𝐌𝐃',
                    serverMessageId: -1
                }
            }
        });
    }
}

module.exports = premierLeagueCommand;