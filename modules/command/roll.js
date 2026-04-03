module.exports = {
  name: 'roll',
  aliases: ['dice'],
  description: 'Tung xúc xắc ngẫu nhiên.',
  usage: '/roll [số_mặt]',
  async execute({ bot, msg, args }) {
    const sides = Math.max(2, Math.min(999, Number(args[0]) || 6));
    const value = Math.floor(Math.random() * sides) + 1;
    return bot.sendMessage(msg.chat.id, `🎲 Kết quả: ${value}/${sides}`);
  }
};
