import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'greedy',
    description: 'Act greedy',
    aliases: ['money', 'rich'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'greedy', 'is greedy with', '🤑');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};