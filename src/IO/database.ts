import { logger } from './../utils/Logger';
import { createConnection } from 'typeorm';
import { PlatformTools } from 'typeorm/platform/PlatformTools';

export async function init(): Promise<void> {
    try {
        const host: string = process.env.DB_HOST as string;
        const user: string = process.env.DB_USER as string;
        const password: string = process.env.DB_PASSWORD as string;
        const database: string = process.env.DB_NAME as string;
        const driver: string = process.env.DB_DRIVER as string;
        const port: string = process.env.DB_PORT as string;
        const debug: string = process.env.DB_DEBUG as string;
        await createConnection({
            name: 'default',
            type: PlatformTools.getEnvVariable('DB_DRIVER'),
            url: `mongodb+srv://${user}:${password}@${host}/${database}`,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin',
            host,
            port: Number(port),
            username: user,
            password,
            database,
            entities: [
                // __dirname + "/entity/*.js"
            ],
            options: {
                enableArithAbort: true,
                encrypt: true,
            },
            ssl: true,
            synchronize: true,
            logging: debug === 'true' ? true : false,
        })
            .then(() => {
                logger.info(`DB Connection - ${driver}://${user}@${host}:${port}/${database} successfull`);
            })
            .catch((error) => logger.error('DB connection error.' + error));
    } catch (error) {
        logger.error(`ENV VARS missing. message: ${error}`);
    }
}
