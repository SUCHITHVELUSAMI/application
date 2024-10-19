// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todos/todos.module'; 
import { UsersModule } from './users/users.module'; 
import { AuthModule } from './auth/auth.module'; 
import { Todo } from './todos/todo.entity'; 
import { User } from './users/user.entity'; // Import the User entity

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost', // Database host
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432, // Database port
      username: process.env.POSTGRES_USERNAME || 'touse', // Database username
      password: process.env.POSTGRES_PASSWORD || 'topass', // Database password
      database: process.env.POSTGRES_DATABASE || 'To', // Database name
      entities: [Todo, User], // Registering Todo and User entities
      synchronize: true, // Automatically synchronize the database schema (not recommended for production)
    }),
    TodoModule, // Module for managing todos
    UsersModule, // Module for managing users
    AuthModule, // Module for authentication
  ],
})
export class AppModule {}
