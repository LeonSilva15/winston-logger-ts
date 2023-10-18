import winston, { format } from 'winston';
const { timestamp, combine, json, errors, colorize, printf } = format;



const DEFAULT = {
    component: 'App Message',
    color: 'bold gray',
    console: {
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
            

            // avoid colorizing the info and leave it with the default system color
            if( level != 'info' ) {
                printable.message = Formats.colorizer.colorize( level, printable.message );
                printable.level = Formats.colorizer.colorize( level, printable.level );
            }
            
            // color the app components to differentiate them
            printable.component = Formats.colorizer.colorize( component, printable.component);

            return `[${ printable.timestamp }] [${ printable.component }] [${ printable.level }] ${ printable.message }`;
        })
    }
}

export default class Formats {
    public static colorizer: winston.Logform.Colorizer;

    public static getColorizer(){
        if( this.colorizer ) {
            return this.colorizer;
        }
        this.colorizer = colorize();
        
        const defaultColor: winston.Logform.Colors = {};
        defaultColor[ DEFAULT.component ] = DEFAULT.color;

        this.colorizer.addColors( defaultColor );

        return this.colorizer;
    }

    public static addComponentsToColorize( listOfComponents: string[] ) {
        const colorsMap: winston.Logform.Colors = {};
        
        const defaultColors = DEFAULT.console.colors;
        const colorsLenght = defaultColors.length;
        
        for( const componentIdx in listOfComponents ) {
            const component = listOfComponents[ componentIdx ];
            const colorIdx = Number( componentIdx ) % colorsLenght;

            colorsMap[ component ] = defaultColors[ colorIdx ];
        }
        
        this.colorizer.addColors( colorsMap );
    }

    public static getDefaultFormat() {
        this.colorizer = this.getColorizer();
        
        return combine(
            timestamp({
                format: DEFAULT.console.timestamp,
            }),
            DEFAULT.console.textFormatter,
        );
    }

}
