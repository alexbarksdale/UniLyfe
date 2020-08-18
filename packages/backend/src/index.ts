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
import nodemailer from 'nodemailer';

import { logger } from './utils/logger.util';
import { authRouter } from './routers/auth.router';

(async () => {
    const app = express();
    // Middlewares
    app.use(
        cors({
            origin: `${process.env.WEB_IP}`,
            credentials: true,
        })
    );
    app.use(cookieParser());
    app.use(authRouter);

    // Database
    try {
        // Refer to the ormconfig.ts to change the database settings
        await createConnection();
        logger.info('Connected to the database.');
    } catch (err) {
        logger.error("If you're running this on docker you may need to restart again.");
        logger.error(`Failed to connect to the database: ${err}`);
    }

    // Email service
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_LOGIN!,
            pass: process.env.EMAIL_PASSWORD!,
        },
    });

    // Apollo Server
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [path.join(__dirname, '/resolvers/**/*.{ts,js}')],
        }),
        playground: true,
        context: ({ req, res }) => ({ req, res, transporter }),
    });

    apolloServer.applyMiddleware({ path: '/api', app, cors: false });

    // HTTP Server
    const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        logger.info(`UniLyfe API is running on: ${process.env.API_IP}`);
        logger.info(
            `UniLyfe subscriptions running on ws://localhost:${PORT}${apolloServer.subscriptionsPath}`
        );
    });
})();
