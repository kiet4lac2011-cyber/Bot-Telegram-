const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'daily',
  description: 'Nhận thưởng điểm danh mỗi ngày.',
  usage: '/daily',
  async execute({ bot, msg }) {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    const user = updateUser(msg.from.id, (u) => {
      if (now - u.stats.lastDailyAt < day) return u;

      const streakBreak = now - u.stats.lastDailyAt > day * 2;
      u.stats.dailyStreak = streakBreak ? 1 : (u.stats.dailyStreak || 0) + 1;
      const reward = 500 + Math.min(1500, u.stats.dailyStreak * 60);
      u.balance += reward;
      u.stats.lastDailyAt = now;
      u._dailyReward = reward;
      return u;
    });

    if (!user._dailyReward) {
      const left = day - (now - user.stats.lastDailyAt);
      const hours = Math.ceil(left / (60 * 60 * 1000));
      return bot.sendMessage(msg.chat.id, `⏳ Bạn đã nhận rồi, quay lại sau khoảng ${hours} giờ.`);
    }

    return bot.sendMessage(msg.chat.id, `🎁 Daily +${user._dailyReward} (streak: ${user.stats.dailyStreak})`);
  }
};
