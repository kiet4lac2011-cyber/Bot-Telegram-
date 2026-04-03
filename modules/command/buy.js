const fs = require('fs');
const path = require('path');
const { updateUser } = require('../utils/economy');

const shopPath = path.join(__dirname, '..', '..', 'data', 'game', 'shop.json');

module.exports = {
  name: 'buy',
  description: 'Mua vật phẩm trong shop.',
  usage: '/buy <item_id> [số_lượng]',
  async execute({ bot, msg, args }) {
    const itemId = (args[0] || '').toLowerCase();
    const qty = Math.max(1, Math.floor(Number(args[1]) || 1));
    const items = JSON.parse(fs.readFileSync(shopPath, 'utf8'));
    const item = items.find((i) => i.id === itemId);
    if (!item) return bot.sendMessage(msg.chat.id, '❌ Không tìm thấy item. Dùng /shop để xem.');

    const user = updateUser(msg.from.id, (u) => {
      const cost = item.price * qty;
      if (u.balance < cost) return u;
      u.balance -= cost;
      u.inventory[item.id] = (u.inventory[item.id] || 0) + qty;
      u._ok = true;
      u._cost = cost;
      return u;
    });

    if (!user._ok) return bot.sendMessage(msg.chat.id, '❌ Không đủ tiền.');
    return bot.sendMessage(msg.chat.id, `✅ Mua ${qty} ${item.name}, tốn ${user._cost}`);
  }
};
