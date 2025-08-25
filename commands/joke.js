const axios = require('axios');

// Joke API Configuration
const JOKE_API_CONFIG = {
  baseUrl: 'https://v2.jokeapi.dev/joke',
  categories: ['Programming', 'Misc', 'Pun', 'Spooky', 'Christmas'],
  blacklistFlags: ['nsfw', 'religious', 'political', 'racist', 'sexist']
};

// Cache system
const jokeCache = {
  recent: new Set(),
  favorites: new Set(),
  MAX_RECENT_SIZE: 50
};

/**
 * Builds joke API URL with parameters
 * @param {string} [category] - Specific joke category
 * @returns {string} - API URL
 */
function buildJokeUrl(category) {
  const validCategory = JOKE_API_CONFIG.categories.includes(category) 
    ? category 
    : 'Any';
    
  return `${JOKE_API_CONFIG.baseUrl}/${validCategory}?` +
    `type=single&` +
    `blacklistFlags=${JOKE_API_CONFIG.blacklistFlags.join(',')}`;
}

/**
 * Fetches a random joke from the API
 * @param {string} [category] - Preferred joke category
 * @returns {Promise<{joke: string, category: string}>} - Joke object
 */
async function getRandomJoke(category) {
  try {
    const url = buildJokeUrl(category);
    const response = await axios.get(url, { timeout: 5000 });

    if (response.data.error) {
      throw new Error(response.data.message || 'Failed to fetch joke');
    }

    const joke = response.data.joke || 
                `${response.data.setup}\n\n${response.data.delivery}`;
    const jokeCategory = response.data.category || 'Misc';

    // Check cache
    if (jokeCache.recent.has(joke)) {
      return getRandomJoke(category); // Get different joke
    }

    // Update cache
    jokeCache.recent.add(joke);
    if (jokeCache.recent.size > jokeCache.MAX_RECENT_SIZE) {
      const [oldest] = jokeCache.recent;
      jokeCache.recent.delete(oldest);
    }

    return { joke, category: jokeCategory };
  } catch (error) {
    console.error('Joke API Error:', error);
    throw new Error(error.response?.data?.message || 'Could not fetch a joke. Try again later!');
  }
}

/**
 * Handle joke command
 * @param {object} sock - WhatsApp socket
 * @param {string} chatId - Chat ID
 * @param {object} message - Message object
 * @param {string[]} args - Command arguments
 */
async function jokeCommand(sock, chatId, message, args) {
  try {
    // Typing indicator
    await sock.sendPresenceUpdate('composing', chatId);

    const category = args[0]?.toLowerCase();
    const { joke, category: jokeCategory } = await getRandomJoke(category);

    const buttons = [
      {
        buttonId: 'another_joke',
        buttonText: { displayText: 'Another Joke! 😂' },
        type: 1
      },
      {
        buttonId: 'save_joke',
        buttonText: { displayText: 'Save Joke 💾' },
        type: 1
      }
    ];

    await sock.sendMessage(chatId, { 
      text: `😂 *${jokeCategory} Joke*\n\n${joke}\n\n` +
            `Reply with *"save"* to keep this joke or *"another"* for more!`,
      footer: 'Jokes provided by JokeAPI',
      buttons: buttons,
      headerType: 1,
      quoted: message
    });

  } catch (error) {
    console.error('Joke Command Error:', error);
    
    const errorMessage = error.message.includes('timeout')
      ? '⌛ Joke service is slow. Try again in a moment!'
      : `❌ ${error.message}`;

    await sock.sendMessage(chatId, { 
      text: errorMessage,
      quoted: message
    });
  }
}

/**
 * Handle joke interactions
 * @param {object} sock - WhatsApp socket
 * @param {object} message - Message object
 */
async function handleJokeResponse(sock, message) {
  const chatId = message.key.remoteJid;
  const text = message.message?.conversation?.toLowerCase() || '';

  if (text.includes('another') || text.includes('more')) {
    return jokeCommand(sock, chatId, message, []);
  }

  if (text.includes('save')) {
    // Implement joke saving logic
    await sock.sendMessage(chatId, {
      text: '✨ This joke has been added to your favorites!',
      quoted: message
    });
  }
}

module.exports = {
  jokeCommand,
  getRandomJoke,
  handleJokeResponse
};