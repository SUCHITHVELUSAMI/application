import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string; // Use 'name' instead of 'username'

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  country: string; // Add 'country' to match the frontend

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString() // Assuming hobbies is a string, adjust based on your use case
  hobbies?: string; // Optional field
}
