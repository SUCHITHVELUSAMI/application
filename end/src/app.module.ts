import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todo/todo.module'; // Import your Todos module
import { validateConfig } from './config.validation'; // Ensure this file exists

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig, // Use the validation function
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USERNAME || 'touse',
      password: process.env.POSTGRES_PASSWORD || 'topass',
      database: process.env.POSTGRES_DATABASE || 'To',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    UserModule,
    AuthModule,
    TodosModule, // Register the Todos module
  ],
})
export class AppModule {}
