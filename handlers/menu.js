const config = require('../config');

module.exports = async (bot, msg) => {
    const menus = Object.entries(config.MENUS)
        .map(([k, v]) => `/menu_${k.toLowerCase()} - ${v}`)
        .join('\n');
    
    await bot.sendMessage(msg.chat.id, `📋 <b>DAFTAR MENU LENGKAP</b>\n\n${menus}`, {
        parse_mode: 'HTML'
    });
};
