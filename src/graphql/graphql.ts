import { SpaceResolver } from './resolvers/SpaceResolver';
import { TaskResolver } from './resolvers/TaskResolver';
import { ShopItemResolver } from './resolvers/ShopItemResolver';
import { ShoppingListResolver } from './resolvers/ShoppingListResolver';
import { Context } from './../models/Context';
import { UserResolver } from './resolvers/UserResolver';
import { logger } from './../utils/Logger';
import { GraphQLSchema } from 'graphql';
import path from 'path';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

export async function graphQl(server: any): Promise<void> {
    const debugMode = process.env.GRAPHQL_DEBUG?.toLowerCase() === 'true' ? true : false;
    const introspection = debugMode ? true : false;
    const playground = debugMode ? true : false;
    const schema = <GraphQLSchema>await buildSchema({
        resolvers: [UserResolver, SpaceResolver, ShoppingListResolver, ShopItemResolver, TaskResolver],
        // automatically create `schema.gql` file with schema definition in current folder
        emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
    }).catch((err) => {
        logger.error(err.message);
    });

    server.use(
        cors({
            origin: '*',
            optionsSuccessStatus: 200,
        })
    );

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req, res }) => {
            if (debugMode) {
                logger.info(`Query: ${req.body.operationName}`);
                logger.info(`Parameters: ` + JSON.stringify(req.body.variables));
            }
            const ctx: Context = {
                req,
                res,
            };
            return ctx;
        },
        debug: debugMode,
        tracing: debugMode,
        introspection,
        playground,
    });

    apolloServer.applyMiddleware({ app: server });
}
