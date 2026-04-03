const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'higherlower',
  aliases: ['hl'],
  description: 'Đoán số sau cao hơn hay thấp hơn.',
  usage: '/higherlower <cao|thap> <tiền_cược>',
  async execute({ bot, msg, args }) {
    const pick = (args[0] || '').toLowerCase();
    const bet = Math.floor(Number(args[1]));
    if (!['cao', 'thap'].includes(pick) || !Number.isFinite(bet) || bet <= 0) return bot.sendMessage(msg.chat.id, 'Ví dụ: /higherlower cao 100');

    const user = updateUser(msg.from.id, (u) => {
      if (u.balance < bet) return u;
      const first = 1 + Math.floor(Math.random() * 13);
      const second = 1 + Math.floor(Math.random() * 13);
      const isHigher = second >= first;
      const win = (pick === 'cao' && isHigher) || (pick === 'thap' && !isHigher);
      const delta = win ? bet : -bet;
      u.balance += delta;
      u._text = `${first} -> ${second}`;
      u._delta = delta;
      return u;
    });

    if (!user._text) return bot.sendMessage(msg.chat.id, '❌ Không đủ tiền.');
    return bot.sendMessage(msg.chat.id, `🃏 ${user._text}. ${user._delta > 0 ? `Thắng +${user._delta}` : `Thua ${Math.abs(user._delta)}`}`);
  }
};
