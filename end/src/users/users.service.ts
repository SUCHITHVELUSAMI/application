// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from '../auth/dto/login.dto'; // Import LoginDto
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Method to create a new user
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create a new user instance with the provided data
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword, // Store hashed password
      hobbies: createUserDto.hobbies, // Ensure hobbies are set correctly
    });

    // Save the user instance to the database
    return this.userRepository.save(user);
  }

  // Method to validate a user's credentials
  async validateUser(loginDto: LoginDto): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { mobile: loginDto.mobile } });
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      return user;
    }
    return null;
  }

  // Method to find a user by their ID
  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
