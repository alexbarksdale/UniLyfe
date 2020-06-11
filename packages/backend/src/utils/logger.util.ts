import { createLogger, format, transports } from 'winston';

const loggerFormat = format.combine(
    format.label({ label: 'AUTH' }),
    format.timestamp({ format: 'MM/DD/YYYY HH:MM:SS' }),

    format.printf(({ timestamp, level, label, message }): string => {
        return `[${timestamp}][${label}][${level.toUpperCase()}]: ${message}`;
    })
);

export const logger = createLogger({
    level: 'info',
    format: loggerFormat,
    transports: [
        new transports.File({ filename: 'src/logs/server.log' }),
        new transports.File({ filename: 'src/logs/error.log', level: 'error' }),
        new transports.Console({ format: loggerFormat }),
    ],
});

