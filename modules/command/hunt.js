const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'hunt',
  description: 'Đi săn kiếm tiền.',
  usage: '/hunt',
  async execute({ bot, msg }) {
    const user = updateUser(msg.from.id, (u) => {
      const haveRifle = (u.inventory.rifle || 0) > 0;
      const reward = 150 + Math.floor(Math.random() * 300) + (haveRifle ? 120 : 0);
      u.balance += reward;
      u._reward = reward;
      return u;
    });

    return bot.sendMessage(msg.chat.id, `🏹 Bạn đi săn thành công, nhận +${user._reward}`);
  }
};
