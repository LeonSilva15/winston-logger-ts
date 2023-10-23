import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';

import Logger from './logger/logger';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;
const logger = new Logger({ id: 'Main Logger' });

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  logger.info( 'Succesfully created new worksheet.' )
});

logger.info( 'Sending info message.' )
logger.debug( 'Sending debug message.' )
logger.trace( 'Sending trace message.' )
