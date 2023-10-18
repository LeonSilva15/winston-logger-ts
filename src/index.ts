import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import winston, { createLogger, transports, format } from 'winston';
import { Logform } from 'winston';
import { ColorizeOptions } from 'logform';

import Formats from './logger/config/formats';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  // console.log(`Server is Fire at http://localhost:${port}`);
});

// const logger = createLogger({
//   level: 'info',
//   // format: winston.format.json(),
//   // format: winston.format.cli(),
//   format: format.combine(format.timestamp(), format.json()),
//   transports: [new winston.transports.Console()],
// });

// const logLevels = {
//   fatal: 0,
//   ERROR: 1,
//   WARN: 2,
//   info: 3,
//   debug: 4,
//   trace: 5,
// };


// const logger = winston.createLogger({
//   // levels: logLevels,
//   // level: 'error',
//   level: process.env.LOG_LEVEL || 'info',
//   format: format.combine(
//     format.colorize({ all: true }),
//     // winston.format.cli(),
//     format.timestamp({
//       format: 'YYYY-MM-DD hh:mm:ss.SSS A',
//     }),
//     format.align(),
//     format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
//   ),
//   transports: [new winston.transports.Console()],
//   defaultMeta: {
//     service: "WinstonExample",
//   },

// });

// let logger = new (winston.Logger)({
//   // exitOnError: false,
//   // level: 'info',
//   transports: [
//       new (winston.transports.Console)(),
//       // new (winston.transports.File)({ filename: 'app.log'})
//   ]
// });



// logger.crit('123')
// const padding= info.level.length <= 7?7:17;  //padding differently if it has colour.
// ${info.level.padEnd(padding,' ')}

// let alignColorsAndTime = winston.format.combine(
//   winston.format.label({
//       label:'[LOGGER]'
//   }),
//   winston.format.timestamp({
//       format:"YY-MM-DD HH:mm:ss"
//   }),
//   winston.format.printf(
//       info => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`
//   ),
//   // winston.format.colorize({
//   //     all:true
//   // }),
// );
  
// export const logger = winston.createLogger({
//   level: "debug",
//   transports: [
//       new (winston.transports.Console)({
//           format: winston.format.combine(winston.format.colorize(), alignColorsAndTime)
//       })
//   ],
// });


// winston.addColors({
//   t1: 'bold cyan',
//   t2: 'bold blue',
//   t3: 'bold magenta',
//   t4: 'bold gray',
// });

// const colors = new Map<string, string>();
// colors.set( 'SQL Worksheet', 't1' );
// colors.set( 'Connections Tree', 't2' );
// colors.set( 'SQL History', 't3' );
// colors.set( 'DBTools Server', 't4' );

// // = {
// //   'SQL Worksheet': 't1',
// //   'Connections Tree': 't2',
// //   'SQL History': 't3',
// // }

// const colorizer = winston.format.colorize();
// const defaultLength = 5;

// const someColoredFormat = format.printf(({ level, timestamp, message, method }) => {
//   // { level, timestamp, message, method }
//   // console.log( level );
//   // level = level.padEnd( 10, "-" )
//   // const level2 = level.toUpperCase()
//   // const levels= {
//   //   info: 'INFO',
//   //   error: 'ERROR',
//   //   warn: 'WARN',
//   // }
//   // ${level}:\t
//   const color = colors.get( method ) || 't1';
//   // level = colorizer.colorize( 'info', level );
//   level = level.padEnd( defaultLength )
//   if( level.trim() != 'INFO' ) {
//     // console.log( format.colorize({ level: true }));
//     message = colorizer.colorize( level.trim().toLocaleLowerCase(), message );
//     // format.uncolorize({ message: true} );
//     level = colorizer.colorize( level.trim().toLowerCase(), level.padEnd( defaultLength ));
//   }
//   // level = level.padEnd( defaultLength )
//   return `[${timestamp}] [${colorizer.colorize( color, method)}\t] [${level}] ${message}`
// });

// // console.log(
// //   format.colorize
// // );
// const a = format(info => {
//   // const level = info.level.toUpperCase()
//   // info.level = colorizer.colorize(info.level, level)

//   info.level = info.level.toUpperCase()
//   return info;
// });

const logger = createLogger({
  // levels: logLevels,
  level: 'info',
  format: Formats.getDefaultFormat(),
  // format: format.combine(
  //   a(),

  //   format.timestamp({
  //     format: 'YYYY-MM-DD hh:mm:ss',
  //   }),
  //   // format.colorize({
  //   //   // level: true,
  //   //   all: true,
  //   // }),
  //   // format(info => {
  //   //   format.colorize({
  //   //       // level: true,
  //   //       all: true,
  //   //     })
  //   //   // const level = info.level.toUpperCase()
  //   //   // info.level = colorizer.colorize(info.level, level)
  //   //   // if( info.level == 'INFO' )
  //   //   //   format.uncolorize({ level: true, message: true })
  //   //   // info.level = info.level.toUpperCase()
  //   //   return info;
  //   // })(),
  //   // format.align(),
  //   // format(()=>{

  //   // }))(),
  //   someColoredFormat,
  //   // format(info => {
  //   //   // const level = info.level.toUpperCase()
  //   //   // info.level = colorizer.colorize(info.level, level)
  //   //   if( info.level == 'INFO' )
  //   //     format.uncolorize({ level: true })
  //   //   // info.level = info.level.toUpperCase()
  //   //   return info;
  //   // })(),
  //   // format.uncolorize({
  //   //   level: true,
  //   // }),
  //   // format.colorize({
  //   //   level: true,
  //   // }),
  // ),
  transports: [new transports.Console()],
})

// logger.configure({

//   level: 'error',
//   format: format.combine(
//       format.colorize({
//         // level: true,
//         all: true,
//       }),
//       format.printf((info) => {
//         return `${ info.level }: ${ info.message }`;
//       })
//     ),
//   transports: [new transports.Console()],
// })

// logger.info('INFO',{
//   method: 'GET',
//   message: 'some/api/route'
// })

logger.info({
  method: 'SQL Worksheet',
  message: 'Succesfully created new worksheet.'
})
logger.error({
  method: 'Connections Tree',
  message: 'Error trying to connect to \'http://localhost:3953\'.'
})
logger.warn({
  method: 'SQL History',
  message: 'Some statements in the history might be lost.'
})
logger.info({
  method: 'DBTools Server',
  message: 'Server is waiting for new connections.'
})
logger.info({
  method: 'DBTools Server',
  message: 'Server is waiting for new connections.'
})
logger.error({
  method: 'DBTools Server',
  message: 'Server stopped while waiting for new connections.'
})
logger.info({
  method: 'SQL Worksheet',
  message: 'Succesfully created new worksheet.'
})
logger.warn({
  method: 'SQL Worksheet',
  message: 'Spot me if you can! :O.'
})
logger.warn({
  method: 'SQL Worksheet',
  message: 'Some other random message.'
})

const l2 = logger.child({})

l2.info('hola hola')
// l2.filter( item => {
//   console.log( item )
//   return true;
// } )
// logger.info('Info message');
// logger.error('Error message');
// logger.warn('Warning message');
// logger.log( 'error', '123' );
// logger.log( 'crit', '321' );

// logger.log(, 'error message');

// logger.error('error');
// logger.warn('warn');
// logger.info('info');
// logger.verbose('verbose');
// logger.debug('debug');
// logger.silly('silly');
// logger.fatal('fatal!');
// logger.trace('trace!');


