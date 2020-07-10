import 'reflect-metadata';
import 'dotenv/config';
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
        logger.error(`Failed to connect to the database: ${err}`);
    }

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [path.join(__dirname, '/resolvers/**/*.{ts,js}')],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ path: '/api', app, cors: false });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        logger.info(`UniLyfe API is running on port: ${PORT}`);
    });
})();
