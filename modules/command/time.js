module.exports = {
  name: 'time',
  aliases: ['now'],
  description: 'Xem thời gian hiện tại theo UTC.',
  usage: '/time',
  async execute({ bot, msg }) {
    const now = new Date();
    return bot.sendMessage(msg.chat.id, `🕒 UTC: ${now.toISOString()}`);
  }
};
