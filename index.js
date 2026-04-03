const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const config = require('./config');

if (!config.token) {
  console.error('[LỖI] Chưa có token trong config.json.');
  process.exit(1);
}

const bot = new TelegramBot(config.token, { polling: true });
const commands = new Map();

function loadCommands() {
  const commandDir = path.join(__dirname, 'modules', 'command');
  const files = fs.readdirSync(commandDir).filter((f) => f.endsWith('.js'));

  for (const file of files) {
    const cmdPath = path.join(commandDir, file);
    delete require.cache[require.resolve(cmdPath)];
    const command = require(cmdPath);

    if (!command.name || typeof command.execute !== 'function') {
      console.warn(`[WARN] Bỏ qua ${file} vì thiếu name hoặc execute`);
      continue;
    }

    commands.set(command.name, command);
    if (Array.isArray(command.aliases)) {
      for (const alias of command.aliases) {
        commands.set(alias, command);
      }
    }
  }
}

function loadEvents() {
  const eventDir = path.join(__dirname, 'modules', 'Event');
  const files = fs.readdirSync(eventDir).filter((f) => f.endsWith('.js'));

  for (const file of files) {
    const eventPath = path.join(eventDir, file);
    delete require.cache[require.resolve(eventPath)];
    const event = require(eventPath);

    if (!event.name || typeof event.handle !== 'function') {
      console.warn(`[WARN] Bỏ qua event ${file} vì thiếu name hoặc handle`);
      continue;
    }

    bot.on(event.name, (payload) => event.handle({ bot, payload, commands, config }));
  }
}

loadCommands();
loadEvents();

console.log('[OK] Bot đang chạy với kiến trúc modular (Mirai-inspired).');
