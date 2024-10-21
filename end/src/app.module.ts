// /backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { TodosModule } from './todo/todo.module'; // Change this line to match the correct name
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'touse', // Replace with your PostgreSQL username
      password: 'topass', // Replace with your PostgreSQL password
      database: 'To', // Replace with your database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Adjust if your entity paths are different
      synchronize: true, // Set to false in production
    }),
    UserModule,
    TodosModule, // Update here
    AuthModule,
  ],
})
export class AppModule {}
