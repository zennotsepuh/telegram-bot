const config = require('../config');

module.exports = async (bot, msg, ctx) => {
    if (msg.from.id !== config.OWNER_ID) {
        return bot.sendMessage(msg.chat.id, '❌ Khusus owner!');
    }
    
    bot.sendMessage(msg.chat.id, `
👑 <b>OWNER MENU</b>

/owner stats - Statistik bot
/owner users - List user
/owner restart - Restart bot
/broadcast - Kirim pesan massal
    `, { parse_mode: 'HTML' });
};
