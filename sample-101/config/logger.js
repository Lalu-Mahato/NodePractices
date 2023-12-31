/* eslint-disable import/no-extraneous-dependencies */
require('winston-daily-rotate-file');
const winston = require('winston');

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5,
};

/* Log Rotation Config */
const transport = new (winston.transports.DailyRotateFile)({
    filename: 'logs/application-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
});

const logger = winston.createLogger({
    level: 'info',
    levels,
    transports: [
        transport,
    ],
    exitOnError: false,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = logger;
