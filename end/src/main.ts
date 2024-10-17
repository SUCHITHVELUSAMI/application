import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter'; // Import your exception filter
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common'; // Import Logger for better logging

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Create a logger instance
  const logger = new Logger('Bootstrap');

  // Apply the exception filter globally
  app.useGlobalFilters(new HttpExceptionFilter());

  // Set up Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API for managing todos')
    .setVersion('1.0')
    .addTag('todos') // Optional: add tags for better organization
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3001; // Use environment variable for port
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`); // Log the application start
}

bootstrap();
