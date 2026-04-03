const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'deposit',
  aliases: ['dep'],
  description: 'Gửi tiền từ ví vào bank.',
  usage: '/deposit <số_tiền|all>',
  async execute({ bot, msg, args }) {
    const user = updateUser(msg.from.id, (u) => {
      const amount = args[0] === 'all' ? u.balance : Math.floor(Number(args[0]));
      if (!Number.isFinite(amount) || amount <= 0 || amount > u.balance) return u;
      u.balance -= amount;
      u.bank += amount;
      u._amount = amount;
      return u;
    });

    if (!user._amount) return bot.sendMessage(msg.chat.id, '❌ Số tiền gửi không hợp lệ.');
    return bot.sendMessage(msg.chat.id, `🏦 Đã gửi ${user._amount} vào ngân hàng.`);
  }
};
