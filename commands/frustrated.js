import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'frustrated',
    description: 'Express frustration',
    aliases: ['frustrate', 'annoyed'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'frustrated', 'is frustrated at', '😤');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};