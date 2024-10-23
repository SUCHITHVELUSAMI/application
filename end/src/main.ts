import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // Enable CORS
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  app.enableCors({
    origin: frontendUrl,
    credentials: true,
  });
  logger.log(`CORS enabled for: ${frontendUrl}`);

  // Enable global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Set a global prefix for the API routes
  app.setGlobalPrefix('api'); // This ensures all routes are prefixed with /api

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);

  // Graceful shutdown
  process.on('SIGINT', async () => {
    logger.log('Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    logger.log('Shutting down gracefully...');
    await app.close();
    process.exit(0);
  });
}

// Error handling during bootstrap
bootstrap().catch(err => {
  const logger = new Logger('Bootstrap');
  logger.error('Error during application bootstrap:', err);
});
