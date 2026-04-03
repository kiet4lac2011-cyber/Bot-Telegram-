module.exports = {
  name: 'id',
  description: 'Xem ID người dùng và chat hiện tại.',
  usage: '/id',
  async execute({ bot, msg }) {
    const text = [
      `👤 User ID: ${msg.from.id}`,
      `💬 Chat ID: ${msg.chat.id}`,
      `🧩 Chat type: ${msg.chat.type}`
    ].join('\n');

    return bot.sendMessage(msg.chat.id, text);
  }
};
