import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino'; // Import LoggerModule
import { TodosController } from './todo.controller';
import { TodosService } from './todo.service';
import { Todo } from './todo.entity'; // Import your Todo entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]), // Register Todo entity with TypeORM
    LoggerModule.forRoot(), // Include Pino logger
  ],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService], // Optional: export the service if needed in other modules
})
export class TodosModule {}
