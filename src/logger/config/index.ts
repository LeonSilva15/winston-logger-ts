import Formats from './formats';
import Transports from './transports';

const defaults: {[ key: string ]: any } = {
    globalId: 'app',
    level: 'info',
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        debug: 3,
        trace: 4
    },
    levelColors: {
        error: 'red',
        warn: 'yellow',
        info: 'gray',
        debug: 'blue',
        trace: 'cyan',
    },
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

Formats.addLevelsToColorize( defaults.levelColors );

export { defaults };
