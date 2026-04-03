# Bot Telegram Modular (Mirai-inspired)

Bot Telegram viết theo kiến trúc **modular**, lấy cảm hứng từ phong cách tổ chức lệnh/event của Mirai trên Messenger.

## Cấu trúc thư mục

```bash
.
├── index.js
├── config.js
├── .env.example
├── modules/
│   ├── command/
│   │   ├── start.js
│   │   ├── help.js
│   │   ├── ping.js
│   │   ├── echo.js
│   │   ├── roll.js
│   │   ├── math.js
│   │   ├── time.js
│   │   ├── choose.js
│   │   ├── id.js
│   │   └── admin.js
│   └── Event/
│       ├── message.js
│       ├── newChatMembers.js
│       ├── leftChatMember.js
│       └── callbackQuery.js
└── package.json
```

## Tính năng chính

- Loader tự động nạp toàn bộ command trong `modules/command/*.js`.
- Loader tự động nạp toàn bộ event trong `modules/Event/*.js`.
- Hỗ trợ alias cho lệnh.
- Có sẵn nhiều lệnh đa dạng:
  - `/start`, `/help`, `/ping`, `/echo`
  - `/roll`, `/math`, `/time`, `/choose`, `/id`, `/admin`
- Event nhóm cơ bản:
  - Chào thành viên mới.
  - Tạm biệt thành viên rời nhóm.
  - Bắt callback query.

## Cài đặt

```bash
npm install
cp .env.example .env
```

Điền token bot vào file `.env`:

```env
BOT_TOKEN=your_telegram_bot_token
OWNER_ID=123456789
```

## Chạy bot

```bash
npm start
```

## Thêm lệnh mới

Tạo file mới trong `modules/command/`, ví dụ `hello.js`:

```js
module.exports = {
  name: 'hello',
  description: 'Chào người dùng',
  usage: '/hello',
  async execute({ bot, msg }) {
    await bot.sendMessage(msg.chat.id, 'Xin chào!');
  }
};
```

## Thêm event mới

Tạo file mới trong `modules/Event/`, ví dụ `editedMessage.js`:

```js
module.exports = {
  name: 'edited_message',
  async handle({ bot, payload }) {
    if (payload.text) {
      await bot.sendMessage(payload.chat.id, 'Bạn vừa sửa tin nhắn!');
    }
  }
};
```
