// /backend/src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Todo } from '../todo/todo.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USERNAME || 'touse',
      password: process.env.POSTGRES_PASSWORD || 'topass',
      database: process.env.POSTGRES_DATABASE || 'To',
      entities: [User, Todo],
      synchronize: true, // Disable in production
    }),
  ],
})
export class DatabaseModule {}
