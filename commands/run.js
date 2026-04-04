import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'run',
    description: 'Run away from someone',
    aliases: ['escape', 'flee'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'run', 'ran away from', '🏃');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};