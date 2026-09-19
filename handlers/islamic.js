const axios = require('axios');

module.exports = async (bot, msg, ctx) => {
    const sub = ctx.match?.[2]?.trim()?.split(' ')[0]?.toLowerCase() || '';
    const args = ctx.match?.[2]?.trim()?.split(' ').slice(1)?.join(' ');
    
    if (sub === 'shalat') {
        const kota = args || 'jakarta';
        try {
            const res = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Indonesia`);
            const t = res.data.data.timings;
            await bot.sendMessage(msg.chat.id, `
🕌 <b>JADWAL SHALAT - ${kota.toUpperCase()}</b>

🌅 Subuh: ${t.Fajr}
☀️ Dzuhur: ${t.Dhuhr}
🌇 Ashar: ${t.Asr}
🌙 Maghrib: ${t.Maghrib}
🌃 Isya: ${t.Isha}
            `, { parse_mode: 'HTML' });
        } catch (e) {
            bot.sendMessage(msg.chat.id, `❌ ${e.message}`);
        }
    } else if (sub === 'doa') {
        bot.sendMessage(msg.chat.id, `🕌 Doa harian:\n\n"Bismillah... doa-doa pendek akan muncul disini."`);
    } else {
        bot.sendMessage(msg.chat.id, `🕌 <b>ISLAMIC MENU</b>\n\n/islamic shalat <kota>\n/islamic doa`, { parse_mode: 'HTML' });
    }
};
