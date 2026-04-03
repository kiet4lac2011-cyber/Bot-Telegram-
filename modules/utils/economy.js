const fs = require('fs');
const path = require('path');

const usersDir = path.join(__dirname, '..', '..', 'data', 'users');

function ensureUsersDir() {
  if (!fs.existsSync(usersDir)) {
    fs.mkdirSync(usersDir, { recursive: true });
  }
}

function userFile(userId) {
  return path.join(usersDir, `${userId}.json`);
}

function defaultData(userId) {
  return {
    userId,
    balance: 1000,
    bank: 0,
    inventory: {},
    stats: {
      win: 0,
      lose: 0,
      dailyStreak: 0,
      lastDailyAt: 0,
      lastWorkAt: 0
    }
  };
}

function getUser(userId) {
  ensureUsersDir();
  const file = userFile(userId);
  if (!fs.existsSync(file)) {
    const data = defaultData(userId);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    return data;
  }

  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return {
      ...defaultData(userId),
      ...data,
      stats: {
        ...defaultData(userId).stats,
        ...(data.stats || {})
      },
      inventory: data.inventory || {}
    };
  } catch {
    const data = defaultData(userId);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
    return data;
  }
}

function saveUser(userId, data) {
  ensureUsersDir();
  fs.writeFileSync(userFile(userId), JSON.stringify(data, null, 2));
}

function updateUser(userId, updater) {
  const data = getUser(userId);
  const updated = updater(data) || data;
  saveUser(userId, updated);
  return updated;
}

function addBalance(userId, amount) {
  return updateUser(userId, (u) => {
    u.balance = Math.max(0, Math.floor(u.balance + amount));
    return u;
  });
}

function transfer(fromId, toId, amount) {
  const value = Math.floor(amount);
  if (value <= 0) return { ok: false, reason: 'Số tiền phải lớn hơn 0.' };

  const from = getUser(fromId);
  const to = getUser(toId);
  if (from.balance < value) return { ok: false, reason: 'Số dư không đủ.' };

  from.balance -= value;
  to.balance += value;
  saveUser(fromId, from);
  saveUser(toId, to);
  return { ok: true, from, to, value };
}

function getTop(limit = 10) {
  ensureUsersDir();
  const files = fs.readdirSync(usersDir).filter((f) => f.endsWith('.json'));
  const users = files
    .map((f) => {
      try {
        return JSON.parse(fs.readFileSync(path.join(usersDir, f), 'utf8'));
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .sort((a, b) => (b.balance + (b.bank || 0)) - (a.balance + (a.bank || 0)));

  return users.slice(0, limit);
}

module.exports = {
  getUser,
  saveUser,
  updateUser,
  addBalance,
  transfer,
  getTop
};
