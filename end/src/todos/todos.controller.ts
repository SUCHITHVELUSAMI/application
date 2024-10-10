import { Controller, Post, Get, Body } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() body: { title: string; description: string }) {
    return this.todosService.create(body.title, body.description);
  }

  @Get()
  async findAll() {
    return this.todosService.findAll();
  }
}
