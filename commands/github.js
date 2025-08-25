const moment = require('moment-timezone');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

async function githubCommand(sock, chatId, message) {
  try {
    // Validate inputs
    if (!sock || !chatId || !message) {
      throw new Error('Invalid command parameters');
    }

    // Fetch repository data
    const res = await fetch('https://api.github.com/repos/Neggy5/ZUKO-MD', {
      headers: {
        'User-Agent': 'ZUKO-MD-Bot',
        'Accept': 'application/vnd.github.v3+json'
      },
      timeout: 5000
    });

    if (!res.ok) {
      throw new Error(`GitHub API responded with status ${res.status}`);
    }

    const json = await res.json();

    // Format response text
    const txt = `
*乂  𝐙𝐔𝐊𝐎-𝐌𝐃  乂*

✩  *Name* : ${json.name || 'Not available'}
✩  *Watchers* : ${json.watchers_count || 0}
✩  *Size* : ${json.size ? (json.size / 1024).toFixed(2) + ' MB' : 'Unknown'}
✩  *Last Updated* : ${json.updated_at ? moment(json.updated_at).format('DD/MM/YY - HH:mm:ss') : 'Unknown'}
✩  *URL* : ${json.html_url || 'https://github.com/Neggy5/ZUKO-MD'}
✩  *Forks* : ${json.forks_count || 0}
✩  *Stars* : ${json.stargazers_count || 0}

💥 *𝐙𝐔𝐊𝐎-𝐌𝐃*
    `.trim();

    // Handle the image file
    const imgPath = path.join(__dirname, '../assets/bot_image.jpg');
    
    if (!fs.existsSync(imgPath)) {
      return await sock.sendMessage(chatId, { 
        text: txt,
        mentions: []
      }, { quoted: message });
    }

    const imgBuffer = fs.readFileSync(imgPath);
    
    await sock.sendMessage(chatId, 
      { 
        image: imgBuffer, 
        caption: txt,
        mentions: []
      }, 
      { quoted: message }
    );

  } catch (error) {
    console.error('GitHub command error:', error);
    
    const fallbackText = `
*乂  𝐙𝐔𝐊𝐎-𝐌𝐃  乂*

✩  *Name* : ZUKO-MD
✩  *URL* : https://github.com/Neggy5/ZUKO-MD

⚠️ Couldn't fetch live stats. Visit the repo for details.
    `.trim();

    await sock.sendMessage(chatId, 
      { 
        text: fallbackText,
        mentions: []
      }, 
      { quoted: message }
    );
  }
}

module.exports = githubCommand;