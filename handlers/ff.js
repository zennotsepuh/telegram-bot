const chars = [
    { name: 'Alok', ability: 'Drop the Beat' },
    { name: 'Chrono', ability: 'Time Turner' },
    { name: 'Kelly', ability: 'Dash' },
    { name: 'Hayato', ability: 'Bushido' },
    { name: 'Wukong', ability: 'Camouflage' }
];

module.exports = async (bot, msg, ctx) => {
    const q = ctx.match?.[2]?.trim()?.toLowerCase();
    if (!q) {
        const list = chars.map(c => `• ${c.name}`).join('\n');
        return bot.sendMessage(msg.chat.id, `🎯 <b>KRAKTER FF</b>\n\n${list}\n\nKetik: /ff <nama>`, { parse_mode: 'HTML' });
    }
    
    const found = chars.find(c => c.name.toLowerCase() === q);
    if (!found) return bot.sendMessage(msg.chat.id, '❌ Karakter tidak ditemukan');
    
    bot.sendMessage(msg.chat.id, `🎯 <b>${found.name}</b>\n⚡ Skill: ${found.ability}`, { parse_mode: 'HTML' });
};
