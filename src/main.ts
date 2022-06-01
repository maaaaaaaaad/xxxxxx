import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import helmet from 'helmet';
import * as csurf from 'csurf';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike('PRO', {
              prettyPrint: true,
            }),
          ),
        }),
        new winston.transports.File({
          filename: 'combined.log',
          level: 'info',
        }),
        new winston.transports.File({
          filename: 'errors.log',
          level: 'error',
        }),
      ],
    }),
  });
  app.use(helmet());
  app.use(csurf());
  const port = process.env.PORT;
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(port, () => console.log(`Start server port ${port}`));
}
bootstrap().then();
