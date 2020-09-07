import { LoginController } from './../controllers/Login';
import { logger } from './../utils/Logger';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { Container } from 'typedi';
import { useExpressServer, useContainer } from 'routing-controllers';
import bodyParser = require('body-parser');
import { graphQl } from '../graphql/graphql';
import path from 'path';

export async function init(): Promise<void> {
    const server = express();
    server.use(cors());
    server.use(bodyParser.json({ limit: '1mb' }));
    const publicFolder = path.join(__dirname, '../', 'public');

    // Add GraphQL middleware
    await graphQl(server);

    useContainer(Container);
    useExpressServer(server, {
        // register created express server in routing-controllers
        cors: true,
        classTransformer: true,
        controllers: [LoginController], // and configure it the way you need (controllers, validation, etc.)
        middlewares: [],
    });

    server.get('/login', (req, res) => {
        res.sendFile(path.join(publicFolder, 'login.html'));
    });
    server.get('*', (req, res) => {
        res.sendFile(path.join(publicFolder, 'index.html'));
    });

    const port = Number(process.env.PORT);
    await server.listen(port);
    logger.info(`server listening on port ${port}`);
}
