// src/todo/todo.service.ts
import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino'; // Import PinoLogger
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity'; // Assuming you have a Todo entity defined

@Injectable()
export class TodosService {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(TodosService.name); // Set the context for the logger
  }

  private todos: Todo[] = []; // Or use a database service

  async create(todoData: CreateTodoDto): Promise<Todo> {
    // Ensure the 'time' is parsed as a Date
    const newTodo: Todo = {
      id: Date.now(), // Assuming ID is generated like this
      name: todoData.name,
      description: todoData.description,
      time: new Date(todoData.time), // Convert string to Date
      status: todoData.status,
    };
    
    this.logger.info('Creating a new todo'); // Use info() for logging
    this.todos.push(newTodo); // Add to the in-memory array (replace with DB logic)
    this.logger.info(`Todo created with ID: ${newTodo.id}`);
    return newTodo;
  }

  async findAll(page: number): Promise<Todo[]> {
    return this.todos; // Replace with logic to handle pagination if necessary
  }
}
