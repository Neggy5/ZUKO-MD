const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

// Configuration
const TEMP_DIR = path.join(__dirname, '../temp');
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB

// Obfuscation methods with fallbacks
const OBFUSCATION_METHODS = [
    {
        name: 'javascript-obfuscator',
        install: 'npm install -g javascript-obfuscator',
        command: (input, output) => `javascript-obfuscator ${input} --output ${output} --compact true --control-flow-flattening true --numbers-to-expressions true`
    },
    {
        name: 'babel-minify',
        install: 'npm install -g babel-minify',
        command: (input, output) => `minify ${input} --out-file ${output}`
    },
    {
        name: 'uglify-js',
        install: 'npm install -g uglify-js',
        command: (input, output) => `uglifyjs ${input} -o ${output} -c -m`
    }
];

async function obfuscateJS(sock, chatId, message) {
    try {
        // Ensure temp directory exists
        if (!fs.existsSync(TEMP_DIR)) {
            fs.mkdirSync(TEMP_DIR, { recursive: true });
        }

        // Check for quoted JS file
        const quotedMsg = message.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const isJSFile = quotedMsg?.documentMessage?.fileName?.endsWith('.js');

        if (!isJSFile) {
            return sock.sendMessage(chatId, {
                text: '❌ Please quote/reply to a .js file\nExample: reply to a JS file with `.obfuscate`'
            });
        }

        // Download the file
        const buffer = await sock.downloadMediaMessage(message);
        if (buffer.length > MAX_FILE_SIZE) {
            return sock.sendMessage(chatId, {
                text: `❌ File too large (max ${MAX_FILE_SIZE/1024}KB allowed)`
            });
        }

        const fileHash = crypto.createHash('md5').update(buffer).digest('hex');
        const inputPath = path.join(TEMP_DIR, `input_${fileHash}.js`);
        const outputPath = path.join(TEMP_DIR, `obfuscated_${fileHash}.js`);

        fs.writeFileSync(inputPath, buffer);

        // Try each obfuscation method until one works
        let obfuscationSuccess = false;
        let lastError = null;

        for (const method of OBFUSCATION_METHODS) {
            try {
                await sock.sendMessage(chatId, { 
                    text: `⏳ Trying ${method.name}...` 
                });

                // Check if tool is installed
                try {
                    await exec(`${method.name} --version`);
                } catch (e) {
                    await sock.sendMessage(chatId, { 
                        text: `⚠️ Installing ${method.name}...` 
                    });
                    await exec(method.install);
                }

                await exec(method.command(inputPath, outputPath));
                
                if (fs.existsSync(outputPath)) {
                    obfuscationSuccess = true;
                    break;
                }
            } catch (e) {
                lastError = e;
                console.error(`Obfuscation with ${method.name} failed:`, e);
                // Try next method
            }
        }

        if (!obfuscationSuccess) {
            throw lastError || new Error('All obfuscation methods failed');
        }

        // Verify obfuscated file
        const obfuscatedContent = fs.readFileSync(outputPath, 'utf8');
        if (!obfuscatedContent.trim()) {
            throw new Error('Obfuscation produced empty file');
        }

        // Send obfuscated file
        await sock.sendMessage(chatId, {
            document: fs.readFileSync(outputPath),
            fileName: `obfuscated_${quotedMsg.documentMessage.fileName}`,
            mimetype: 'application/javascript',
            caption: '🔒 Obfuscated JavaScript File',
            quoted: message
        });

    } catch (error) {
        console.error('JS obfuscation error:', error);
        await sock.sendMessage(chatId, {
            text: `❌ Obfuscation failed:\n${error.message}\n\n` +
                  `Possible solutions:\n` +
                  `1. Ensure file is valid JavaScript\n` +
                  `2. Server has npm/node.js installed\n` +
                  `3. File size < 1MB\n` +
                  `4. Try a simpler file`
        });
    } finally {
        // Cleanup temp files
        try {
            const files = fs.readdirSync(TEMP_DIR);
            const now = Date.now();
            files.forEach(file => {
                const filePath = path.join(TEMP_DIR, file);
                const stat = fs.statSync(filePath);
                // Delete files older than 1 hour
                if (now - stat.mtimeMs > 3600000) {
                    fs.unlinkSync(filePath);
                }
            });
        } catch (e) {
            console.error('Cleanup error:', e);
        }
    }
}

module.exports = obfuscateJS;