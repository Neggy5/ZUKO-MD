import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'nervous',
    description: 'Act nervous',
    aliases: ['anxious', 'scared'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'nervous', 'is nervous for', '😬');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};