const { transfer } = require('../utils/economy');

module.exports = {
  name: 'pay',
  description: 'Chuyển tiền cho người khác (reply).',
  usage: '/pay <số_tiền> (reply)',
  async execute({ bot, msg, args }) {
    const target = msg.reply_to_message?.from;
    const amount = Math.floor(Number(args[0]));
    if (!target) return bot.sendMessage(msg.chat.id, 'Hãy reply người nhận tiền.');
    if (!Number.isFinite(amount) || amount <= 0) return bot.sendMessage(msg.chat.id, 'Nhập số tiền hợp lệ.');

    const res = transfer(msg.from.id, target.id, amount);
    if (!res.ok) return bot.sendMessage(msg.chat.id, `❌ ${res.reason}`);

    return bot.sendMessage(msg.chat.id, `💸 Đã gửi ${amount} cho ${target.first_name || target.id}`);
  }
};
