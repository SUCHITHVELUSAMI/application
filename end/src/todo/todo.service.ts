// src/todos/todo.service.ts
import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity'; // Your Todo entity

@Injectable()
export class TodosService {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(TodosService.name);
  }

  private todos: Todo[] = []; // Replace this with a proper database connection in production

  async create(todoData: CreateTodoDto): Promise<Todo> {
    const newTodo: Todo = {
      id: Date.now(), // Simulating ID generation; replace with your database logic
      name: todoData.name,
      description: todoData.description,
      time: new Date(todoData.time), // Ensure this is a Date object
      status: todoData.status,
    };

    this.logger.info('Creating a new todo');
    this.todos.push(newTodo);
    this.logger.info(`Todo created with ID: ${newTodo.id}`);
    return newTodo;
  }

  async findAll(page: number): Promise<{ todos: Todo[]; totalPages: number }> {
    const itemsPerPage = 10; // Example items per page
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedTodos = this.todos.slice(start, end);
    const totalPages = Math.ceil(this.todos.length / itemsPerPage);

    return { todos: paginatedTodos, totalPages };
  }
}
