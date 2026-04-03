# Bot Telegram Modular (Mirai-inspired)

Bot Telegram viết theo kiến trúc **modular**, lấy cảm hứng từ phong cách tổ chức lệnh/event của Mirai trên Messenger.

## Cấu trúc thư mục

```bash
.
├── index.js
├── config.js
├── config.json
├── modules/
│   ├── command/
│   └── Event/
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
```

## Cấu hình

Sửa trực tiếp file `config.json`:

```json
{
  "token": "YOUR_TELEGRAM_BOT_TOKEN",
  "ownerId": 123456789,
  "prefix": "/"
}
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
