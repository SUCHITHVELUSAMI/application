import { IsString, IsNotEmpty, IsArray, IsEnum } from 'class-validator';
import { Gender } from '../../user/user.entity';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  email: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsArray()
  hobbies: string[];
}
