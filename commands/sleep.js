import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'sleep',
    description: 'Go to sleep',
    aliases: ['zzz', 'sleepy'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'sleep', 'slept on', '😴');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};