// /backend/src/todos/dto/update-todo.dto.ts
import { IsNotEmpty } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  status: string; // 'in progress' or 'completed'
}
