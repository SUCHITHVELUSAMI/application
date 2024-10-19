// src/user/user.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from '../auth/dto/login.dto'; // Import LoginDto

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login') // New login route
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.validateUser(loginDto);
    if (!user) {
      throw new Error('Invalid credentials'); // Handle invalid credentials appropriately
    }
    // Here you would usually return a JWT token or user info
    return user; // For now, returning user info directly
  }
}
