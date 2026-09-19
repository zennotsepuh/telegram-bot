module.exports = async (bot, msg, ctx) => {
    const char = ctx.match?.[2]?.trim();
    const list = ['Genshin Impact', 'Honkai Star Rail', 'Honkai Impact 3', 'Tears of Themis', 'Zenless Zone Zero'];
    
    if (!char) {
        return bot.sendMessage(msg.chat.id, `⚔️ <b>HOYO MENU</b>\n\nGame:\n${list.map(g => `• ${g}`).join('\n')}`, { parse_mode: 'HTML' });
    }
    
    bot.sendMessage(msg.chat.id, `⚔️ Info karakter ${char} - coming soon`);
};
