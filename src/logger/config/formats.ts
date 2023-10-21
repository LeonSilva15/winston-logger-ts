import winston, { format } from 'winston';
const { timestamp, combine, json, errors, colorize, printf } = format;

/**
 * default settings for the log formatting
 */
const DEFAULT = {
    component: 'App Message',
    console: {
        color: 'bold gray',
        // used to align the outputs with blank spaces
        lenghts: {
            level: 5,
            component: 15,
        },
        // this will be reindexed in the colorizer.addColors using the components name
        colors: [
            'bold cyan',
            'bold blue',
            'bold gray',
            'bold magenta',
        ],
        // blueprint for timestamp
        timestamp: 'YYYY-MM-DD hh:mm:ss',
        // message formatting method
        textFormatter: printf(( info: winston.Logform.TransformableInfo ) => {
            // extract the attributes received in the info parameter
            const { level, timestamp, message } = info;
            const component = info.component || DEFAULT.component;
            
            // separate the printable variables to avoid polluting info
            const printable = Object.assign( {}, info );
            printable.component = component;

            // level in upper case
            printable.level = printable.level.toUpperCase();

            // set the desired spacing            
            printable.level = printable.level.padEnd( DEFAULT.console.lenghts.level );
            printable.component = printable.component.padEnd( DEFAULT.console.lenghts.component );
            
            // get the the console colorizer
            const colorizer = Formats.getConsoleClorizer();

            // avoid colorizing the info and leave it with the default system color
            if( level != 'info' ) {
                printable.message = colorizer.colorize( level, printable.message );
                printable.level = colorizer.colorize( level, printable.level );
            }
            
            // color the app components to differentiate them
            printable.component = colorizer.colorize( component, printable.component);

            return `[${ printable.timestamp }] [${ printable.component }] [${ printable.level }] ${ printable.message }`;
        })
    }
}

export default class Formats {
    private static consoleColorizer: winston.Logform.Colorizer;

    /**
     * Get static instance of winston colorizer
     * @returns colorizer
     */
    public static getConsoleClorizer(): winston.Logform.Colorizer {
        if( this.consoleColorizer ) {
            return this.consoleColorizer;
        }
        this.consoleColorizer = colorize();
        
        const defaultColor: winston.Logform.Colors = {};
        defaultColor[ DEFAULT.component ] = DEFAULT.console.color;

        this.consoleColorizer.addColors( defaultColor );

        return this.consoleColorizer;
    }

    /**
     * Add components or parts of the application to idenify the logging areas
     * @param listOfComponents - array of name of components
     */
    public static addComponentsToColorize( listOfComponents: string[] ) {
        const colorsMap: winston.Logform.Colors = {};
        
        const defaultColors = DEFAULT.console.colors;
        const colorsLenght = defaultColors.length;
        
        for( const componentIdx in listOfComponents ) {
            const component = listOfComponents[ componentIdx ];
            const colorIdx = Number( componentIdx ) % colorsLenght;

            colorsMap[ component ] = defaultColors[ colorIdx ];
        }
        
        this.consoleColorizer.addColors( colorsMap );
    }

    /**
     * Get the winston formatter with the default settings
     * @returns winston formatter
     */
    public static getDefaultConsoleFormat(): winston.Logform.Format {
        this.consoleColorizer = this.getConsoleClorizer();
        
        return combine(
            timestamp({
                format: DEFAULT.console.timestamp,
            }),
            DEFAULT.console.textFormatter,
        );
    }

}
