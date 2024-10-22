import { Injectable, InternalServerErrorException, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { mobile, password, ...userData } = registerDto;
    
    try {
      const user = await this.userService.create({ ...userData, mobile, password });
      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException('Mobile number already exists');
      }
      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { mobile, password } = loginDto;
    const user = await this.userService.findByMobile(mobile);
    
    // Log the mobile and user data for debugging
    console.log('User:', user);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid mobile number or password');
    }

    const payload = { mobile: user.mobile, id: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
