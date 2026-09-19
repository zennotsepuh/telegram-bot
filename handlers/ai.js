const axios = require('axios');
const config = require('../config');

module.exports = async (bot, msg, ctx) => {
    const prompt = ctx.match?.[2]?.trim();
    if (!prompt) return bot.sendMessage(msg.chat.id, '🤖 Format: /ai <pertanyaan>');
    
    if (!config.OPENAI_KEY) {
        return bot.sendMessage(msg.chat.id, '⚠️ API Key belum diset di .env');
    }
    
    const loading = await bot.sendMessage(msg.chat.id, '⏳ AI sedang berpikir...');
    
    try {
        const res = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }]
        }, {
            headers: { 'Authorization': `Bearer ${config.OPENAI_KEY}` }
        });
        
        const answer = res.data.choices[0].message.content;
        await bot.editMessageText(answer, {
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
