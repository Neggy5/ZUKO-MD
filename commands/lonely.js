import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'lonely',
    description: 'Express loneliness',
    aliases: ['alone', 'sad'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'lonely', 'feels lonely with', '🥺');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};