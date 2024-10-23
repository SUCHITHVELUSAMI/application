import { IsString, IsNotEmpty, Matches, Length } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Mobile must be a string' })
  @IsNotEmpty({ message: 'Mobile number cannot be empty' })
  @Matches(/^\d{10}$/, { message: 'Mobile number must be a 10-digit number' })
  mobile: string; // Mobile field

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' }) // Password length validation
  password: string; // Password field
}
