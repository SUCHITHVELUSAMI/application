import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    const todo = await this.todosRepository.findOneBy({ id });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  async create(todo: Todo): Promise<Todo> {
    return this.todosRepository.save(todo);
  }

  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    await this.todosRepository.update(id, todo);
    const updatedTodo = await this.findOne(id);
    return updatedTodo;
  }

  async remove(id: number): Promise<void> {
    const result = await this.todosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
  }
}
