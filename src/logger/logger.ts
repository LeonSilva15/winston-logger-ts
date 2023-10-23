import winston, { createLogger } from 'winston';
import { defaults } from './config';

type LoggerSettings = {
    id: string;
    parentGlobalId?: string;
    options?: winston.LoggerOptions;
};

export default interface Logger {
    // [name: string]: any;
    error( msg: string ): void;
    warn( msg: string ): void;
    info( msg: string ): void;
    debug( msg: string ): void;
    trace( msg: string ): void;
}

// winston.Logger is problematic to extend
export default class Logger implements Logger {
    private static loggers = new Map<string, Logger>();
    private static globalLogger: Logger = new Logger();
    public static get( composedId?: string ): Logger | undefined {
        if( composedId ) {
            return Logger.loggers.get( composedId );
        }
        return this.globalLogger;
    }
    
    private logger: winston.Logger;
    private globalId: string;
    private id: string;
    private children: Map<string, Logger>;
    
    /**
     * constructor
     * @param settings - LoggerSettings object
     */
    public constructor( settings?: LoggerSettings ) {
        if( settings?.options ) {
            this.logger = createLogger( settings.options );
        } else {
            this.logger = createLogger({
                levels: defaults.levels,
                level: defaults.level,
            });
    
            // Add the default transports here
            for( const transport of defaults.transportsList ) {
                defaults.Transports.addDefaultTransports( transport, this.logger );
            }
        }
        this.children = new Map<string, Logger>();
        this.id = settings?.id || defaults.globalId;

        let globalId = defaults.globalId;

        // parentGlobalId will be sent only if the id was sent aswell
        if( settings?.parentGlobalId ) {
            if( Logger.loggers.has( settings.parentGlobalId ) ) {
                globalId = settings.parentGlobalId;
            } else {
                Logger.globalLogger.error( `Parent logger ${ settings.parentGlobalId } not found.` );
                Logger.globalLogger.warn( `Logger ${ settings.id } will be attached to global logger.` );
            }
        }

        if( settings?.id ) {
            this.globalId = globalId + ':' + settings?.id;
        } else {
            if( Logger.loggers.has( globalId ) ) {
                Logger.globalLogger.warn( 'Global logger overwritten.' );
            }
            this.globalId = defaults.globalId;
        }

        // Add the logger to the global map using its global id
        Logger.loggers.set( this.globalId, this );
    }

    /**
     * Return the childen list of logger or a specific child logger
     * @param id? - specific child logger id
     * @returns 
     */
    public getChildren( id?: string | undefined ): Logger | Map<string, Logger> | undefined {
        if( id ) {
            if( this.children.has( id ) ) {
                return this.children.get( id );
            }
            this.logger.error( `Child logger "${ id }" not found.` );
            return;
        }
        return this.children
    }

    /**
     * Create child logger and add it to both the global loggers and to the children
     * loggers in the parent logger
     * @param id - local logger id
     * @param options? - winston.LoggerOptions
     * @returns new Logger
     */
    public child( id: string, options?: winston.LoggerOptions ): Logger | undefined {
        if( this.children.has( id ) ) {
            this.logger.warn( `Child logger "${ id }" already exists.` );
            return this.children.get( id );
        }
        const logger = new Logger({
            id: id,
            parentGlobalId: this.id,
            options: options
        });

        this.children.set( id, logger );
        return logger;
    }

    /**
     * Winston Logger is problematic to be extended, but we can remap the logging methods
     */
    private log( level: string, msg: string ) {
        this.logger[ level as keyof winston.Logger ]({
            message: msg,
            component: this.id,
        });
    }
    public error( msg: string ) {
        this.log( 'error', msg );
    }
    public warn( msg: string ) {
        this.log( 'warn', msg );
    }
    public info( msg: string ) {
        this.log( 'info', msg );
    }
    public debug( msg: string ) {
        this.log( 'debug', msg );
    }
    public trace( msg: string ) {
        this.log( 'trace', msg );
    }
}
