// store.js
module.exports = async (bot, msg) => {
    bot.sendMessage(msg.chat.id, `🏪 <b>STORE MENU</b>\n\n/produk - Lihat produk\n\nSegera hadir!`, { parse_mode: 'HTML' });
};
