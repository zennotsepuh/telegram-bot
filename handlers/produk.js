// produk.js
module.exports = async (bot, msg) => {
    const produk = [
        { nama: 'Paket Premium 1 Bulan', harga: 'Rp 25.000' },
        { nama: 'Paket Premium 3 Bulan', harga: 'Rp 60.000' },
        { nama: 'VPS 1GB RAM', harga: 'Rp 50.000/bulan' }
    ];
    
    const list = produk.map((p, i) => `${i+1}. ${p.nama} - ${p.harga}`).join('\n');
    bot.sendMessage(msg.chat.id, `📦 <b>PRODUK</b>\n\n${list}`, { parse_mode: 'HTML' });
};
