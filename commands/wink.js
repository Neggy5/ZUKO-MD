import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'wink',
    description: 'Wink at someone',
    aliases: ['winks'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'wink', 'winked at', '😉');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};