/**
 * LiveScore Command - Get real-time football live scores
 * ES Module version with button support
 * Uses Football-Data.org API (free tier)
 */

import { ButtonManager } from '../utils/buttonManager.js';
import axios from 'axios';
import moment from 'moment-timezone';

// Your actual API key
const API_KEY = '3129b3e1ad6a49959e0de4581c593b05';

// League codes mapping
const LEAGUES = {
    'pl': { code: 'PL', name: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    'pd': { code: 'PD', name: '🇪🇸 La Liga', emoji: '🇪🇸' },
    'bl1': { code: 'BL1', name: '🇩🇪 Bundesliga', emoji: '🇩🇪' },
    'sa': { code: 'SA', name: '🇮🇹 Serie A', emoji: '🇮🇹' },
    'fl1': { code: 'FL1', name: '🇫🇷 Ligue 1', emoji: '🇫🇷' },
    'cl': { code: 'CL', name: '🏆 Champions League', emoji: '🏆' },
    'el': { code: 'EL', name: '🏆 Europa League', emoji: '🏆' },
    'wc': { code: 'WC', name: '🌍 World Cup', emoji: '🌍' },
    'ec': { code: 'EC', name: '🏆 European Championship', emoji: '🏆' }
};

export default {
    name: 'livescore',
    description: 'Get real-time football live scores',
    aliases: ['score', 'live', 'football', 'scores', 'livescores'],
    
    async execute(sock, msg, args, context) {
        const { from, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        await react('⚽');
        
        const action = args[0]?.toLowerCase();
        const leagueCode = args[1]?.toLowerCase();
        
        // Show help menu
        if (!action || action === 'help') {
            const leagueList = Object.entries(LEAGUES).map(([key, league]) => 
                `${league.emoji} *${key.toUpperCase()}* - ${league.name}`
            ).join('\n┃\n┃ ');
            
            await buttons.sendButtons(from, {
                text: `⚽ *ＬＩＶＥ ＳＣＯＲＥ ＣＯＭＭＡＮＤＳ* ⚽\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *Commands:*\n` +
                      `┃ • ${prefix}livescore live - Live scores\n` +
                      `┃ • ${prefix}livescore fixtures - Today's matches\n` +
                      `┃ • ${prefix}livescore standings PL - League table\n` +
                      `┃ • ${prefix}livescore scorers PL - Top scorers\n` +
                      `┃\n` +
                      `┃ *League Codes:*\n` +
                      `┃ ${leagueList}\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃ ${prefix}livescore live\n` +
                      `┃ ${prefix}livescore fixtures PL\n` +
                      `┃ ${prefix}livescore standings SA\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '⚽ LIVE SCORES', id: 'livescore_live', type: 'reply' },
                    { text: '📅 FIXTURES', id: 'livescore_fixtures', type: 'reply' },
                    { text: '🏆 STANDINGS', id: 'livescore_standings', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('⏳');
        
        try {
            const apiConfig = {
                headers: {
                    'X-Auth-Token': API_KEY
                }
            };
            
            // Handle different commands
            if (action === 'live') {
                // Get live matches
                const response = await axios.get('https://api.football-data.org/v4/matches', {
                    ...apiConfig,
                    params: { status: 'LIVE' }
                });
                
                const matches = response.data.matches || [];
                
                if (matches.length === 0) {
                    await buttons.sendButtons(from, {
                        text: `⚽ *ＮＯ ＬＩＶＥ ＭＡＴＣＨＥＳ* ⚽\n\n` +
                              `No live matches at the moment.\n\n` +
                              `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                        buttons: [
                            { text: '🔄 REFRESH', id: 'livescore_live', type: 'reply' },
                            { text: '📅 FIXTURES', id: 'livescore_fixtures', type: 'reply' },
                            { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                        ]
                    }, msg);
                    await react('✅');
                    return;
                }
                
                let liveText = `⚽ *ＬＩＶＥ ＳＣＯＲＥＳ* ⚽\n\n` +
                              `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
                
                for (const match of matches.slice(0, 10)) {
                    const homeTeam = match.homeTeam?.name || 'Unknown';
                    const awayTeam = match.awayTeam?.name || 'Unknown';
                    const homeScore = match.score?.fullTime?.home ?? match.score?.halfTime?.home ?? '-';
                    const awayScore = match.score?.fullTime?.away ?? match.score?.halfTime?.away ?? '-';
                    const minute = match.status === 'LIVE' ? (match.minute || '?') : match.status;
                    const competition = match.competition?.name || 'Unknown';
                    
                    liveText += `┃ 🏆 *${competition}*\n`;
                    liveText += `┃ ${homeTeam} ${homeScore} - ${awayScore} ${awayTeam}\n`;
                    liveText += `┃ ⏱️ ${minute}'\n┃\n`;
                }
                
                liveText += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
                
                await buttons.sendButtons(from, {
                    text: liveText,
                    buttons: [
                        { text: '🔄 REFRESH', id: 'livescore_live', type: 'reply' },
                        { text: '📅 FIXTURES', id: 'livescore_fixtures', type: 'reply' },
                        { text: '🏆 STANDINGS', id: 'livescore_standings', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                
            } else if (action === 'fixtures') {
                // Get today's fixtures
                const today = moment().format('YYYY-MM-DD');
                const league = LEAGUES[leagueCode] || LEAGUES.pl;
                
                const response = await axios.get(`https://api.football-data.org/v4/competitions/${league.code}/matches`, {
                    ...apiConfig,
                    params: { dateFrom: today, dateTo: today }
                });
                
                const matches = response.data.matches || [];
                
                if (matches.length === 0) {
                    await reply(`📅 No fixtures for ${league.name} today.`);
                    await react('✅');
                    return;
                }
                
                let fixturesText = `📅 *ＦＩＸＴＵＲＥＳ - ${league.name}* 📅\n\n` +
                                  `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
                
                for (const match of matches.slice(0, 10)) {
                    const homeTeam = match.homeTeam?.name || 'Unknown';
                    const awayTeam = match.awayTeam?.name || 'Unknown';
                    const time = match.utcDate ? moment(match.utcDate).format('HH:mm') : 'TBD';
                    
                    fixturesText += `┃ ${homeTeam} vs ${awayTeam}\n`;
                    fixturesText += `┃ 🕐 ${time}\n┃\n`;
                }
                
                fixturesText += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
                
                await buttons.sendButtons(from, {
                    text: fixturesText,
                    buttons: [
                        { text: '⚽ LIVE', id: 'livescore_live', type: 'reply' },
                        { text: '🔄 REFRESH', id: 'livescore_fixtures', type: 'reply' },
                        { text: '🏆 STANDINGS', id: 'livescore_standings', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                
            } else if (action === 'standings') {
                // Get league standings
                const league = LEAGUES[leagueCode] || LEAGUES.pl;
                
                const response = await axios.get(`https://api.football-data.org/v4/competitions/${league.code}/standings`, apiConfig);
                
                const standing = response.data.standings?.[0]?.table || [];
                
                if (standing.length === 0) {
                    await reply(`📊 No standings available for ${league.name}`);
                    await react('✅');
                    return;
                }
                
                let standingsText = `🏆 *ＳＴＡＮＤＩＮＧＳ - ${league.name}* 🏆\n\n` +
                                   `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
                
                for (let i = 0; i < Math.min(10, standing.length); i++) {
                    const team = standing[i];
                    const position = team.position;
                    const name = team.team?.name || 'Unknown';
                    const points = team.points;
                    const played = team.playedGames;
                    const goalDiff = team.goalDifference;
                    
                    standingsText += `┃ ${position}. ${name.substring(0, 25)}\n`;
                    standingsText += `┃    P:${played} | Pts:${points} | GD:${goalDiff}\n┃\n`;
                }
                
                standingsText += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
                
                await buttons.sendButtons(from, {
                    text: standingsText,
                    buttons: [
                        { text: '⚽ LIVE', id: 'livescore_live', type: 'reply' },
                        { text: '📅 FIXTURES', id: 'livescore_fixtures', type: 'reply' },
                        { text: '🏆 OTHER LEAGUE', id: 'livescore_standings', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                
            } else if (action === 'scorers') {
                // Get top scorers
                const league = LEAGUES[leagueCode] || LEAGUES.pl;
                
                const response = await axios.get(`https://api.football-data.org/v4/competitions/${league.code}/scorers`, apiConfig);
                
                const scorers = response.data.scorers || [];
                
                if (scorers.length === 0) {
                    await reply(`⚽ No scorer data available for ${league.name}`);
                    await react('✅');
                    return;
                }
                
                let scorersText = `⚽ *ＴＯＰ ＳＣＯＲＥＲＳ - ${league.name}* ⚽\n\n` +
                                 `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n┃\n`;
                
                for (let i = 0; i < Math.min(10, scorers.length); i++) {
                    const scorer = scorers[i];
                    const name = scorer.player?.name || 'Unknown';
                    const team = scorer.team?.name || 'Unknown';
                    const goals = scorer.goals;
                    const assists = scorer.assists || 0;
                    
                    scorersText += `┃ ${i + 1}. ${name.substring(0, 25)}\n`;
                    scorersText += `┃    ⚽ ${goals} goals | 🎯 ${assists} assists\n`;
                    scorersText += `┃    🏆 ${team.substring(0, 25)}\n┃\n`;
                }
                
                scorersText += `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
                
                await buttons.sendButtons(from, {
                    text: scorersText,
                    buttons: [
                        { text: '⚽ LIVE', id: 'livescore_live', type: 'reply' },
                        { text: '🏆 STANDINGS', id: 'livescore_standings', type: 'reply' },
                        { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                    ]
                }, msg);
                
            } else {
                await reply(`❌ Unknown command: ${action}\n\nUse ${prefix}livescore help for available commands.`);
            }
            
            await react('✅');
            
        } catch (error) {
            console.error('LiveScore error:', error);
            
            let errorMsg = '❌ Failed to fetch live scores.';
            if (error.response?.status === 429) {
                errorMsg = '❌ Rate limit exceeded. Please wait a minute and try again.';
            } else if (error.response?.status === 401) {
                errorMsg = '❌ Invalid API key. Please check your configuration.';
            } else if (error.response?.status === 403) {
                errorMsg = '❌ API key is valid but you may need to verify your email or upgrade your plan.';
            }
            
            await buttons.sendButtons(from, {
                text: errorMsg,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'livescore_live', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            await react('❌');
        }
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};