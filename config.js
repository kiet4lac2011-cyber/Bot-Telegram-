require('dotenv').config();

module.exports = {
  token: process.env.BOT_TOKEN,
  ownerId: process.env.OWNER_ID ? Number(process.env.OWNER_ID) : null,
  prefix: '/'
};
