import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'hug',
    description: 'Send a hug to someone',
    aliases: ['cuddle', 'embrace'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'hug', 'hugged', '🤗');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};