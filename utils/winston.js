const winston = require("winston");
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
  },
};

const logger = winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
          })
        )
      }),
      new winston.transports.File({
        filename: 'logs/logError.log',
        format: winston.format.json(),
        level:"error"
      })
    ]
  });

module.exports = {
  logger,
};
