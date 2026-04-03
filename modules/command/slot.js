const { updateUser } = require('../utils/economy');

module.exports = {
  name: 'slot',
  aliases: ['slots'],
  description: 'Chơi máy slot 3 ô.',
  usage: '/slot <tiền_cược>',
  async execute({ bot, msg, args }) {
    const bet = Math.floor(Number(args[0]));
    if (!Number.isFinite(bet) || bet <= 0) return bot.sendMessage(msg.chat.id, 'Ví dụ: /slot 300');

    const icons = ['🍒', '🍋', '💎', '7️⃣', '🍉'];
    const spin = () => icons[Math.floor(Math.random() * icons.length)];

    const user = updateUser(msg.from.id, (u) => {
      if (u.balance < bet) return u;
      const a = spin(); const b = spin(); const c = spin();
      u._line = `${a} ${b} ${c}`;
      let multi = 0;
      if (a === b && b === c) multi = 3;
      else if (a === b || b === c || a === c) multi = 1.5;
      const delta = Math.floor(bet * multi) - bet;
      u.balance += delta;
      u._delta = delta;
      return u;
    });

    if (!user._line) return bot.sendMessage(msg.chat.id, '❌ Không đủ tiền.');
    return bot.sendMessage(msg.chat.id, `🎰 ${user._line}\n${user._delta >= 0 ? `Thắng +${user._delta}` : `Thua ${Math.abs(user._delta)}`}`);
  }
};
