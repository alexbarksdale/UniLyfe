import 'reflect-metadata';
import 'dotenv/config';
import http from 'http';
import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { logger } from './utils/logger.util';
import { router as refreshRouter } from './routers/refresh.router';

(async () => {
    const app = express();

    app.use(
        cors({
            origin: 'http://localhost:3000',
            credentials: true,
        })
    );
    app.use(cookieParser());
    app.use(refreshRouter);

    try {
        // Refer to the ormconfig.ts to change the database settings
        await createConnection();
        logger.info('Connected to the database.');
    } catch (err) {
        logger.error("If you're running this on docker you may need to restart again.");
        logger.error(`Failed to connect to the database: ${err}`);
    }

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [path.join(__dirname, '/resolvers/**/*.{ts,js}')],
        }),
        playground: true,
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ path: '/api', app, cors: false });

    const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        logger.info(`UniLyfe API is running on port: ${PORT}`);
        logger.info(
            `UniLyfe subscriptions running on ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
        );
    });
})();
