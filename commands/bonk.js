import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'bonk',
    description: 'Send someone to horny jail with a bonk',
    aliases: ['hornyjail', 'bonkgo'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'bonk', 'bonked', '🔨');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};