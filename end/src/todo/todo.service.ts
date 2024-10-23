import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    private readonly logger: PinoLogger,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {
    this.logger.setContext(TodosService.name);
  }

  async create(todoData: CreateTodoDto): Promise<Todo> {
    const newTodo = this.todoRepository.create(todoData);
    try {
      await this.todoRepository.save(newTodo);
      this.logger.info(`Todo created successfully with ID: ${newTodo.id}`, { todoData });
      return newTodo;
    } catch (error) {
      this.logger.error('Failed to create a todo', { error, todoData });
      throw new InternalServerErrorException('Could not create todo');
    }
  }

  async update(id: number, updateData: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    const updatedTodo = this.todoRepository.merge(todo, updateData);

    try {
      const savedTodo = await this.todoRepository.save(updatedTodo);
      this.logger.info(`Todo with ID: ${id} updated successfully`, { updateData });
      return savedTodo;
    } catch (error) {
      this.logger.error('Failed to update todo', { id, error });
      throw new InternalServerErrorException('Could not update todo');
    }
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      this.logger.warn(`Todo with ID: ${id} not found`);
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async remove(id: number): Promise<void> {
    const todo = await this.findOne(id);
    try {
      await this.todoRepository.remove(todo);
      this.logger.info(`Todo with ID: ${id} has been removed`);
    } catch (error) {
      this.logger.error('Failed to remove todo', { id, error });
      throw new InternalServerErrorException('Could not remove todo');
    }
  }

  async findAll(page: number): Promise<{ todos: Todo[]; totalPages: number }> {
    if (page < 1) {
      throw new BadRequestException('Page number must be greater than 0');
    }

    const itemsPerPage = 10; // Example items per page
    try {
      const [todos, total] = await this.todoRepository.findAndCount({
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
      });

      const totalPages = Math.ceil(total / itemsPerPage);
      this.logger.info(`Fetched ${todos.length} todos on page ${page}`, { page });

      return { todos, totalPages };
    } catch (error) {
      this.logger.error('Failed to fetch todos', { error });
      throw new InternalServerErrorException('Could not fetch todos');
    }
  }
}
