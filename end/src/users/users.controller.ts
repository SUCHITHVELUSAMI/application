import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto'; // Import the Login DTO
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')  // Handles POST requests to /users/register
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto); // Call the service to create a user
  }

  @Post('login')  // Handles POST requests to /users/login
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.usersService.login(loginDto); // Call the service to handle login and return the token
  }

  @Get()  // Handles GET requests to /users
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')  // Handles GET requests to /users/:username
  async findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne(username);
  }
}
