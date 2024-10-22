// src/todos/dto/create-todo.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  time: string; // Assuming time is sent as a string in the correct format

  @IsString()
  @IsNotEmpty()
  status: 'in progress' | 'completed'; // Define valid statuses
}
