const fs = require('fs');
const path = require('path');

// Expanded list of emojis for command reactions
const commandEmojis = [
    '👍', '👎', '❤️', '🔥', '🥰', '👏', '😁', '🤔', '🤯', 
    '😱', '🤬', '😢', '🎉', '🤩', '🤮', '💩', '🙏', '👌',
    '🕊️', '🤡', '🥱', '🥴', '😍', '🐳', '🌚', '🌭', '💯',
    '🤣', '⚡', '🍌', '🏆', '💔', '🤨', '😐', '🍓', '🍾',
    '💋', '🖕', '😈', '😴', '😭', '🤓', '👻', '👨‍💻', '👀',
    '🎃', '🙈', '😇', '😨', '🤝', '✍️', '🤗', '🫡', '🎅',
    '🎄', '☃️', '💅', '🤪', '🥸', '😎', '🤠', '👾', '🤖'
];

// Path for storing auto-reaction state
const USER_GROUP_DATA = path.join(__dirname, '../data/userGroupData.json');

// Load auto-reaction state from file
function loadAutoReactionState() {
    try {
        if (fs.existsSync(USER_GROUP_DATA)) {
            const data = JSON.parse(fs.readFileSync(USER_GROUP_DATA));
            return {
                global: data.autoReaction?.global || false,
                groups: data.autoReaction?.groups || {},
                emojiList: data.autoReaction?.emojiList || commandEmojis
            };
        }
    } catch (error) {
        console.error('Error loading auto-reaction state:', error);
    }
    return {
        global: false,
        groups: {},
        emojiList: commandEmojis
    };
}

// Save auto-reaction state to file
function saveAutoReactionState(state) {
    try {
        const data = fs.existsSync(USER_GROUP_DATA) 
            ? JSON.parse(fs.readFileSync(USER_GROUP_DATA))
            : { groups: [], chatbot: {} };
        
        data.autoReaction = state;
        fs.writeFileSync(USER_GROUP_DATA, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error saving auto-reaction state:', error);
    }
}

// Store auto-reaction state
let reactionState = loadAutoReactionState();

function getRandomEmoji(groupId = null) {
    // Check if group has custom emoji list
    if (groupId && reactionState.groups[groupId]?.emojiList?.length > 0) {
        const groupEmojis = reactionState.groups[groupId].emojiList;
        return groupEmojis[Math.floor(Math.random() * groupEmojis.length)];
    }
    
    // Use global emoji list
    return reactionState.emojiList[Math.floor(Math.random() * reactionState.emojiList.length)];
}

// Function to add reaction to a command message
async function addCommandReaction(sock, message) {
    try {
        const chatId = message.key.remoteJid;
        const isGroup = chatId.endsWith('@g.us');
        
        // Check if reactions are enabled for this chat
        const isEnabled = isGroup 
            ? reactionState.groups[chatId]?.enabled ?? reactionState.global
            : reactionState.global;
            
        if (!isEnabled || !message?.key?.id) return;
        
        const emoji = getRandomEmoji(chatId);
        await sock.sendMessage(chatId, {
            react: {
                text: emoji,
                key: message.key
            }
        });
    } catch (error) {
        console.error('Error adding command reaction:', error);
    }
}

// Function to handle areact command
async function handleAreactCommand(sock, chatId, message, isOwner) {
    try {
        const isGroup = chatId.endsWith('@g.us');
        const args = message.message?.conversation?.split(' ') || [];
        const action = args[1]?.toLowerCase();
        const subCommand = args[2]?.toLowerCase();
        
        // Owner-only commands
        if (['set', 'list', 'global'].includes(subCommand) && !isOwner) {
            await sock.sendMessage(chatId, { 
                text: '❌ This subcommand is only available for the owner!',
                quoted: message
            });
            return;
        }
        
        // Handle different subcommands
        switch (subCommand) {
            case 'on':
            case 'off':
                if (isGroup) {
                    reactionState.groups[chatId] = reactionState.groups[chatId] || {};
                    reactionState.groups[chatId].enabled = subCommand === 'on';
                    saveAutoReactionState(reactionState);
                    await sock.sendMessage(chatId, { 
                        text: `✅ Auto-reactions have been ${subCommand === 'on' ? 'enabled' : 'disabled'} for this group`,
                        quoted: message
                    });
                } else {
                    await sock.sendMessage(chatId, { 
                        text: '❌ This subcommand only works in groups!',
                        quoted: message
                    });
                }
                break;
                
            case 'set':
                const emojiList = args.slice(3).filter(e => e.trim() !== '');
                if (emojiList.length === 0) {
                    await sock.sendMessage(chatId, { 
                        text: '❌ Please provide at least one emoji',
                        quoted: message
                    });
                    return;
                }
                
                if (isGroup) {
                    reactionState.groups[chatId] = reactionState.groups[chatId] || {};
                    reactionState.groups[chatId].emojiList = emojiList;
                    await sock.sendMessage(chatId, { 
                        text: `✅ Set ${emojiList.length} custom emojis for this group`,
                        quoted: message
                    });
                } else {
                    reactionState.emojiList = emojiList;
                    await sock.sendMessage(chatId, { 
                        text: `✅ Set ${emojiList.length} custom emojis globally`,
                        quoted: message
                    });
                }
                saveAutoReactionState(reactionState);
                break;
                
            case 'list':
                const currentEmojis = isGroup 
                    ? reactionState.groups[chatId]?.emojiList || reactionState.emojiList
                    : reactionState.emojiList;
                    
                await sock.sendMessage(chatId, { 
                    text: `Current emoji list (${currentEmojis.length}):\n${currentEmojis.join(' ')}`,
                    quoted: message
                });
                break;
                
            case 'global':
                reactionState.global = action === 'on';
                saveAutoReactionState(reactionState);
                await sock.sendMessage(chatId, { 
                    text: `✅ Auto-reactions have been ${reactionState.global ? 'enabled' : 'disabled'} globally`,
                    quoted: message
                });
                break;
                
            default:
                const groupStatus = isGroup 
                    ? reactionState.groups[chatId]?.enabled ?? reactionState.global
                    : reactionState.global;
                    
                const statusMessage = [
                    `Auto-reactions are currently ${groupStatus ? 'enabled' : 'disabled'} ${isGroup ? 'in this group' : 'globally'}`,
                    '',
                    'Usage:',
                    '.areact on - Enable for this group',
                    '.areact off - Disable for this group',
                    '.areact set [emojis] - Set custom emoji list',
                    '.areact list - Show current emoji list',
                    '',
                    'Owner-only commands:',
                    '.areact global on - Enable globally',
                    '.areact global off - Disable globally'
                ].join('\n');
                
                await sock.sendMessage(chatId, { 
                    text: statusMessage,
                    quoted: message
                });
        }
    } catch (error) {
        console.error('Error handling areact command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error processing command',
            quoted: message
        });
    }
}

module.exports = {
    addCommandReaction,
    handleAreactCommand,
    getReactionState: () => reactionState
};