import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'eat',
    description: 'Eat something',
    aliases: ['food', 'hungry'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'eat', 'ate', '🍔');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};