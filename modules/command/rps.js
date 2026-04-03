const { updateUser } = require('../utils/economy');

const choices = ['keo', 'bua', 'bao'];
function win(a, b) {
  return (a === 'keo' && b === 'bao') || (a === 'bua' && b === 'keo') || (a === 'bao' && b === 'bua');
}

module.exports = {
  name: 'rps',
  aliases: ['kbb'],
  description: 'Kéo-búa-bao cược tiền.',
  usage: '/rps <keo|bua|bao> <tiền_cược>',
  async execute({ bot, msg, args }) {
    const pick = (args[0] || '').toLowerCase();
    const bet = Math.floor(Number(args[1]));
    if (!choices.includes(pick) || !Number.isFinite(bet) || bet <= 0) return bot.sendMessage(msg.chat.id, 'Ví dụ: /rps bua 200');

    const user = updateUser(msg.from.id, (u) => {
      if (u.balance < bet) return u;
      const botPick = choices[Math.floor(Math.random() * choices.length)];
      let delta = 0;
      if (pick === botPick) delta = 0;
      else if (win(pick, botPick)) delta = bet;
      else delta = -bet;
      u.balance += delta;
      u._botPick = botPick;
      u._delta = delta;
      return u;
    });

    if (!user._botPick) return bot.sendMessage(msg.chat.id, '❌ Không đủ tiền.');
    return bot.sendMessage(msg.chat.id, `🤖 Ra: ${user._botPick}. ${user._delta > 0 ? `Thắng +${user._delta}` : user._delta < 0 ? `Thua ${Math.abs(user._delta)}` : 'Hòa'}`);
  }
};
