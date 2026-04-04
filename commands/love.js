import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'love',
    description: 'Send love to someone',
    aliases: ['heart', 'luv'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'love', 'loves', '❤️');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};