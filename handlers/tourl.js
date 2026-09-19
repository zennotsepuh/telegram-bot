const axios = require('axios');
const FormData = require('form-data');

module.exports = async (bot, msg) => {
    if (!msg.reply_to_message?.photo && !msg.reply_to_message?.document) {
        return bot.sendMessage(msg.chat.id, '🔗 Reply file/foto dengan /tourl');
    }
    
    const loading = await bot.sendMessage(msg.chat.id, '⏳ Uploading...');
    try {
        const fileId = (msg.reply_to_message.photo || [msg.reply_to_message.document]).pop().file_id;
        const fileLink = await bot.getFileLink(fileId);
        const res = await axios.get(fileLink, { responseType: 'arraybuffer' });
        
        const formData = new FormData();
        formData.append('file', Buffer.from(res.data), 'file');
        
        const upload = await axios.post('https://0x0.st', formData, { headers: formData.getHeaders() });
        await bot.editMessageText(`🔗 URL: ${upload.data}`, {
            chat_id: msg.chat.id,
            message_id: loading.message_id
        });
    } catch (e) {
        await bot.editMessageText(`❌ Error: ${e.message}`, {
            chat_id: msg.chat.id,
            message_id: loading.message_id
        });
    }
};
