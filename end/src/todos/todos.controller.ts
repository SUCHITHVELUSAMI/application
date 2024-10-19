import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todos.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Adjust the path as needed
import { Request } from 'express';
import { User as UserEntity } from '../users/user.entity'; // Import User entity

@Controller('todos')
@UseGuards(JwtAuthGuard) // Apply the guard to protect all routes in this controller
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Get()
    async getTodos(@Req() request: Request) {
        const user = request.user as UserEntity; // Cast to the correct User type
        return await this.todoService.getTodos(user, 1); // You can adjust pagination as needed
    }

    @Get(':id')
    async getTodo(@Param('id') id: number): Promise<Todo> {
        return await this.todoService.getTodoById(id);
    }

    @Post()
    async createTodo(@Body() createTodoDto: CreateTodoDto, @Req() request: Request) {
        const user = request.user as UserEntity; // Cast to the correct User type
        return await this.todoService.createTodo(user, createTodoDto);
    }

    // Additional methods can be added here (e.g., updateTodo, deleteTodo)
}
