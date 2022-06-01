import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    name: process.env.TYPEORM_NAME,
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB_NAME,
    entities: [__dirname + '/*/entities/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migrations',
    },
    migrationsRun: false,
    ...(process.env.NODE_ENV === 'production' && {
      ssl: { rejectUnauthorized: false },
    }),
  };
});
