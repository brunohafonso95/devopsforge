const { createLogger, transports: Transports } = require('winston');
const { existsSync, mkdirSync } = require('fs');
const morgan = require('morgan');

const options = {
  file: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

function createLogFolder() {
  if (!existsSync('logs')) {
    mkdirSync('logs');
  }
}

createLogFolder();
const logger = createLogger({
  transports: [
    new Transports.File(options.file),
    new Transports.Console(options.console),
  ],
  exitOnError: false,
});

logger.stream = {
  write(message) {
    logger.info(message);
  },
};

const morganMiddleware = morgan((tokens, req, res) => [
  tokens['user-agent'](req, res),
  tokens.date(req, res),
  `HTTP/${tokens['http-version'](req, res)}`,
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  `${(tokens.res(req, res, 'content-length') / 1024).toFixed(3)}kb`, '-',
  tokens['response-time'](req, res), 'ms',
].join(' '), { stream: logger.stream });

module.exports = { morganMiddleware, logger };
