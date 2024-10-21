// src/todo/dto/create-todo.dto.ts
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
  time: string; // Assuming time is a string; adjust type if needed.

  @IsString()
  @IsNotEmpty()
  status: string; // Adjust according to your valid statuses.
}
