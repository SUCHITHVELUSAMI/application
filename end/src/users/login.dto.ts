import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' }) // Ensures username is provided
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' }) // Ensures password is provided
  password: string;
}
