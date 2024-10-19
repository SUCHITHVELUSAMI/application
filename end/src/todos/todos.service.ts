import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { User } from '../users/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async getTodos(user: User, page: number = 1, limit: number = 10): Promise<Todo[]> {
    const [todos, total] = await this.todoRepository.findAndCount({
      where: { user },
      take: limit,
      skip: (page - 1) * limit,
    });
    return todos;
  }

  async getTodoById(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async createTodo(user: User, createTodoDto: CreateTodoDto): Promise<Todo> {
    // Ensure the createTodoDto has title and description properly populated
    const todo = this.todoRepository.create({
      ...createTodoDto, // Spread operator to take title, description, and status
      user, // Associate the todo with the user
    });

    // Log the todo being created for debugging
    console.log('Creating todo with data:', todo);

    return await this.todoRepository.save(todo);
  }

  // Implement other methods like updateTodo, deleteTodo, etc.
}
