const config = require('../config');

module.exports = async (bot, msg) => {
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const mins = Math.floor((uptime % 3600) / 60);
    const secs = Math.floor(uptime % 60);
    
    bot.sendMessage(msg.chat.id, `
ℹ️ <b>INFO BOT</b>

🤖 Nama: ${config.BOT_NAME}
📦 Versi: ${config.VERSION}
⏰ Runtime: ${hours}j ${mins}m ${secs}s
🟢 Status: Online
👤 Owner: @${config.OWNER_ID}
📡 Platform: Node.js
    `, { parse_mode: 'HTML' });
};
