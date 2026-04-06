/**
 * Obfuscate Command - Obfuscate JavaScript code from text or file
 * ES Module version with button support
 */

import { ButtonManager } from '../utils/buttonManager.js';
import { downloadContentFromMessage } from '@kelvdra/baileys';
import JavaScriptObfuscator from 'javascript-obfuscator';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    name: 'obfuscate',
    description: 'Obfuscate JavaScript code from text or file',
    aliases: ['obf', 'js-obfuscate', 'obfuscator'],
    
    async execute(sock, msg, args, context) {
        const { from, reply, react, prefix = '.' } = context;
        const buttons = new ButtonManager(sock);
        
        await react('🔒');
        
        // Get quoted message
        const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        let code = '';
        let sourceType = 'text';
        
        // Check if quoted message is a document (file)
        if (quotedMsg?.documentMessage) {
            const docMsg = quotedMsg.documentMessage;
            const fileName = docMsg.fileName || '';
            const mimeType = docMsg.mimetype || '';
            
            // Check if it's a JavaScript file
            if (fileName.endsWith('.js') || mimeType === 'application/javascript' || mimeType === 'text/javascript') {
                sourceType = 'file';
                await react('📥');
                
                try {
                    // Download the file
                    const stream = await downloadContentFromMessage(docMsg, 'document');
                    let buffer = Buffer.from([]);
                    for await (const chunk of stream) {
                        buffer = Buffer.concat([buffer, chunk]);
                    }
                    code = buffer.toString('utf8');
                    
                    await reply(`📄 File detected: ${fileName}\n📦 Size: ${(buffer.length / 1024).toFixed(2)} KB\n⏳ Obfuscating...`);
                } catch (err) {
                    await reply(`❌ Failed to download file: ${err.message}`);
                    await react('❌');
                    return;
                }
            } else {
                await reply(`❌ Only JavaScript (.js) files are supported!\n\nReceived: ${fileName || 'Unknown file'}`);
                await react('❌');
                return;
            }
        }
        // Check if quoted message is text
        else if (quotedMsg?.conversation) {
            code = quotedMsg.conversation;
        } 
        else if (quotedMsg?.extendedTextMessage?.text) {
            code = quotedMsg.extendedTextMessage.text;
        } 
        else if (args.length > 0) {
            code = args.join(' ');
        }
        
        if (!code) {
            await buttons.sendButtons(from, {
                text: `❌ *ＮＯ ＣＯＤＥ ＯＲ ＦＩＬＥ ＦＯＵＮＤ*\n\n` +
                      `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                      `┃\n` +
                      `┃ *How to use:*\n` +
                      `┃\n` +
                      `┃ 📝 *Via Text:*\n` +
                      `┃ 1️⃣ Send JavaScript code\n` +
                      `┃ 2️⃣ Reply to it with: ${prefix}obfuscate\n` +
                      `┃\n` +
                      `┃ 📁 *Via File:*\n` +
                      `┃ 1️⃣ Send a .js file\n` +
                      `┃ 2️⃣ Reply to the file with: ${prefix}obfuscate\n` +
                      `┃\n` +
                      `┃ *Options:*\n` +
                      `┃ --compact - Compact output\n` +
                      `┃ --low - Low obfuscation\n` +
                      `┃ --medium - Medium obfuscation\n` +
                      `┃ --high - High obfuscation (default)\n` +
                      `┃ --max - Maximum obfuscation\n` +
                      `┃\n` +
                      `┃ *Examples:*\n` +
                      `┃ ${prefix}obfuscate --medium\n` +
                      `┃ ${prefix}obfuscate --compact\n` +
                      `┃\n` +
                      `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '📖 HELP', id: 'obfuscate_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            return;
        }
        
        await react('⏳');
        
        // Parse options
        let level = 'high';
        let compact = false;
        
        if (args.includes('--low') || args.includes('-l')) {
            level = 'low';
        } else if (args.includes('--medium') || args.includes('-m')) {
            level = 'medium';
        } else if (args.includes('--high') || args.includes('-h')) {
            level = 'high';
        } else if (args.includes('--max') || args.includes('-x')) {
            level = 'max';
        }
        
        if (args.includes('--compact') || args.includes('-c')) {
            compact = true;
        }
        
        try {
            // Configure obfuscation options based on level
            let options = {
                compact: compact,
                controlFlowFlattening: false,
                deadCodeInjection: false,
                debugProtection: false,
                disableConsoleOutput: false,
                identifierNamesGenerator: 'hexadecimal',
                renameGlobals: false,
                rotateStringArray: true,
                selfDefending: false,
                shuffleStringArray: true,
                splitStrings: false,
                stringArray: true,
                stringArrayEncoding: [],
                stringArrayThreshold: 0.75,
                unicodeEscapeSequence: false
            };
            
            switch (level) {
                case 'low':
                    options = {
                        compact: compact,
                        stringArray: true,
                        stringArrayThreshold: 0.5,
                        rotateStringArray: true,
                        shuffleStringArray: true
                    };
                    break;
                    
                case 'medium':
                    options = {
                        compact: compact,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 0.5,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0.2,
                        stringArray: true,
                        stringArrayThreshold: 0.75,
                        rotateStringArray: true,
                        shuffleStringArray: true
                    };
                    break;
                    
                case 'high':
                    options = {
                        compact: compact,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 0.75,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 0.4,
                        debugProtection: false,
                        disableConsoleOutput: false,
                        identifierNamesGenerator: 'hexadecimal',
                        renameGlobals: false,
                        rotateStringArray: true,
                        selfDefending: false,
                        shuffleStringArray: true,
                        splitStrings: true,
                        splitStringsChunkLength: 10,
                        stringArray: true,
                        stringArrayEncoding: ['rc4'],
                        stringArrayThreshold: 0.8,
                        unicodeEscapeSequence: false
                    };
                    break;
                    
                case 'max':
                    options = {
                        compact: compact,
                        controlFlowFlattening: true,
                        controlFlowFlatteningThreshold: 1,
                        deadCodeInjection: true,
                        deadCodeInjectionThreshold: 1,
                        debugProtection: true,
                        debugProtectionInterval: true,
                        disableConsoleOutput: true,
                        identifierNamesGenerator: 'mangled',
                        renameGlobals: true,
                        rotateStringArray: true,
                        selfDefending: true,
                        shuffleStringArray: true,
                        splitStrings: true,
                        splitStringsChunkLength: 5,
                        stringArray: true,
                        stringArrayEncoding: ['rc4', 'base64'],
                        stringArrayThreshold: 1,
                        transformObjectKeys: true,
                        unicodeEscapeSequence: true
                    };
                    break;
            }
            
            // Obfuscate the code
            const obfuscated = JavaScriptObfuscator.obfuscate(code, options);
            const result = obfuscated.getObfuscatedCode();
            
            // Calculate stats
            const originalSize = code.length;
            const obfuscatedSize = result.length;
            const compression = ((1 - obfuscatedSize / originalSize) * 100).toFixed(2);
            const linesCount = code.split('\n').length;
            const obfuscatedLines = result.split('\n').length;
            
            // Create temp directory for file output
            const tempDir = path.join(__dirname, '../temp');
            if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
            
            // Save obfuscated code to file
            const outputFileName = sourceType === 'file' 
                ? `obfuscated_${Date.now()}.js`
                : `obfuscated_code_${Date.now()}.js`;
            const outputPath = path.join(tempDir, outputFileName);
            fs.writeFileSync(outputPath, result);
            
            // Prepare caption
            const caption = `🔒 *ＯＢＦＵＳＣＡＴＥＤ ＣＯＤＥ* 🔒\n\n` +
                          `╭━━━❲ ᴢᴜᴋᴏ ᴍᴅ ❳━━━╮\n` +
                          `┃\n` +
                          `┃ 📊 *Statistics:*\n` +
                          `┃ ├ 📦 Original: ${(originalSize / 1024).toFixed(2)} KB\n` +
                          `┃ ├ 🔒 Obfuscated: ${(obfuscatedSize / 1024).toFixed(2)} KB\n` +
                          `┃ ├ 📈 Compression: ${compression}%\n` +
                          `┃ ├ 📄 Lines: ${linesCount} → ${obfuscatedLines}\n` +
                          `┃ ├ 🎚️ Level: ${level.toUpperCase()}\n` +
                          `┃ ├ 📝 Source: ${sourceType === 'file' ? 'File upload' : 'Text input'}\n` +
                          `┃ └ 📁 Output: ${outputFileName}\n` +
                          `┃\n` +
                          `╰━━━━━━━━━━━━━━━━━━━━━╯\n\n` +
                          `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`;
            
            // Send as file (better for large code)
            await sock.sendMessage(from, {
                document: fs.readFileSync(outputPath),
                fileName: outputFileName,
                mimetype: 'application/javascript',
                caption: caption
            }, { quoted: msg });
            
            // Also send a preview if code is not too large
            if (result.length < 2000) {
                await sock.sendMessage(from, {
                    text: `📋 *ＰＲＥＶＩＥＷ*\n\n\`\`\`javascript\n${result.substring(0, 1500)}\n\`\`\`${result.length > 1500 ? '\n...(truncated)' : ''}`
                }, { quoted: msg });
            }
            
            // Clean up temp file
            try {
                fs.unlinkSync(outputPath);
            } catch (e) {}
            
            await buttons.sendButtons(from, {
                text: `✅ *ＯＢＦＵＳＣＡＴＩＯＮ ＣＯＭＰＬＥＴＥ* ✅\n\n` +
                      `Code obfuscated successfully with ${level.toUpperCase()} level!\n\n` +
                      `The obfuscated file has been sent above.`,
                buttons: [
                    { text: '🔒 OBFUSCATE AGAIN', id: 'obfuscate', type: 'reply' },
                    { text: '📖 HELP', id: 'obfuscate_help', type: 'reply' },
                    { text: '🏠 MENU', id: 'menu_main', type: 'reply' }
                ]
            }, msg);
            
            await react('✅');
            
        } catch (error) {
            console.error('Obfuscate error:', error);
            
            let errorMsg = error.message;
            if (errorMsg.includes('Unexpected token')) {
                errorMsg = 'Invalid JavaScript code. Please check your syntax.';
            }
            
            await buttons.sendButtons(from, {
                text: `❌ *ＯＢＦＵＳＣＡＴＩＯＮ ＦＡＩＬＥＤ* ❌\n\n` +
                      `Error: ${errorMsg}\n\n` +
                      `⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴢᴜᴋᴏ ᴍᴅ ⚡`,
                buttons: [
                    { text: '🔄 TRY AGAIN', id: 'obfuscate', type: 'reply' },
                    { text: '📖 HELP', id: 'obfuscate_help', type: 'reply' },
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