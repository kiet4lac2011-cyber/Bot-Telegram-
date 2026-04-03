module.exports = {
  name: 'new_chat_members',
  async handle({ bot, payload: msg }) {
    if (!msg.new_chat_members?.length) return;

    const names = msg.new_chat_members
      .map((u) => u.first_name || u.username || `ID:${u.id}`)
      .join(', ');

    await bot.sendMessage(
      msg.chat.id,
      `🎉 Chào mừng ${names} đến với nhóm ${msg.chat.title || ''}!\nGõ /help để xem lệnh.`
    );
  }
};
