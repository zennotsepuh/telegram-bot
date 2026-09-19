module.exports = async (bot, msg) => {
    if (!msg.reply_to_message?.document) {
        return bot.sendMessage(msg.chat.id, '🔒 Reply file .js dengan /obf untuk obfuscate');
    }
    bot.sendMessage(msg.chat.id, '⚠️ Fitur obfuscate butuh library javascript-obfuscator. Install dulu.');
};
