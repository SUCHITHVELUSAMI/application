// /backend/src/auth/dto/login.dto.ts
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  mobile: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
