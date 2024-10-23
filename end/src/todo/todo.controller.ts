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
  BadRequestException,
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

  // Helper function to validate and parse IDs
  private validateId(id: any): number {
    const parsedId = Number(id);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new BadRequestException('Invalid ID format');
    }
    return parsedId;
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Todo> {
    const validatedId = this.validateId(id);
    return this.todosService.findOne(validatedId);
  }

  @Put(':id')
  async update(@Param('id') id: any, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const validatedId = this.validateId(id);
    return this.todosService.update(validatedId, updateTodoDto);
  }

  @Get()
  async findAll(@Query('page') page: number = 1): Promise<{ todos: Todo[]; totalPages: number }> {
    if (page < 1) {
      throw new BadRequestException('Page number must be greater than 0');
    }
    return this.todosService.findAll(page);
  }

  @Delete(':id')
  async remove(@Param('id') id: any): Promise<void> {
    const validatedId = this.validateId(id);
    await this.todosService.remove(validatedId);
    // No need for a result check since the method throws NotFoundException if not found
  }
}
