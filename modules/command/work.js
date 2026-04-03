const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'work',
  description: 'Đi làm kiếm tiền (cooldown 10 phút).',
  usage: '/work',
  async execute({ bot, msg }) {
    const now = Date.now();
    const cooldown = 10 * 60 * 1000;
    const jobs = ['coder', 'shipper', 'thợ sửa điện', 'streamer', 'designer'];

    const user = updateUser(msg.from.id, (u) => {
      if (now - u.stats.lastWorkAt < cooldown) return u;
      const reward = 200 + Math.floor(Math.random() * 500);
      u.balance += reward;
      u.stats.lastWorkAt = now;
      u._workReward = reward;
      u._job = jobs[Math.floor(Math.random() * jobs.length)];
      return u;
    });

    if (!user._workReward) {
      const left = cooldown - (now - user.stats.lastWorkAt);
      const min = Math.ceil(left / 60000);
      return bot.sendMessage(msg.chat.id, `⌛ Bạn đang mệt, chờ ${min} phút nữa nhé.`);
    }

    return bot.sendMessage(msg.chat.id, `🧰 Bạn làm ${user._job} và nhận +${user._workReward}.`);
  }
};
