import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto'; 
import { JwtService } from '@nestjs/jwt'; // Import JwtService

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // Inject JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({ where: { username: loginDto.username } });
    if (!user || user.password !== loginDto.password) {
      throw new Error('Invalid username or password');
    }
    // Generate a JWT token
    const token = this.jwtService.sign({ username: user.username }); // Create a token with the username
    return { token }; // Return the token
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }
}
