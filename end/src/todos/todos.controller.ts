import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(+id);
  }

  @Post()
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todosService.update(+id, todo);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.todosService.remove(+id);
  }
}
