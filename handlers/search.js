const axios = require('axios');

module.exports = async (bot, msg, ctx) => {
    const query = ctx.match?.[2]?.trim();
    if (!query) return bot.sendMessage(msg.chat.id, '🔍 Format: /search <query>');
    
    try {
        const res = await axios.get(`https://api.popcat.xyz/wikipedia/${encodeURIComponent(query)}`);
        const { title, summary, image } = res.data;
        
        if (image) {
            await bot.sendPhoto(msg.chat.id, image, {
                caption: `🔍 <b>${title}</b>\n\n${summary?.substring(0, 800)}`,
                parse_mode: 'HTML'
            });
        } else {
            await bot.sendMessage(msg.chat.id, `🔍 <b>${title}</b>\n\n${summary?.substring(0, 800)}`, { parse_mode: 'HTML' });
        }
    } catch (e) {
        bot.sendMessage(msg.chat.id, `❌ Error: ${e.message}`);
    }
};
