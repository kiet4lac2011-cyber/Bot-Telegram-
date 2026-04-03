const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'dig',
  description: 'Đào kho báu kiếm tiền.',
  usage: '/dig',
  async execute({ bot, msg }) {
    const user = updateUser(msg.from.id, (u) => {
      const havePickaxe = (u.inventory.pickaxe || 0) > 0;
      const reward = 120 + Math.floor(Math.random() * 350) + (havePickaxe ? 100 : 0);
      u.balance += reward;
      u._reward = reward;
      return u;
    });

    return bot.sendMessage(msg.chat.id, `⛏️ Bạn đào trúng khoáng sản, nhận +${user._reward}`);
  }
};
