module.exports = {
  name: 'help',
  aliases: ['menu', 'commands'],
  description: 'Hiển thị danh sách lệnh.',
  usage: '/help',
  async execute({ bot, msg, commands, prefix }) {
    const unique = [];
    const seen = new Set();

    for (const command of commands.values()) {
      if (!seen.has(command.name)) {
        seen.add(command.name);
        unique.push(command);
      }
    }

    const lines = unique
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => {
        const perm = c.permission ? ` [${c.permission}]` : '';
        return `• ${prefix}${c.name}${perm} - ${c.description || 'Không có mô tả'}`;
      });

    const text = ['📚 Danh sách lệnh hiện có:', ...lines].join('\n');
    await bot.sendMessage(msg.chat.id, text);
  }
};
