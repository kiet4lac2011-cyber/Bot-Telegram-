function isGroup(chatType) {
  return chatType === 'group' || chatType === 'supergroup';
}

module.exports = {
  name: 'admin',
  aliases: ['promote'],
  description: 'Gợi ý cách cấp quyền admin (Telegram hạn chế tự động).',
  usage: '/admin (reply vào user)',
  async execute({ bot, msg }) {
    if (!isGroup(msg.chat.type)) {
      return bot.sendMessage(msg.chat.id, 'Lệnh này chỉ dùng trong nhóm.');
    }

    if (!msg.reply_to_message) {
      return bot.sendMessage(msg.chat.id, 'Hãy reply vào user cần cấp quyền.');
    }

    return bot.sendMessage(
      msg.chat.id,
      '🔐 Telegram yêu cầu owner/admin cấp quyền thủ công trong phần quản trị nhóm.'
    );
  }
};
