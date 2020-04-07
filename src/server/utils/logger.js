const { createLogger, transports } = require('winston');
const path = require('path');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(__dirname, '../../../log', 'logs-error.log'),
      level: 'error',
    }),
    new transports.File({
      dirname: 'log',
      filename: 'logs.log',
    }),
  ],
});

// Stream for morgan
logger.stream = {
  write: message => logger.info(message),
};

// If we're not in production then also log to the console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

module.exports = logger;
