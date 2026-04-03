# Bot Telegram Modular (Mirai-inspired)

Bot Telegram modular lấy cảm hứng từ Mirai, tập trung vào hệ thống game/economy liên thông dữ liệu JSON.

## Kiến trúc

- `modules/command/*.js`: toàn bộ lệnh.
- `modules/Event/*.js`: toàn bộ event.
- `data/users/<userId>.json`: dữ liệu tiền riêng từng người chơi.
- `data/game/*.json`: dữ liệu game dùng chung (shop, câu hỏi quiz).

## Điểm nổi bật

- ✅ **20+ lệnh game/economy mới**, dùng chung số dư.
- ✅ Mọi lệnh game đều liên kết cùng 1 ví (`balance`) + ngân hàng (`bank`).
- ✅ Lưu trữ JSON tách theo từng ID user.
- ✅ Có **phân quyền** theo `user/admin/owner`.

## Cấu hình (`config.json`)

```json
{
  "token": "YOUR_TELEGRAM_BOT_TOKEN",
  "ownerId": 123456789,
  "admins": [123456789],
  "prefix": "/"
}
```

## Cài đặt và chạy

```bash
npm install
npm start
```

## Nhóm lệnh game/economy (mới)

1. `/balance` - xem ví/bank
2. `/daily` - điểm danh
3. `/work` - đi làm
4. `/coinflip` - tung xu
5. `/slot` - slot machine
6. `/blackjack` - blackjack nhanh
7. `/roulette` - đỏ/đen
8. `/rps` - kéo búa bao
9. `/higherlower` - đoán cao thấp
10. `/quiz` - trả lời câu hỏi
11. `/hunt` - đi săn
12. `/fish` - câu cá
13. `/dig` - đào kho báu
14. `/rob` - cướp (reply)
15. `/pay` - chuyển tiền (reply)
16. `/deposit` - gửi bank
17. `/withdraw` - rút bank
18. `/shop` - xem shop
19. `/buy` - mua vật phẩm
20. `/inventory` - xem túi đồ
21. `/leaderboard` - bảng xếp hạng
22. `/setbalance` - admin set tiền
23. `/resetuser` - owner reset dữ liệu

## Lệnh cũ vẫn dùng được

`/start`, `/help`, `/ping`, `/echo`, `/roll`, `/math`, `/time`, `/choose`, `/id`, `/admin`

## Phân quyền

- `user`: mặc định.
- `admin`: chỉ user có trong `config.json.admins` hoặc owner.
- `owner`: chỉ `config.json.ownerId`.

Event `modules/Event/message.js` sẽ tự kiểm tra quyền trước khi gọi command.
