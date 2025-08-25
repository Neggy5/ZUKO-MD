const crypto = require('crypto');

const passwordCommand = {
    name: 'password',
    aliases: ['pw', 'genpw'],
    description: 'Generate secure passwords',
    async execute(sock, chatId, message, args) {
        try {
            // Default configuration
            let length = 12;
            let includeNumbers = true;
            let includeSymbols = true;
            let excludeSimilar = true;
            
            // Parse arguments
            args.forEach(arg => {
                const [key, value] = arg.split('=');
                if (!value) return;
                
                switch(key.toLowerCase()) {
                    case 'length':
                        length = parseInt(value) || 12;
                        break;
                    case 'numbers':
                        includeNumbers = value.toLowerCase() === 'true';
                        break;
                    case 'symbols':
                        includeSymbols = value.toLowerCase() === 'true';
                        break;
                    case 'similar':
                        excludeSimilar = value.toLowerCase() === 'true';
                        break;
                }
            });

            // Validate length (6-32 characters)
            length = Math.min(Math.max(length, 6), 32);
            
            // Character sets
            const lowercase = 'abcdefghjkmnpqrstuvwxyz';
            const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
            const numbers = includeNumbers ? '23456789' : '';
            const symbols = includeSymbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '';
            let similarChars = excludeSimilar ? 'iloILO10' : '';
            
            // Combine allowed characters
            let charset = lowercase + uppercase;
            if (includeNumbers) charset += numbers;
            if (includeSymbols) charset += symbols;
            
            // Remove similar characters if needed
            if (excludeSimilar) {
                charset = charset.split('').filter(c => !similarChars.includes(c)).join('');
            }
            
            // Generate secure password using crypto module
            let password = '';
            const randomBytes = crypto.randomBytes(length);
            for (let i = 0; i < length; i++) {
                password += charset[randomBytes[i] % charset.length];
            }
            
            // Format response
            const options = [
                `🔢 Numbers: ${includeNumbers ? '✅' : '❌'}`,
                `🔣 Symbols: ${includeSymbols ? '✅' : '❌'}`,
                `👥 Similar Chars: ${excludeSimilar ? '❌ Excluded' : '✅ Included'}`
            ].join('\n');
            
            await sock.sendMessage(chatId, {
                text: `🔐 *Generated Password*\n\n` +
                      `📏 Length: ${length}\n` +
                      `${options}\n\n` +
                      `\`\`\`${password}\`\`\`\n\n` +
                      `⚠️ Keep this password secure!`,
                ...global.channelInfo
            });
            
        } catch (error) {
            console.error('Password generation error:', error);
            await sock.sendMessage(chatId, {
                text: '❌ Failed to generate password. Please try again.',
                ...global.channelInfo
            });
        }
    }
};

module.exports = passwordCommand;