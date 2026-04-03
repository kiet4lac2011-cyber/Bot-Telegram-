module.exports = {
  name: 'math',
  aliases: ['calc'],
  description: 'Tính biểu thức cơ bản (+ - * / %).',
  usage: '/math 12 * (3 + 4)',
  async execute({ bot, msg, args }) {
    if (!args.length) {
      return bot.sendMessage(msg.chat.id, 'Ví dụ: /math 2 + 3 * 5');
    }

    const expression = args.join(' ');
    const safe = /^[0-9+\-*/%().\s]+$/.test(expression);
    if (!safe) {
      return bot.sendMessage(msg.chat.id, '❌ Biểu thức chứa ký tự không hợp lệ.');
    }

    let result;
    try {
      // eslint-disable-next-line no-new-func
      result = Function(`"use strict"; return (${expression})`)();
    } catch {
      return bot.sendMessage(msg.chat.id, '❌ Không thể tính biểu thức này.');
    }

    if (!Number.isFinite(result)) {
      return bot.sendMessage(msg.chat.id, '❌ Kết quả không hợp lệ.');
    }

    return bot.sendMessage(msg.chat.id, `🧮 ${expression} = ${result}`);
  }
};
