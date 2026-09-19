const config = require('../config');

module.exports = async (bot, msg, ctx) => {
    if (msg.from.id !== config.OWNER_ID) return bot.sendMessage(msg.chat.id, '❌ Khusus owner!');
    
    const sub = ctx.match?.[2]?.trim()?.split(' ')[0];
    const chatId = msg.chat.id;
    
    switch (sub) {
        case 'on':
            bot.sendMessage(chatId, '✅ Jaga grup: ON');
            break;
        case 'off':
            bot.sendMessage(chatId, '❌ Jaga grup: OFF');
            break;
        default:
            bot.sendMessage(chatId, `🛡️ <b>JAGA GRUP MENU</b>\n\n/jagagrup on - Aktifkan\n/jagagrup off - Matikan\n\n<b>Fitur:</b>\n- Anti link\n- Anti spam\n- Anti toxic`, { parse_mode: 'HTML' });
    }
};
