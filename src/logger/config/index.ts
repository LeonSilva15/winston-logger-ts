import Formats from './formats';
import Transports from './transports';

const defaults: {[ key: string ]: any } = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
        trace: 4
    },
    level: 'info',
    console: {
        format: Formats.getDefaultConsoleFormat(),
    },
    file: {
        format: Formats.getDefaultConsoleFormat(),
        filename: './logs/app.log',
    },
    transportsList: [ // valid values in winston.transports
        'Console'
    ],
    Transports: Transports,
    Formats: Formats,
};

export { defaults };
