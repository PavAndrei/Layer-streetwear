// eslint-disable-next-line @typescript-eslint/no-require-imports
const users = require('./users-database.json').users;

module.exports = {
  async up(db, client) {
    await db.collection('users').insertMany(users);
  },

  async down(db, client) {},
};
