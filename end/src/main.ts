// /backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { HttpExceptionFilter } from './common/filters/http-exception.filter'; // Import the custom filter
import { PinoLogger } from 'nestjs-pino'; // Import PinoLogger

async function bootstrap() {
  // Create the Nest application
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Get the PinoLogger instance
  const logger = app.get(PinoLogger);

  // Set up global exception filter with the logger
  app.useGlobalFilters(new HttpExceptionFilter(logger)); 

  app.enableCors();

  await app.listen(3001);
}
bootstrap();
