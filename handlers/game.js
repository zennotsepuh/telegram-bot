module.exports = async (bot, msg) => {
    const games = [
        '🎮 /family100 - Family 100',
        '🎯 /ff - Krakter Free Fire',
        '🎲 /fun - Fun Games'
    ].join('\n');
    bot.sendMessage(msg.chat.id, `🎮 <b>GAME MENU</b>\n\n${games}`, { parse_mode: 'HTML' });
};
