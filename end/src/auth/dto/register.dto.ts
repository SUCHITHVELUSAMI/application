// /backend/src/auth/dto/register.dto.ts
import { IsNotEmpty, IsEmail, IsMobilePhone, IsEnum, IsArray, ArrayNotEmpty } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsMobilePhone()
  mobile: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsNotEmpty()
  country: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'At least one hobby must be selected' })
  hobbies: string[];
}
