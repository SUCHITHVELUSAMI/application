import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env globally
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 10),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Automatically sync schema with database
    }),
    UsersModule,
    TodosModule,
  ],
})
export class AppModule {}
