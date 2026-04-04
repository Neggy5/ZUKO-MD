import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'yeet',
    description: 'Yeet someone into oblivion',
    aliases: ['throw', 'toss'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'yeet', 'yeeted', '🚀');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};