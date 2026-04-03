const fs = require('fs');
const path = require('path');
const { updateUser } = require('../utils/economy');

const quizPath = path.join(__dirname, '..', '..', 'data', 'game', 'quiz.json');

module.exports = {
  name: 'quiz',
  description: 'Trả lời câu hỏi để nhận tiền.',
  usage: '/quiz <đáp_án>',
  async execute({ bot, msg, args }) {
    const answer = (args.join(' ') || '').trim().toLowerCase();
    if (!answer) return bot.sendMessage(msg.chat.id, 'Ví dụ: /quiz hanoi');

    const bank = JSON.parse(fs.readFileSync(quizPath, 'utf8'));
    const q = bank[Math.floor(Math.random() * bank.length)];

    const user = updateUser(msg.from.id, (u) => {
      if (answer === q.a) {
        u.balance += 300;
        u._ok = true;
      } else {
        u.balance = Math.max(0, u.balance - 100);
        u._ok = false;
      }
      u._q = q;
      return u;
    });

    return bot.sendMessage(msg.chat.id, `❓ ${user._q.q}\n${user._ok ? '✅ Đúng +300' : `❌ Sai, đáp án: ${user._q.a} (-100)`}`);
  }
};
