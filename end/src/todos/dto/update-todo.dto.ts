// src/todos/dto/update-todo.dto.ts

import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TodoStatus } from '../todo.entity'; // Ensure this path is correct

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatus) // This should now work correctly
  status?: TodoStatus; // Use the TodoStatus type
}
