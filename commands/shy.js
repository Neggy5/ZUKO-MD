import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'shy',
    description: 'Act shy',
    aliases: ['shyness'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'shy', 'is shy with', '🫣');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};