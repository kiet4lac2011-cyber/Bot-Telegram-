const { getTop } = require('../utils/economy');

module.exports = {
  name: 'leaderboard',
  aliases: ['top'],
  description: 'Bảng xếp hạng giàu nhất.',
  usage: '/leaderboard',
  async execute({ bot, msg }) {
    const top = getTop(10);
    if (!top.length) return bot.sendMessage(msg.chat.id, 'Chưa có dữ liệu người chơi.');
    const text = ['🏆 Top tài sản:']
      .concat(top.map((u, i) => `${i + 1}. ${u.userId} - ${u.balance + (u.bank || 0)}`))
      .join('\n');
    return bot.sendMessage(msg.chat.id, text);
  }
};
