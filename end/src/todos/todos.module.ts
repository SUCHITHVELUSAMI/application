import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo } from './todo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo]),  // Import TypeOrm module for the Todo entity
  ],
  providers: [
    TodosService,  // Provide the TodosService for dependency injection
  ],
  controllers: [
    TodosController,  // Register the TodosController for handling requests
  ],
})
export class TodosModule {}
