import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Put,
  Param,
  Delete,
  UseGuards,
  BadRequestException, // Add this line
  NotFoundException,   // Make sure to import this if you use it
  InternalServerErrorException // Import if used
} from '@nestjs/common';
import { TodosService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Get(':id') // New method for fetching a todo by ID
  async findOne(@Param('id') id: number): Promise<Todo> {
    if (isNaN(id)) { // Example check for valid ID
      throw new BadRequestException('Invalid ID format'); // Handle error for invalid ID
    }
    return this.todosService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
    if (isNaN(id)) { // Example check for valid ID
      throw new BadRequestException('Invalid ID format'); // Handle error for invalid ID
    }
    return this.todosService.update(id, updateTodoDto);
  }

  @Get()
  async findAll(@Query('page') page: number): Promise<{ todos: Todo[]; totalPages: number }> {
    return this.todosService.findAll(page);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    if (isNaN(id)) { // Example check for valid ID
      throw new BadRequestException('Invalid ID format'); // Handle error for invalid ID
    }
    await this.todosService.remove(id); // Call the remove method directly
  }
}
