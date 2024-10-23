import { IsString, IsNotEmpty, IsEmail, IsEnum, IsArray, IsOptional, Matches, Length } from 'class-validator';
import { Gender } from '../../user/user.entity';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10}$/, { message: 'Mobile number must be a 10-digit number' }) 
  mobile: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters' })
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsArray()
  @IsOptional()
  hobbies?: string[];
}
