import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'slap',
    description: 'Slap someone with an animated GIF',
    aliases: ['hit', 'smack'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'slap', 'slapped', '👋');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};