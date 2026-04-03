module.exports = {
  name: 'echo',
  aliases: ['say'],
  description: 'Bot nhắc lại nội dung bạn gửi.',
  usage: '/echo <nội_dung>',
  async execute({ bot, msg, args }) {
    if (!args.length) {
      return bot.sendMessage(msg.chat.id, 'Ví dụ: /echo Xin chào thế giới');
    }
    return bot.sendMessage(msg.chat.id, args.join(' '));
  }
};
