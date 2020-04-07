const mongoose = require('mongoose');

const { databaseSettings } = require('../../../.config');
const logger = require('../utils/logger');

mongoose.connect(
  `mongodb://${databaseSettings.dbAddress}/${databaseSettings.dbName}`,
  { useNewUrlParser: true },
);

const db = mongoose.connection;

db.on('error', err => logger.info(`DB Connection Error: ${err}`));

db.once('open', () => logger.info('DB Connected Successfully'));

module.exports = db;
