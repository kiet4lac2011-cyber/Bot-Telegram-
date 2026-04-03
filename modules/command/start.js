module.exports = {
  name: 'start',
  aliases: ['hello'],
  description: 'Khởi động bot và chào người dùng.',
  usage: '/start',
  async execute({ bot, msg }) {
    const name = msg.from.first_name || 'bạn';
    const text = [
      `👋 Xin chào ${name}!`,
      'Mình là bot Telegram modular lấy cảm hứng từ Mirai.',
      'Gõ /help để xem danh sách lệnh.'
    ].join('\n');

    await bot.sendMessage(msg.chat.id, text);
  }
};
