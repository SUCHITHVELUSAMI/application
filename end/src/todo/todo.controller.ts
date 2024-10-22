// /backend/src/todos/todos.controller.ts
import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { TodosService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/todos') // Update to match your frontend API call
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  async findAll(@Query('page') page: number) {
    return this.todosService.findAll(page);
  }
}
