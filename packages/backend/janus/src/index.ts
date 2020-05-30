import 'reflect-metadata';
import 'dotenv/config';
import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { logger } from './utils/logger.utils';
import { router as refreshRouter } from './routers/refresh.router';

(async () => {
    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(
        cors({
            origin: 'YOUR_URL',
            credentials: true,
        })
    );
    app.use(cookieParser());
    app.use(refreshRouter);

    try {
        // Refer to the ormconfig.json to change the database settings
        await createConnection();
        logger.info('Connected to the database.');
    } catch (err) {
        logger.error(`Failed to connect to the database: ${err}`);
    }

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [path.join(__dirname, '/resolvers/**/*.{ts,js}')],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ path: '/auth', app, cors: false });

    app.listen(PORT, () => {
        logger.info(`Janus is running on port: ${PORT}`);
    });
})();
