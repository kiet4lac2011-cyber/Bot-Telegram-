module.exports = {
  name: 'left_chat_member',
  async handle({ bot, payload: msg }) {
    if (!msg.left_chat_member) return;

    const name = msg.left_chat_member.first_name || msg.left_chat_member.username || 'thành viên';
    await bot.sendMessage(msg.chat.id, `👋 Tạm biệt ${name}, hẹn gặp lại!`);
  }
};
