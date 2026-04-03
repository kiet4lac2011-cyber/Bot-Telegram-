const { getUser, saveUser } = require('../utils/economy');

module.exports = {
  name: 'rob',
  description: 'Cướp người khác bằng reply (rủi ro cao).',
  usage: '/rob (reply vào user)',
  async execute({ bot, msg }) {
    const target = msg.reply_to_message?.from;
    if (!target) return bot.sendMessage(msg.chat.id, 'Hãy reply người bạn muốn cướp.');
    if (target.id === msg.from.id) return bot.sendMessage(msg.chat.id, 'Bạn không thể tự cướp chính mình.');

    const me = getUser(msg.from.id);
    const victim = getUser(target.id);

    const victimShield = victim.inventory.shield || 0;
    const successRate = victimShield > 0 ? 0.25 : 0.45;
    const success = Math.random() < successRate;

    if (success) {
      const amount = Math.max(50, Math.floor(victim.balance * (0.1 + Math.random() * 0.2)));
      const real = Math.min(amount, victim.balance);
      victim.balance -= real;
      me.balance += real;
      saveUser(msg.from.id, me);
      saveUser(target.id, victim);
      return bot.sendMessage(msg.chat.id, `🦹 Cướp thành công ${real} từ ${target.first_name || target.id}`);
    }

    const fine = Math.min(me.balance, 200 + Math.floor(Math.random() * 400));
    me.balance -= fine;
    saveUser(msg.from.id, me);
    return bot.sendMessage(msg.chat.id, `🚓 Cướp thất bại! Bạn bị phạt ${fine}.`);
  }
};
