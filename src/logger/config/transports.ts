import winston, { transports } from 'winston';
import { defaults } from './';

export default class Transports {
    public static addDefaultTransports( transport: string, logger: winston.Logger ) {
        switch( transport ) {
            case 'Console':
                logger.add(
                    new transports.Console({
                        format: defaults.console.format,
                    })   
                );
                break;
            case 'File':
                logger.add(
                    new transports.File({
                        format: defaults.console.file.format,
                        filename: defaults.console.file.filename,
                    })   
                );
                break;
        }
    }
}
