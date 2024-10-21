// /backend/src/auth/auth.service.ts
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.create(registerDto);
    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.validateUser(loginDto.mobile, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { mobile: user.mobile };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
