import { logger } from './../utils/Logger';
import { createConnection } from 'typeorm';
import { PlatformTools } from 'typeorm/platform/PlatformTools';

export async function init(): Promise<void> {
    await createConnection({
        name: 'default',
        type: PlatformTools.getEnvVariable('DB_DRIVER'),
        url: 'mongodb+srv://mongo_user:YZyU86W6@mongocluster.zycvo.mongodb.net/MYMONGO',
        useNewUrlParser: true,
        authSource: 'admin',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
            // __dirname + "/entity/*.js"
        ],
        options: {
            enableArithAbort: true,
            encrypt: true,
        },
        ssl: true,
        synchronize: true,
        logging: process.env.DB_DEBUG === 'true' ? true : false,
    })
        .then(() => {
            logger.info(`DB Connection - ${process.env.DB_DRIVER}://${process.env.DB_USER}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME} successfull`);
        })
        .catch((error) => logger.error('DB connection error.' + error));
}
