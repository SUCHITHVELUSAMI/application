// /backend/src/auth/dto/login.dto.ts
import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsString({ message: 'Mobile must be a string' })
  @IsNotEmpty({ message: 'Mobile number cannot be empty' })
  @Matches(/^\d{10}$/, { message: 'Mobile number must be a 10-digit number' })
  @Transform(({ value }) => value.trim()) // Trims whitespace from mobile number
  mobile: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
