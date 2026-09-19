const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs-extra');
const path = require('path');
const config = require('./config');

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

// Handler Utils
const utils = {
    isOwner: (userId) => userId === config.OWNER_ID,
    formatDate: () => new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
    readJSON: (file) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf-8')) : {},
    writeJSON: (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2))
};

// Cooldown map
const cooldowns = new Map();
function checkCooldown(userId) {
    const now = Date.now();
    const last = cooldowns.get(userId) || 0;
    const diff = config.COOLDOWN - (now - last);
    if (diff > 0) return Math.ceil(diff / 1000);
    cooldowns.set(userId, now);
    return 0;
}

// Load all handlers
const handlers = {};
const handlerDir = path.join(__dirname, 'handlers');
if (fs.existsSync(handlerDir)) {
    fs.readdirSync(handlerDir).forEach(file => {
        if (file.endsWith('.js')) {
            const name = file.replace('.js', '');
            try {
                handlers[name] = require(path.join(handlerDir, file));
                console.log(`✅ Loaded handler: ${name}`);
            } catch (e) {
                console.log(`❌ Failed handler ${name}: ${e.message}`);
            }
        }
    });
}

// ============================================================
// START COMMAND (with JPG + AUDIO)
// ============================================================
bot.onText(/^\/start/, async (msg) => {
    const chatId = msg.chat.id;
    const name = msg.from.first_name || 'User';

    // Kirim audio dulu
    if (fs.existsSync(config.WELCOME_AUDIO)) {
        await bot.sendAudio(chatId, config.WELCOME_AUDIO, {
            caption: `🎧 Selamat datang, ${name}!`
        }).catch(() => {});
    }

    // Kirim JPG + menu
    const menuText = `👋 Halo <b>${name}</b>!

Selamat datang di <b>${config.BOT_NAME}</b> v${config.VERSION}
Pilih menu di bawah untuk mulai ya kontol:

<b>🤖 AI & TOOLS</b>
/ai /remini /removebg /maker /download /search /tools

<b>🎮 GAME & FUN</b>
/game /fun /family100 /ff

<b>👤 USER</b>
/info /store /produk /touRL /hdfoto

<b>🛡️ GROUP & OWNER</b>
/jagagrup /broadcast /owner /obf

<b>⚙️ LAINNYA</b>
/play /pinterest /stalk /islamic /cerpen /convert
/brat /vps /domain /cpanel /ptro /hoyo /imagewelcome

Ketik /menu untuk melihat semua menu lengkap.`;

    if (fs.existsSync(config.WELCOME_IMAGE)) {
        await bot.sendPhoto(chatId, config.WELCOME_IMAGE, {
            caption: menuText,
            parse_mode: 'HTML',
            reply_markup: {
                inline_keyboard: [
                    [{ text: '📋 BUKA MENU', callback_data: 'open_menu' }],
                    [
                        { text: '🤖 AI', callback_data: 'menu_ai' },
                        { text: '🎮 GAME', callback_data: 'menu_game' }
                    ],
                    [
                        { text: '🛠️ TOOLS', callback_data: 'menu_tools' },
                        { text: 'ℹ️ INFO', callback_data: 'menu_info' }
                    ]
                ]
            }
        }).catch(async () => {
            await bot.sendMessage(chatId, menuText, { parse_mode: 'HTML' });
        });
    } else {
        await bot.sendMessage(chatId, menuText, { parse_mode: 'HTML' });
    }
});

// ============================================================
// MENU COMMAND
// ============================================================
bot.onText(/^\/menu/, (msg) => {
    if (handlers.menu) return handlers.menu(bot, msg, { utils });
    
    const menus = Object.entries(config.MENUS)
        .map(([k, v]) => `/${k.toLowerCase()} - ${v}`).join('\n');
    bot.sendMessage(msg.chat.id, `📋 <b>DAFTAR MENU</b>\n\n${menus}`, { parse_mode: 'HTML' });
});

// ============================================================
// AUTO ROUTER
// ============================================================
const routes = {
    ai: 'ai', pinterest: 'pinterest', play: 'play', remini: 'remini',
    removebg: 'removebg', maker: 'maker', download: 'download', search: 'search',
    stalk: 'stalk', tools: 'tools', game: 'game', fun: 'fun', owner: 'owner',
    jagagrup: 'jagagrup', family100: 'family100', ff: 'ff', store: 'store',
    info: 'info', hdfoto: 'hdfoto', tourl: 'tourl', broadcast: 'broadcast',
    brat: 'brat', vps: 'vps', domain: 'domain', produk: 'produk', cpanel: 'cpanel',
    imagewelcome: 'imagewelcome', obf: 'obf', ptro: 'ptro', hoyo: 'hoyo',
    islamic: 'islamic', cerpen: 'cerpen', convert: 'convert'
};

for (const [cmd, handlerName] of Object.entries(routes)) {
    bot.onText(new RegExp(`^/${cmd}(\\s+([\\s\\S]+))?$`), async (msg, match) => {
        const handler = handlers[handlerName];
        if (handler) {
            try {
                await handler(bot, msg, { match, utils, cooldown: checkCooldown(msg.from.id) });
            } catch (e) {
                bot.sendMessage(msg.chat.id, `❌ Error: ${e.message}`);
            }
        } else {
            bot.sendMessage(msg.chat.id, `⚠️ Menu /${cmd} belum tersedia.`);
        }
    });
}

// ============================================================
// CALLBACK QUERY
// ============================================================
bot.on('callback_query', async (query) => {
    const { data, message } = query;
    const chatId = message.chat.id;
    const menuName = data.replace('menu_', '');
    
    if (data === 'open_menu') {
        const menus = Object.entries(config.MENUS)
            .map(([k, v]) => `• /${k.toLowerCase()} - ${v}`).join('\n');
        return bot.sendMessage(chatId, `📋 <b>SEMUA MENU</b>\n\n${menus}`, { parse_mode: 'HTML' });
    }
    
    const handler = handlers[menuName];
    if (handler && typeof handler.showMenu === 'function') {
        return handler.showMenu(bot, chatId);
    }
    
    bot.sendMessage(chatId, `📂 Menu <b>${menuName.toUpperCase()}</b> - coming soon!`, { parse_mode: 'HTML' });
});

// ============================================================
// ERROR HANDLING
// ============================================================
bot.on('polling_error', (err) => console.log('⚠️ Polling error:', err.message));

process.on('uncaughtException', (err) => console.log('❌ Uncaught:', err.message));
process.on('unhandledRejection', (err) => console.log('❌ Unhandled:', err));

console.log(`🚀 ${config.BOT_NAME} v${config.VERSION} running...`);
