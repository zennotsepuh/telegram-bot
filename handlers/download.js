module.exports = async (bot, msg, ctx) => {
    const url = ctx.match?.[2]?.trim();
    if (!url) return bot.sendMessage(msg.chat.id, '⬇️ Format: /download <url>\n\nSupport: TikTok, IG, YouTube (via API publik)');
    bot.sendMessage(msg.chat.id, '⚠️ Fitur download butuh API pihak ketiga. Isi endpoint di handler/download.js');
};
