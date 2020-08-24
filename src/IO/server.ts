import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { Container } from 'typedi';
import { useExpressServer, useContainer } from 'routing-controllers';
import bodyParser = require('body-parser');

export async function init(): Promise<void> {
    const server = express();
    server.use(cors());
    server.use(bodyParser.json({ limit: '1mb' }));

    // Add GraphQL middleware
    // await addGrapQL(httpServer);

    useContainer(Container);
    useExpressServer(server, {
        // register created express server in routing-controllers
        cors: true,
        classTransformer: true,
        controllers: [], // and configure it the way you need (controllers, validation, etc.)
    });

    await server.listen(3000);
    console.log(`server listening on port 3000`);
}
