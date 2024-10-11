import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common'; // Import Put and Delete
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Put(':id') // Ensure Put is imported
  async update(@Param('id') id: number, @Body() todo: Todo): Promise<Todo> {
    return this.todosService.update(id, todo);
  }

  @Delete(':id') // Ensure Delete is imported
  async remove(@Param('id') id: number): Promise<void> {
    return this.todosService.remove(id);
  }
}
