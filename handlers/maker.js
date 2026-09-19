module.exports = async (bot, msg, ctx) => {
    const text = ctx.match?.[2]?.trim();
    if (!text) return bot.sendMessage(msg.chat.id, '🎨 Format: /maker <teks>\n\nMembuat logo sederhana.');
    
    const url = `https://api.popcat.xyz/pooh?text=${encodeURIComponent(text)}`;
    try {
        await bot.sendPhoto(msg.chat.id, url, { caption: `🎨 Maker: ${text}` });
    } catch (e) {
        bot.sendMessage(msg.chat.id, `❌ Error: ${e.message}`);
    }
};
