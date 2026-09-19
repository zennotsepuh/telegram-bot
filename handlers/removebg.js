const axios = require('axios');
const config = require('../config');
const FormData = require('form-data');

module.exports = async (bot, msg) => {
    if (!msg.reply_to_message?.photo) {
        return bot.sendMessage(msg.chat.id, '🖼️ Reply foto dengan /removebg');
    }
    if (!config.REMOVEBG_KEY) {
        return bot.sendMessage(msg.chat.id, '⚠️ API key remove.bg belum diset');
    }
    
    const loading = await bot.sendMessage(msg.chat.id, '⏳ Menghapus background...');
    try {
        const fileId = msg.reply_to_message.photo.pop().file_id;
        const fileLink = await bot.getFileLink(fileId);
        const imgRes = await axios.get(fileLink, { responseType: 'arraybuffer' });
        
        const formData = new FormData();
        formData.append('image_file', Buffer.from(imgRes.data), 'image.jpg');
        formData.append('size', 'auto');
        
        const res = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
            headers: { ...formData.getHeaders(), 'X-Api-Key': config.REMOVEBG_KEY },
            responseType: 'arraybuffer'
        });
        
        await bot.sendPhoto(msg.chat.id, Buffer.from(res.data), { caption: '✅ Background dihapus!' });
        await bot.deleteMessage(msg.chat.id, loading.message_id);
    } catch (e) {
        await bot.editMessageText(`❌ Error: ${e.message}`, {
            chat_id: msg.chat.id,
            message_id: loading.message_id
        });
    }
};
