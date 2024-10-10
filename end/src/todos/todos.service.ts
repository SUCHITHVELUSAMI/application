import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async create(title: string, description: string): Promise<Todo> {
    const todo = this.todosRepository.create({ title, description });
    return this.todosRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }
}
