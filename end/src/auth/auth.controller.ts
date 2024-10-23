import {
  Controller,
  Post,
  Body,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    this.logger.log(`New user registration attempt for mobile: ${registerDto.mobile}`);
    try {
      const user = await this.authService.register(registerDto);
      this.logger.log(`User registered successfully with mobile: ${registerDto.mobile}`);
      return user;
    } catch (error) {
      this.logger.error('Registration failed', error.message);
      throw error; // Pass the error for proper handling
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.log(`User login attempt for mobile: ${loginDto.mobile}`);
    try {
      const accessToken = await this.authService.login(loginDto);
      this.logger.log(`Login successful for mobile: ${loginDto.mobile}`);
      return { accessToken };
    } catch (error) {
      this.logger.error('Login failed', error.message);
      throw new UnauthorizedException('Invalid mobile number or password');
    }
  }
}
