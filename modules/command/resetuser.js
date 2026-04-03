const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'resetuser',
  permission: 'owner',
  description: '[OWNER] Reset dữ liệu user (reply).',
  usage: '/resetuser (reply user)',
  async execute({ bot, msg }) {
    const target = msg.reply_to_message?.from;
    if (!target) return bot.sendMessage(msg.chat.id, 'Hãy reply vào user cần reset.');

    const file = path.join(__dirname, '..', '..', 'data', 'users', `${target.id}.json`);
    if (fs.existsSync(file)) fs.unlinkSync(file);

    return bot.sendMessage(msg.chat.id, `🗑️ Đã reset dữ liệu của ${target.first_name || target.id}`);
  }
};
