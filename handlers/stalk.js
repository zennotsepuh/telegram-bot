const axios = require('axios');

module.exports = async (bot, msg, ctx) => {
    const username = ctx.match?.[2]?.trim();
    if (!username) return bot.sendMessage(msg.chat.id, '🕵️ Format: /stalk <username_github>');
    
    try {
        const res = await axios.get(`https://api.github.com/users/${username}`);
        const u = res.data;
        await bot.sendPhoto(msg.chat.id, u.avatar_url, {
            caption: `🕵️ <b>GitHub Info</b>\n\n👤 Nama: ${u.name || '-'}\n📛 Username: ${u.login}\n👥 Followers: ${u.followers}\n📦 Repos: ${u.public_repos}\n📝 Bio: ${u.bio || '-'}`,
            parse_mode: 'HTML'
        });
    } catch (e) {
        bot.sendMessage(msg.chat.id, `❌ User tidak ditemukan`);
    }
};
