const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'coinflip',
  aliases: ['cf'],
  description: 'Tung xu cược ngửa/sấp.',
  usage: '/coinflip <ngua|sap> <tiền_cược>',
  async execute({ bot, msg, args }) {
    const pick = (args[0] || '').toLowerCase();
    const bet = Math.floor(Number(args[1]));
    if (!['ngua', 'sap'].includes(pick) || !Number.isFinite(bet) || bet <= 0) {
      return bot.sendMessage(msg.chat.id, 'Ví dụ: /coinflip ngua 200');
    }

    const user = updateUser(msg.from.id, (u) => {
      if (u.balance < bet) return u;
      const result = Math.random() < 0.5 ? 'ngua' : 'sap';
      u._result = result;
      if (result === pick) {
        u.balance += bet;
        u.stats.win += 1;
        u._delta = bet;
      } else {
        u.balance -= bet;
        u.stats.lose += 1;
        u._delta = -bet;
      }
      return u;
    });

    if (!user._result) return bot.sendMessage(msg.chat.id, '❌ Không đủ tiền để cược.');
    return bot.sendMessage(msg.chat.id, `🪙 Ra ${user._result}. ${user._delta > 0 ? `Thắng +${user._delta}` : `Thua ${Math.abs(user._delta)}`}`);
  }
};
