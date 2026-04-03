const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'roulette',
  aliases: ['rlt'],
  description: 'Roulette đỏ/đen.',
  usage: '/roulette <do|den> <tiền_cược>',
  async execute({ bot, msg, args }) {
    const pick = (args[0] || '').toLowerCase();
    const bet = Math.floor(Number(args[1]));
    if (!['do', 'den'].includes(pick) || !Number.isFinite(bet) || bet <= 0) {
      return bot.sendMessage(msg.chat.id, 'Ví dụ: /roulette do 500');
    }

    const user = updateUser(msg.from.id, (u) => {
      if (u.balance < bet) return u;
      const result = Math.random() < 0.48 ? 'do' : 'den';
      const delta = result === pick ? bet : -bet;
      u.balance += delta;
      u._r = result;
      u._d = delta;
      return u;
    });

    if (!user._r) return bot.sendMessage(msg.chat.id, '❌ Không đủ tiền.');
    return bot.sendMessage(msg.chat.id, `🎡 Kết quả: ${user._r}. ${user._d > 0 ? `Thắng +${user._d}` : `Thua ${Math.abs(user._d)}`}`);
  }
};
