import { IsString, IsEnum } from 'class-validator';
import { TodoStatus } from '../todo.entity';

export class CreateTodoDto {
    @IsString()
    title: string;

    @IsString() // Ensure this is defined
    description: string;

    @IsEnum(TodoStatus)
    status: TodoStatus;
}
