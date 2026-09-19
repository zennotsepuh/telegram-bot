module.exports = async (bot, msg, ctx) => {
    const text = ctx.match?.[2]?.trim();
    if (!text) return bot.sendMessage(msg.chat.id, '💬 Format: /brat <text>');
    
    const url = `https://api.lolhuman.xyz/api/brat?apikey=YOUR_KEY&text=${encodeURIComponent(text)}`;
    // Placeholder — butuh API key
    bot.sendMessage(msg.chat.id, '⚠️ Butuh API key untuk fitur brat. Isi di .env');
};
