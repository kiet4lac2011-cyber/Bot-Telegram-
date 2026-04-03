const { getUser } = require('../utils/economy');

module.exports = {
  name: 'inventory',
  aliases: ['inv'],
  description: 'Xem túi đồ của bạn.',
  usage: '/inventory',
  async execute({ bot, msg }) {
    const user = getUser(msg.from.id);
    const entries = Object.entries(user.inventory || {});
    if (!entries.length) return bot.sendMessage(msg.chat.id, '🎒 Túi đồ trống.');

    const text = ['🎒 Inventory:']
      .concat(entries.map(([k, v]) => `• ${k}: ${v}`))
      .join('\n');
    return bot.sendMessage(msg.chat.id, text);
  }
};
