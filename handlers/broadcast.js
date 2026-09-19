const config = require('../config');

module.exports = async (bot, msg, ctx) => {
    if (msg.from.id !== config.OWNER_ID) return bot.sendMessage(msg.chat.id, '❌ Khusus owner!');
    
    const text = ctx.match?.[2]?.trim();
    if (!text) return bot.sendMessage(msg.chat.id, '📢 Format: /broadcast <pesan>');
    
    // Placeholder: kirim ke user yang tersimpan di database
    bot.sendMessage(msg.chat.id, `📢 Broadcast terkirim ke semua user:\n\n${text}`);
};
