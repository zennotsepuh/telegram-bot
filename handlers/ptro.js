module.exports = async (bot, msg, ctx) => {
    const text = ctx.match?.[2]?.trim();
    if (!text) return bot.sendMessage(msg.chat.id, '🎨 Format: /ptro <text>');
    
    // Placeholder - buat poster text via API
    const url = `https://api.popcat.xyz/pooh?text=${encodeURIComponent(text)}`;
    bot.sendPhoto(msg.chat.id, url, { caption: `🎨 PTRO: ${text}` });
};
