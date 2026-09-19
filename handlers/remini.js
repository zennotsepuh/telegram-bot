module.exports = async (bot, msg) => {
    if (!msg.reply_to_message?.photo) {
        return bot.sendMessage(msg.chat.id, '✨ Reply foto dengan /remini untuk HD kan.');
    }
    await bot.sendMessage(msg.chat.id, '⚠️ Remini API berbayar. Silakan isi API key di .env');
};
