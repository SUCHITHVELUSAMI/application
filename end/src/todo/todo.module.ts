// /backend/src/todo/todo.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todo.service';
import { TodosController } from './todo.controller';
import { Todo } from './todo.entity'; // Import your Todo entity
import { LoggerModule } from 'nestjs-pino'; // Import LoggerModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]), // Register Todo entity with TypeORM
    LoggerModule.forRoot(), // Add this line to include Pino logger
  ],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService], // Optional: export the service if needed in other modules
})
export class TodosModule {}
