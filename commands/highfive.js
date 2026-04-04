import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'highfive',
    description: 'Give someone a high five',
    aliases: ['high5', 'h5'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'highfive', 'high-fived', '✋');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};