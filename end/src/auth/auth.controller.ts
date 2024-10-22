import { Controller, Post, Body, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/user.entity'; // Import User for type annotation

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name); // Create Logger instance

  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<User> {
    try {
      this.logger.log('Registering user'); // Log the registration attempt
      return await this.authService.register(registerDto);
    } catch (error) {
      this.logger.error('Registration failed', error.stack); // Log the error
      throw new HttpException(error.response || 'Registration failed', error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    try {
      this.logger.log('User login attempt'); // Log the login attempt
      return await this.authService.login(loginDto);
    } catch (error) {
      this.logger.error('Login failed', error.stack); // Log the error
      throw new HttpException(error.response || 'Login failed', error.status || HttpStatus.UNAUTHORIZED);
    }
  }
}
