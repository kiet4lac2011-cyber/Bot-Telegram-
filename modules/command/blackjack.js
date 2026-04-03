const { updateUser } = require('../utils/economy');

function draw() { return 1 + Math.floor(Math.random() * 11); }

module.exports = {
  name: 'blackjack',
  aliases: ['bj'],
  description: 'Blackjack rút bài tự động.',
  usage: '/blackjack <tiền_cược>',
  async execute({ bot, msg, args }) {
    const bet = Math.floor(Number(args[0]));
    if (!Number.isFinite(bet) || bet <= 0) return bot.sendMessage(msg.chat.id, 'Ví dụ: /blackjack 500');

    const user = updateUser(msg.from.id, (u) => {
      if (u.balance < bet) return u;
      const p = draw() + draw();
      const d = draw() + draw();
      const player = p < 17 ? p + draw() : p;
      const dealer = d < 17 ? d + draw() : d;
      let delta = 0;
      if (player > 21) delta = -bet;
      else if (dealer > 21 || player > dealer) delta = bet;
      else if (player < dealer) delta = -bet;
      u.balance += delta;
      u._result = { player, dealer, delta };
      return u;
    });

    if (!user._result) return bot.sendMessage(msg.chat.id, '❌ Không đủ tiền.');
    const r = user._result;
    return bot.sendMessage(msg.chat.id, `🃏 Bạn: ${r.player} | Nhà cái: ${r.dealer}\n${r.delta > 0 ? `Thắng +${r.delta}` : r.delta < 0 ? `Thua ${Math.abs(r.delta)}` : 'Hòa'}`);
  }
};
