module.exports = async (bot, msg, ctx) => {
    const sub = ctx.match?.[2]?.trim()?.split(' ')[0]?.toLowerCase();
    
    if (sub === 'img2pdf') {
        if (!msg.reply_to_message?.photo) return bot.sendMessage(msg.chat.id, 'Reply foto dengan /convert img2pdf');
        bot.sendMessage(msg.chat.id, '⚠️ Butuh library tambahan (pdfkit). Install dulu.');
    } else {
        bot.sendMessage(msg.chat.id, `🔄 <b>CONVERT MENU</b>\n\n/convert img2pdf\n/convert img2sticker\n/convert audio2voice`, { parse_mode: 'HTML' });
    }
};
