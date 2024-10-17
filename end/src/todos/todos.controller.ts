import { Controller, Get, Query, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiResponse } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './create-todo.dto'; // Ensure this DTO exists
import { UpdateTodoDto } from './update-todo.dto'; // Ensure this DTO exists

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiQuery({ name: 'page', required: false, description: 'Page number', type: Number })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: Number })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by status' })
  @ApiResponse({ status: 200, description: 'Return list of todos' })
  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: string,
  ): Promise<Todo[]> {
    return this.todosService.findAll(page, limit, status);
  }

  @ApiResponse({ status: 200, description: 'Return a single todo' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todosService.findOne(Number(id)); // Convert to number
  }

  @ApiResponse({ status: 201, description: 'Create a new todo' })
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> { // Use CreateTodoDto
    return this.todosService.create(createTodoDto);
  }

  @ApiResponse({ status: 200, description: 'Update an existing todo' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> { // Use UpdateTodoDto
    return this.todosService.update(Number(id), updateTodoDto); // Convert to number
  }

  @ApiResponse({ status: 204, description: 'Todo successfully deleted' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.todosService.remove(Number(id)); // Convert to number
  }
}
