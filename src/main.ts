import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import helmet from 'helmet';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format: winston.format.combine(
            winston.format.timestamp({
              format: new Date().toLocaleString('ko-KR', { hour12: true }),
            }),
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
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const port = process.env.PORT;
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('PRO')
      .setDescription('The PRO API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
  await app.listen(port, () => logger.log(`Start server port ${port}`));
}
bootstrap().then();
