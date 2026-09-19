module.exports = async (bot, msg, ctx) => {
    const text = ctx.match?.[2]?.trim();
    if (!text) return bot.sendMessage(msg.chat.id, '🖼️ Format: /imagewelcome <text>');
    
    const url = `https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/6m5XpQ4.png&text1=${encodeURIComponent(text)}&text2=Welcome`;
    try {
        await bot.sendPhoto(msg.chat.id, url);
    } catch (e) {
        bot.sendMessage(msg.chat.id, `❌ ${e.message}`);
    }
};
