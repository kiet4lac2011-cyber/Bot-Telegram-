module.exports = {
  name: 'callback_query',
  async handle({ bot, payload: query }) {
    const data = query.data || 'unknown';
    await bot.answerCallbackQuery(query.id, {
      text: `Bạn đã chọn: ${data}`,
      show_alert: false
    });
  }
};
