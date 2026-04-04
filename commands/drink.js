import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'drink',
    description: 'Drink something',
    aliases: ['beverage', 'sip'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'drink', 'drank with', '🥤');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};