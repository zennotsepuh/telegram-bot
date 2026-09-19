module.exports = async (bot, msg, ctx) => {
    const args = ctx.match?.[2]?.trim()?.split(' ') || [];
    const sub = args[0];
    
    switch (sub) {
        case 'qr':
            const text = args.slice(1).join(' ');
            if (!text) return bot.sendMessage(msg.chat.id, 'Format: /tools qr <text>');
            await bot.sendPhoto(msg.chat.id, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(text)}`);
            break;
        case 'short':
            const url = args[1];
            if (!url) return bot.sendMessage(msg.chat.id, 'Format: /tools short <url>');
            try {
                const res = await require('axios').get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
                bot.sendMessage(msg.chat.id, `🔗 Shortlink: ${res.data}`);
            } catch (e) {
                bot.sendMessage(msg.chat.id, `❌ ${e.message}`);
            }
            break;
        case 'base64':
            const txt = args.slice(1).join(' ');
            bot.sendMessage(msg.chat.id, `📝 Encoded:\n<code>${Buffer.from(txt).toString('base64')}</code>`, { parse_mode: 'HTML' });
            break;
        default:
            bot.sendMessage(msg.chat.id, `🛠️ <b>Tools</b>\n\n/tools qr <text>\n/tools short <url>\n/tools base64 <text>`, { parse_mode: 'HTML' });
    }
};
