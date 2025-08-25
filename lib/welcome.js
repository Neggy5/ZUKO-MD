const { addWelcome, delWelcome, isWelcomeOn } = require('../lib/index');
const { delay } = require('@whiskeysockets/baileys');

async function welcomeCommand(sock, chatId, message, args) {
    const isGroup = chatId.endsWith('@g.us');
    
    if (!isGroup) {
        await sock.sendMessage(chatId, {
            text: '❌ This command can only be used in groups!',
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
    
    const sender = message.key.participant || message.key.remoteJid;
    
    // Check if user is admin
    const { isSenderAdmin } = await require('../lib/isAdmin')(sock, chatId, sender);
    
    if (!isSenderAdmin && !message.key.fromMe) {
        await sock.sendMessage(chatId, {
            text: '❌ Only group admins can configure welcome messages!',
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
    
    // Get the text after .welcome command
    const text = message.message?.conversation || 
                message.message?.extendedTextMessage?.text || '';
    
    const match = text.split(' ').slice(1).join(' ');
    
    if (!match) {
        return await sock.sendMessage(chatId, {
            text: `📥 *Welcome Message Setup*\n\nUse the following commands:\n\n✅ *.welcome on* — Enable welcome messages\n🛠️ *.welcome set Your custom message* — Set a custom welcome message\n🚫 *.welcome off* — Disable welcome messages\n\n*Available Variables:*\n• {user} - Mentions the new member\n• {group} - Shows group name\n• {description} - Shows group description`,
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

    const [command, ...commandArgs] = match.split(' ');
    const lowerCommand = command.toLowerCase();
    const customMessage = commandArgs.join(' ');

    if (lowerCommand === 'on') {
        if (await isWelcomeOn(chatId)) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Welcome messages are *already enabled*.',
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
        await addWelcome(chatId, true, null);
        return await sock.sendMessage(chatId, { 
            text: '✅ Welcome messages *enabled*. Use *.welcome set [your message]* to customize.',
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

    if (lowerCommand === 'off') {
        if (!(await isWelcomeOn(chatId))) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Welcome messages are *already disabled*.',
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
        await delWelcome(chatId);
        return await sock.sendMessage(chatId, { 
            text: '✅ Welcome messages *disabled* for this group.',
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

    if (lowerCommand === 'set') {
        if (!customMessage) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Please provide a custom welcome message. Example: *.welcome set Welcome to the group!*',
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
        await addWelcome(chatId, true, customMessage);
        return await sock.sendMessage(chatId, { 
            text: '✅ Custom welcome message *set successfully*.',
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

    // If no valid command is provided
    return await sock.sendMessage(chatId, {
        text: `❌ Invalid command. Use:\n*.welcome on* - Enable\n*.welcome set [message]* - Set custom message\n*.welcome off* - Disable`,
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

module.exports = {
    welcomeCommand
};