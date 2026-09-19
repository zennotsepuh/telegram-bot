module.exports = async (bot, msg, ctx) => {
    const sub = ctx.match?.[2]?.trim()?.split(' ')[0] || '';
    
    const fun = {
        quote: '💡 "Jangan takut gagal, takutlah tidak mencoba pepek."',
        meme: '😄 Kirim /fun meme untuk meme random kontol',
        fakta: '📖 Fakta: Madu tidak pernah basi.'
    };
    
    if (!sub) {
        return bot.sendMessage(msg.chat.id, `😄 <b>FUN MENU</b>\n\n/fun quote\n/fun fakta\n/fun meme`, { parse_mode: 'HTML' });
    }
    
    bot.sendMessage(msg.chat.id, fun[sub] || '❓ Sub-menu tidak ada');
};
