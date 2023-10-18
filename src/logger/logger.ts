import winston, { createLogger } from 'winston';

export default class Logger {
    private static globalLogger: winston.Logger = createLogger({});
    // public static loggers = new Map<string, winston.Logger>();
    // public static loggers = winston.loggers;
    public static loggers = new winston.Container();

    public static add( id: string, options?: winston.LoggerOptions | undefined ) {
        // this.globalLogger.profile('')
        this.loggers.add( id,  );
    }

    public static get( id?: string | undefined ) {
        if( id ) {
            return this.loggers.get( id );
        }
        return this.globalLogger;
    }

    public static remove( id: string ) {
        const logger = this.loggers.get( id );
        this.loggers.get( id ).removeAllListeners();
        this.loggers.close( id );
    }
}
