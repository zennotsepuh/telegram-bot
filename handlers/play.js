const axios = require('axios');

module.exports = async (bot, msg, ctx) => {
    const query = ctx.match?.[2]?.trim();
    if (!query) return bot.sendMessage(msg.chat.id, '🎵 Format: /play <judul lagu>');
    
    const loading = await bot.sendMessage(msg.chat.id, `⏳ Mencari lagu "${query}"...`);
    try {
        // Gunakan API publik (contoh)
        const res = await axios.get(`https://api.popcat.xyz/lyrics?song=${encodeURIComponent(query)}`);
        const { title, artist, lyrics } = res.data;
        
        if (!lyrics) throw new Error('Lirik tidak ditemukan');
        
        await bot.editMessageText(
            `🎵 <b>${title}</b>\n👤 ${artist}\n\n${lyrics.substring(0, 3500)}`,
            { chat_id: msg.chat.id, message_id: loading.message_id, parse_mode: 'HTML' }
        );
    } catch (e) {
        await bot.editMessageText(`❌ Error: ${e.message}`, {
            chat_id: msg.chat.id,
            message_id: loading.message_id
        });
    }
};
