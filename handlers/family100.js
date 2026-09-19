const questions = [
    { q: 'Sebutkan 5 makanan Indonesia', a: ['nasi goreng','sate','rendang','gado-gado','bakso'] },
    { q: 'Sebutkan 5 hewan berkaki 4', a: ['kucing','anjing','sapi','kambing','kuda'] },
    { q: 'Sebutkan 5 warna pelangi', a: ['merah','jingga','kuning','hijau','biru'] }
];

module.exports = async (bot, msg) => {
    const q = questions[Math.floor(Math.random() * questions.length)];
    msg._family100 = msg._family100 || {};
    msg._family100[msg.chat.id] = q;
    
    bot.sendMessage(msg.chat.id, `👨‍👩‍👧 <b>FAMILY 100</b>\n\n${q.q}\n\nJawab langsung di chat!`, { parse_mode: 'HTML' });
};

module.exports.checkAnswer = (chatId, text) => {
    return null; // Logic jawaban
};
