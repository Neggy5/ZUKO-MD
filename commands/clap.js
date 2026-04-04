import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'clap',
    description: 'Applaud someone',
    aliases: ['applaud', 'claps'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'clap', 'applauded', '👏');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};