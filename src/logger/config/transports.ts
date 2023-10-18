import { transports } from 'winston';

export const DEFAULTS = {
    'transports': [
        new transports.Console()
    ]
};
