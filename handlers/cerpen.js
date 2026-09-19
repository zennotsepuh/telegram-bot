const cerpen = [
    `📖 <b>Cerpen: Kesuksesan Sejati</b>\n\nSeorang pemuda bertanya pada gurunya, "Apa itu sukses?" Guru tersenyum dan berkata, "Sukses adalah ketika kau bisa bermanfaat untuk orang lain."`,
    `📖 <b>Cerpen: Kegagalan Berharga</b>\n\nThomas Edison gagal 1000 kali sebelum menemukan lampu. Dia berkata, "Aku tidak gagal, aku menemukan 1000 cara yang tidak berhasil."`,
    `📖 <b>Cerpen: Sabar</b>\n\nSeorang petani menanam padi. Setiap hari ia menyirami dan merawat. Setelah 3 bulan, ia panen dengan hasil melimpah. Kesabaran membuahkan hasil.`
];

module.exports = async (bot, msg) => {
    const story = cerpen[Math.floor(Math.random() * cerpen.length)];
    bot.sendMessage(msg.chat.id, story, { parse_mode: 'HTML' });
};
