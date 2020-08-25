import { logger } from './utils/Logger';
import 'reflect-metadata';
import * as http from './IO/server';
import * as database from './IO/database';

(async () => {
    // const baseDir = __dirname;
    await http.init();
    await database.init();
    logger.info('Application running!');
})().catch((error) => {
    logger.error(error);
});
