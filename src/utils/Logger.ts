import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DDTHH:mm:ss 000Z',
        }),
        format.json()
    ),
    transports: [
        new transports.Console({
            handleExceptions: true,
            format: format.combine(
                format.colorize(),
                format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
            ),
        }),
        // new transports.File({
        //     dirname: 'logs/',
        //     filename: 'application.log',
        //     maxsize: 1024 * 1024 * 5,
        //     maxFiles: 2,
        //     tailable: true,
        //     handleExceptions: true,
        // }),
    ],
    exitOnError: true,
});
