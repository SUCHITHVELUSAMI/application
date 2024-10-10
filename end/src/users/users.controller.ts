import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    return this.usersService.register(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string }) {
    return this.usersService.login(body.username);
  }
}