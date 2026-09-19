// domain.js
module.exports = async (bot, msg) => {
    bot.sendMessage(msg.chat.id, `🌐 <b>DOMAIN MENU</b>\n\nRegistrar:\n• Namecheap\n• Cloudflare\n• Rumahweb\n\n<i>Cari domain murah disini</i>`, { parse_mode: 'HTML' });
};
