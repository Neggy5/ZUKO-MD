import { sendReaction } from '../utils/reactionHelper.js';

export default {
    name: 'drunk',
    description: 'Act drunk',
    aliases: ['drink', 'alcohol'],
    
    async execute(sock, msg, args, context) {
        context.args = args;
        await sendReaction(sock, msg, context, 'drunk', 'got drunk with', '🍺');
    },
    
    ownerOnly: false,
    groupOnly: false,
    adminOnly: false
};