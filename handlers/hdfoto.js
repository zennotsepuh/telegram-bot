module.exports = async (bot, msg) => {
    if (!msg.reply_to_message?.photo) {
        return bot.sendMessage(msg.chat.id, '📸 Reply foto dengan /hdfoto');
    }
    bot.sendMessage(msg.chat.id, '⚠️ Butuh API upscale berbayar. Isi di .env');
};
