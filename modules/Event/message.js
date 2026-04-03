const { hasPermission } = require('../utils/permissions');

module.exports = {
  name: 'message',
  async handle({ bot, payload: msg, commands, config }) {
    if (!msg.text || !msg.text.startsWith(config.prefix)) return;

    const withoutPrefix = msg.text.slice(config.prefix.length).trim();
    if (!withoutPrefix) return;

    const [commandName, ...args] = withoutPrefix.split(/\s+/);
    const cmd = commands.get(commandName.toLowerCase());
    if (!cmd) return;

    const userId = msg.from?.id;
    if (!hasPermission(cmd.permission, userId, config)) {
      return bot.sendMessage(msg.chat.id, '⛔ Bạn không có quyền dùng lệnh này.');
    }

    try {
      await cmd.execute({
        bot,
        msg,
        args,
        rawArgs: withoutPrefix.slice(commandName.length).trim(),
        commands,
        config,
        prefix: config.prefix
      });
    } catch (error) {
      console.error(`[ERROR] command ${commandName}:`, error);
      await bot.sendMessage(msg.chat.id, '❌ Có lỗi xảy ra khi chạy lệnh này.');
    }
  }
};
