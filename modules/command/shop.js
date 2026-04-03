const fs = require('fs');
const path = require('path');

const shopPath = path.join(__dirname, '..', '..', 'data', 'game', 'shop.json');

module.exports = {
  name: 'shop',
  description: 'Xem cửa hàng vật phẩm game.',
  usage: '/shop',
  async execute({ bot, msg }) {
    const items = JSON.parse(fs.readFileSync(shopPath, 'utf8'));
    const text = ['🛒 Cửa hàng:']
      .concat(items.map((i) => `• ${i.id} | ${i.name} | ${i.price} - ${i.description}`))
      .join('\n');
    return bot.sendMessage(msg.chat.id, text);
  }
};
