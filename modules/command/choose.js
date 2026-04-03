module.exports = {
  name: 'choose',
  aliases: ['pick'],
  description: 'Chọn ngẫu nhiên 1 lựa chọn trong danh sách.',
  usage: '/choose trà sữa | cà phê | nước ép',
  async execute({ bot, msg, rawArgs }) {
    const options = rawArgs
      .split('|')
      .map((s) => s.trim())
      .filter(Boolean);

    if (options.length < 2) {
      return bot.sendMessage(msg.chat.id, 'Ví dụ: /choose A | B | C');
    }

    const result = options[Math.floor(Math.random() * options.length)];
    return bot.sendMessage(msg.chat.id, `🤔 Mình chọn: ${result}`);
  }
};
