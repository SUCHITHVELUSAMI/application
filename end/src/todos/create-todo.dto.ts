import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsDateString({}, { message: 'Time must be a valid date' })
  time: Date;

  @IsString()
  status: string = 'pending'; // Default status to 'pending'
}
