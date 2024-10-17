import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto'; // Importing DTO for creating a todo
import { UpdateTodoDto } from './update-todo.dto'; // Importing DTO for updating a todo

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  // Find all todos with pagination and filtering
  async findAll(page: number = 1, limit: number = 10, status?: string): Promise<Todo[]> {
    const query = this.todosRepository.createQueryBuilder('todo');

    if (status) {
      query.where('todo.status = :status', { status });
    }

    query.skip((page - 1) * limit).take(limit);

    return await query.getMany(); // Return the array of todos
  }

  // Find a single todo by its ID
  async findOne(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new Error(`Todo with ID ${id} not found`); // Optionally, throw a custom exception here
    }
    return todo;
  }

  // Create a new todo
  async create(todo: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todosRepository.create(todo); // Create a new todo
    return this.todosRepository.save(newTodo); // Save to the database and return the saved todo
  }

  // Update an existing todo
  async update(id: number, todo: UpdateTodoDto): Promise<Todo> {
    await this.todosRepository.update(id, todo);
    return this.findOne(id); // Return the updated todo
  }

  // Remove a todo by its ID
  async remove(id: number): Promise<void> {
    const result = await this.todosRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Todo with ID ${id} not found`); // Optionally, throw a custom exception here
    }
  }
}
