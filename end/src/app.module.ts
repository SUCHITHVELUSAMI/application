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
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USERNAME || 'touse',
      password: process.env.POSTGRES_PASSWORD || 'topass',
      database: process.env.POSTGRES_DATABASE || 'To',
      entities: [Todo, User], // Add both entities here
      synchronize: true,
    }),
    TodoModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
