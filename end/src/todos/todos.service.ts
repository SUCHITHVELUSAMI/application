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

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todosRepository.findOneBy({ id });
  }

  create(todo: Todo): Promise<Todo> {
    return this.todosRepository.save(todo);
  }

  async update(id: number, todo: Partial<Todo>): Promise<Todo> {
    await this.todosRepository.update(id, todo);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
