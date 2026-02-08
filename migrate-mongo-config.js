// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

const config = {
  mongodb: {
    url: process.env.MONGO_DB_CONNECTION_STRING,

    databaseName: process.env.DB_NAME,

    options: {},
  },

  migrationsDir: 'migrations',

  changelogCollectionName: 'changelog',

  lockCollectionName: 'changelog_lock',

  lockTtl: 0,

  migrationFileExtension: '.js',
  useFileHash: false,

  moduleSystem: 'commonjs',
};

module.exports = config;
