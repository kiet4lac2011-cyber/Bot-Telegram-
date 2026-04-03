module.exports = {
  name: 'ping',
  description: 'Kiểm tra độ phản hồi của bot.',
  usage: '/ping',
  async execute({ bot, msg }) {
    const start = Date.now();
    const sent = await bot.sendMessage(msg.chat.id, '🏓 Pong...');
    const latency = Date.now() - start;
    await bot.editMessageText(`🏓 Pong! ${latency}ms`, {
      chat_id: msg.chat.id,
      message_id: sent.message_id
    });
  }
};
