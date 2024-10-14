import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter'; // Import your exception filter

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Apply the exception filter globally
  app.useGlobalFilters(new HttpExceptionFilter());

  // Set up Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API for managing todos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the application on port 3000
  await app.listen(3000);
}

bootstrap();
