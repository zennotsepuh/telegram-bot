// cpanel.js
module.exports = async (bot, msg) => {
    bot.sendMessage(msg.chat.id, `⚙️ <b>cPanel MENU</b>\n\nHosting cPanel:\n• Rumahweb\n• Hostinger\n• Niagahoster`, { parse_mode: 'HTML' });
};
