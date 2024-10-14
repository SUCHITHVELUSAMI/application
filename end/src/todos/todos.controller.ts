import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';  // <-- Import Swagger decorators
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

@ApiTags('todos')  // <-- Add this to tag the endpoint group for Swagger
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiQuery({ name: 'page', required: false, description: 'Page number' })  // <-- Pagination
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page' })  // <-- Limit
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })  // <-- Filtering
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: string,
  ): Promise<Todo[]> {
    return this.todosService.findAll(page, limit, status);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post()
  create(@Body() todo: Todo): Promise<Todo> {
    return this.todosService.create(todo);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todosService.update(id, todo);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.todosService.remove(id);
  }
}
