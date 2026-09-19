// vps.js
module.exports = async (bot, msg) => {
    bot.sendMessage(msg.chat.id, `💻 <b>VPS MENU</b>\n\nRekomendasi VPS:\n• Kontabo - kontabo.com\n• Vultr - vultr.com\n• DigitalOcean - digitalocean.com\n\n<i>Afiliasi link support bot</i>`, { parse_mode: 'HTML' });
};
