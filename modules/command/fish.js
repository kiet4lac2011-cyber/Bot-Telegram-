const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'fish',
  description: 'Đi câu cá kiếm tiền.',
  usage: '/fish',
  async execute({ bot, msg }) {
    const user = updateUser(msg.from.id, (u) => {
      const haveRod = (u.inventory.rod || 0) > 0;
      const reward = 100 + Math.floor(Math.random() * 250) + (haveRod ? 100 : 0);
      u.balance += reward;
      u._reward = reward;
      return u;
    });

    return bot.sendMessage(msg.chat.id, `🎣 Bạn câu được cá ngon, nhận +${user._reward}`);
  }
};
