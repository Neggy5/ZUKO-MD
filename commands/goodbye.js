const { addGoodbye, delGoodBye, isGoodByeOn } = require('../lib/index');
const { delay } = require('@whiskeysockets/baileys');

async function goodbyeCommand(sock, chatId, message, args) {
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
            text: '❌ Only group admins can configure goodbye messages!',
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
    
    // Get the text after .goodbye command
    const text = message.message?.conversation || 
                message.message?.extendedTextMessage?.text || '';
    
    const match = text.split(' ').slice(1).join(' ');
    
    if (!match) {
        return await sock.sendMessage(chatId, {
            text: `📤 *Goodbye Message Setup*\n\nUse the following commands:\n\n✅ *.goodbye on* — Enable goodbye messages\n🛠️ *.goodbye Your custom message* — Set a custom goodbye message\n🚫 *.goodbye off* — Disable goodbye messages\n\n*Available Variables:*\n• {user} - Mentions the leaving member\n• {group} - Shows group name`,
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

    const lower = match.toLowerCase();

    if (lower === 'on') {
        if (await isGoodByeOn(chatId)) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Goodbye messages are *already enabled*.',
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
        await addGoodbye(chatId, true, null);
        return await sock.sendMessage(chatId, { 
            text: '✅ Goodbye messages *enabled*. Use *.goodbye [your message]* to customize.',
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

    if (lower === 'off') {
        if (!(await isGoodByeOn(chatId))) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Goodbye messages are *already disabled*.',
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
        await delGoodBye(chatId);
        return await sock.sendMessage(chatId, { 
            text: '✅ Goodbye messages *disabled* for this group.',
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

    await delay(2000);
    await addGoodbye(chatId, true, match);
    return await sock.sendMessage(chatId, { 
        text: '✅ Custom goodbye message *set successfully*.',
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
    goodbyeCommand
};