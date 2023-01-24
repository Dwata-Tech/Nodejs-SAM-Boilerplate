const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, errors } = format;

const loggerFormat = printf(({ message, timestamp }) => {
    return `${timestamp} ${message}`;
});

const logger = {
    error: function error(message) {
        return winstonLogger.error(message)
    },
    warn: function warn(message) {
        return winstonLogger.warn(message)
    },
    info: function info(message) {
        return winstonLogger.info(message)
    },
    http: function http(message) {
        return winstonLogger.http(message)
    },
    verbose: function verbose(message) {
        return winstonLogger.verbose(message)
    },
    debug: function debug(message) {
        return winstonLogger.debug(message)
    }
}

const winstonLogger = createLogger({
    level: 'debug',
    format: combine(errors({ stack: true }), timestamp(), loggerFormat, format.json()),
    transports: [
        new transports.Console(),
        // new transports.File({ filename: 'error.log', level: 'error' }),
        // new transports.File({ filename: 'combined.log' }),
    ],
});

module.exports = {
    winstonLogger,
    logger,
}