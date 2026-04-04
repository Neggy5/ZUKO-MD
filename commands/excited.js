import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'excited',
    description: 'Show excitement',
    aliases: ['hyped', 'excite'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'excited', 'is excited for', '🤩');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};