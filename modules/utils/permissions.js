function isOwner(userId, config) {
  return config.ownerId && Number(config.ownerId) === Number(userId);
}

function isAdmin(userId, config) {
  const admins = Array.isArray(config.admins) ? config.admins.map(Number) : [];
  return isOwner(userId, config) || admins.includes(Number(userId));
}

function hasPermission(level, userId, config) {
  if (!level || level === 'user') return true;
  if (level === 'owner') return isOwner(userId, config);
  if (level === 'admin') return isAdmin(userId, config);
  return false;
}

module.exports = { isOwner, isAdmin, hasPermission };
