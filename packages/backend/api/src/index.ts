import 'dotenv/config';
import express from 'express';
import path from 'path';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { logger } from './utils/logger.utils';

(async () => {
    const app = express();
    const PORT = process.env.PORT || 4000;

    try {
        await createConnection();
        logger.info('Connected to the database.');
    } catch (err) {
        logger.error(`Failed to connect to the database: ${err}`);
    }

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [path.join(__dirname, '/resolvers/**/*.{ts,js}')],
        }),
    });

    apolloServer.applyMiddleware({ path: '/api', app });

    app.listen(PORT, () => {
        logger.info(`UniLyfe API is running on port: ${PORT}`);
    });
})();
