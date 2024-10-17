import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService, // Inject JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Hash the user's password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({ ...createUserDto, password: hashedPassword });
    return this.usersRepository.save(user);
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const user = await this.usersRepository.findOne({ where: { username: loginDto.username } });

    if (!user) {
      throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
    }

    // Check if the provided password matches the hashed password in the database
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid username or password', HttpStatus.UNAUTHORIZED);
    }

    // Generate a JWT token with the user ID and username
    const token = this.jwtService.sign({ username: user.username, sub: user.id });
    return { token }; // Return the token
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }
}
