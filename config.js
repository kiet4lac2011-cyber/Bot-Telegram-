const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

if (!fs.existsSync(configPath)) {
  throw new Error('Thiếu config.json. Hãy tạo file config.json trước khi chạy bot.');
}

let raw;
try {
  raw = fs.readFileSync(configPath, 'utf8');
} catch {
  throw new Error('Không thể đọc config.json. Kiểm tra quyền truy cập file.');
}

let parsed;
try {
  parsed = JSON.parse(raw);
} catch {
  throw new Error('config.json không đúng định dạng JSON hợp lệ.');
}

if (!parsed.token || typeof parsed.token !== 'string') {
  throw new Error('config.json thiếu token hợp lệ.');
}

module.exports = {
  token: parsed.token,
  ownerId: Number.isFinite(parsed.ownerId) ? parsed.ownerId : null,
  prefix: typeof parsed.prefix === 'string' && parsed.prefix.trim() ? parsed.prefix : '/',
  admins: Array.isArray(parsed.admins) ? parsed.admins.map(Number).filter(Number.isFinite) : []
};
