const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'setbalance',
  aliases: ['setbal'],
  permission: 'admin',
  description: '[ADMIN] Đặt số dư cho user (reply).',
  usage: '/setbalance <số_tiền> (reply user)',
  async execute({ bot, msg, args }) {
    const target = msg.reply_to_message?.from;
    const amount = Math.floor(Number(args[0]));
    if (!target) return bot.sendMessage(msg.chat.id, 'Hãy reply vào người cần set tiền.');
    if (!Number.isFinite(amount) || amount < 0) return bot.sendMessage(msg.chat.id, 'Số tiền không hợp lệ.');

    updateUser(target.id, (u) => {
      u.balance = amount;
      return u;
    });

    return bot.sendMessage(msg.chat.id, `✅ Đã set số dư của ${target.first_name || target.id} thành ${amount}`);
  }
};
