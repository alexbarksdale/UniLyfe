import 'dotenv/config';

const prod = process.env.NODE_ENV === 'production';

module.exports = {
    type: 'postgres',
    port: process.env.TYPEORM_PORT,
    host: prod ? process.env.TYPEORM_HOST : 'localhost',
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: false,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber',
    },
};
