import { IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  mobile: string;

  @IsString()
  gender: string;

  @IsString({ each: true })
  hobbies: string[];

  @IsEmail()
  email: string;
}
