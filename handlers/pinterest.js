const axios = require('axios');

module.exports = async (bot, msg, ctx) => {
    const query = ctx.match?.[2]?.trim();
    if (!query) return bot.sendMessage(msg.chat.id, '📌 Format: /pinterest <keyword>');
    
    const loading = await bot.sendMessage(msg.chat.id, '⏳ Mencari di Pinterest...');
    try {
        // Gunakan API publik
        const res = await axios.get(`https://api.pinterest.com/v1/search/pins/?query=${encodeURIComponent(query)}`);
        const pins = res.data?.data || [];
        
        if (!pins.length) throw new Error('Tidak ada hasil');
        
        for (let i = 0; i < Math.min(pins.length, 5); i++) {
            await bot.sendPhoto(msg.chat.id, pins[i].image.original.url);
        }
        
        await bot.deleteMessage(msg.chat.id, loading.message_id);
    } catch (e) {
        await bot.editMessageText(`❌ Error: ${e.message}`, {
            chat_id: msg.chat.id,
            message_id: loading.message_id
        });
    }
};
