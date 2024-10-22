import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  status: string; // 'in progress' or 'completed'
}
