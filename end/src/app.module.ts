import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { LoggingMiddleware } from './middleware/logging.middleware'; 
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load environment variables globally
    TypeOrmModule.forRoot({
      type: 'postgres', // Database type
      host: process.env.POSTGRES_HOST, // Host from environment variables
      port: parseInt(process.env.POSTGRES_PORT, 10), // Port from environment variables
      username: process.env.POSTGRES_USERNAME, // Username from environment variables
      password: process.env.POSTGRES_PASSWORD, // Password from environment variables
      database: process.env.POSTGRES_DATABASE, // Database name from environment variables
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Load entity files
      synchronize: true, // Automatically synchronize the database schema
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Use JWT secret from env variables
      signOptions: { expiresIn: '1h' }, // Set token expiration time
    }),
    UsersModule, // Import Users module
    TodosModule, // Import Todos module
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware) // Apply LoggingMiddleware
      .forRoutes('*'); // Apply to all routes
  }
}
