const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'withdraw',
  aliases: ['with'],
  description: 'Rút tiền từ bank về ví.',
  usage: '/withdraw <số_tiền|all>',
  async execute({ bot, msg, args }) {
    const user = updateUser(msg.from.id, (u) => {
      const amount = args[0] === 'all' ? u.bank : Math.floor(Number(args[0]));
      if (!Number.isFinite(amount) || amount <= 0 || amount > u.bank) return u;
      u.bank -= amount;
      u.balance += amount;
      u._amount = amount;
      return u;
    });

    if (!user._amount) return bot.sendMessage(msg.chat.id, '❌ Số tiền rút không hợp lệ.');
    return bot.sendMessage(msg.chat.id, `💵 Đã rút ${user._amount} về ví.`);
  }
};
