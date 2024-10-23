import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';

export enum TodoStatus {
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

export class UpdateTodoDto {
  @IsOptional()
  @IsString({ message: 'Name must be a string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsEnum(TodoStatus, { message: 'Status must be either "in progress" or "completed"' })
  status?: TodoStatus;

  @IsOptional()
  @IsDateString({}, { message: 'Time must be a valid date string' })
  time?: string; // Change to Date if you prefer to work with Date objects
}
