const { getUser } = require('../utils/economy');

module.exports = {
  name: 'balance',
  aliases: ['bal', 'money'],
  description: 'Xem số dư ví và ngân hàng.',
  usage: '/balance',
  async execute({ bot, msg }) {
    const u = getUser(msg.from.id);
    return bot.sendMessage(msg.chat.id, `💰 Ví: ${u.balance}\n🏦 Ngân hàng: ${u.bank}\n💎 Tổng: ${u.balance + u.bank}`);
  }
};
