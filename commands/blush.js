import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'blush',
    description: 'Blush at someone',
    aliases: ['blushes'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'blush', 'blushed at', '😊');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};