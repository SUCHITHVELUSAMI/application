import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { TodoStatus } from '../todo.entity';

export class CreateTodoDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Time must be a valid date string' }) // Ensure time is a valid date string
  time?: Date;

  @IsOptional() // Make status optional
  @IsEnum(TodoStatus, { message: 'Status must be a valid TodoStatus' }) // Ensure status is a valid enum value
  status?: TodoStatus;
}
