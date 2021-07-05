import { createLogger, format, transports } from 'winston';

const print = format.printf((info) => {
  const log = `[${(new Date()).toLocaleString()}] ${info.level}: ${info.message}`;

  return info.stack
    ? `${log}\n${info.stack}`
    : log;
});

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.errors({ stack: true }),
    print,
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `quick-start-combined.log`.
    // - Write all logs error (and below) to `quick-start-error.log`.
    //
    new transports.File({ filename: 'logs/errors.log', level: 'error' }),
    new transports.File({ filename: 'logs/trace.log' })],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
      print,
    ),
  }));
}

export default logger;
