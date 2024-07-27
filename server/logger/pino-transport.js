// logger/pino-transport.js
import pino from 'pino';
import pretty from 'pino-pretty';
import fs from 'fs';
import path from 'path';
import Log from '../model/Log.js';

const logDirectory = './logs';

let stream;

if (process.env.NODE_ENV === 'development') {
  stream = pretty({
    colorize: true, // colorize output in the terminal
    translateTime: 'SYS:standard', // translate epoch time to human-readable format
  });
} else {
  stream = pino.destination({ dest: path.join(logDirectory, 'app.log'), mkdir: true });
}

const logger = pino(stream);

const dbStream = {
  write: async (log) => {
    try {
      const logObject = JSON.parse(log);
      const logEntry = new Log(logObject);
      await logEntry.save();
    } catch (error) {
      console.error('Error saving log to database:', error);
    }
  },
};

const pinoLogger = pino({}, pino.multistream([
  { stream },
  { stream: dbStream },
]));

export default pinoLogger;
