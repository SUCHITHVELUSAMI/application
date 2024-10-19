// src/user/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
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
    // Check if the mobile number already exists
    const existingUser = await this.findByMobile(createUserDto.mobile);
    if (existingUser) {
      throw new Error('User with this mobile number already exists'); // Handle duplicate users
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Create a new user instance with the provided data
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword, // Store hashed password
    });

    // Save the user instance to the database
    return this.userRepository.save(user);
  }

  // Method to validate a user's credentials
  async validateUser(loginDto: LoginDto): Promise<User | null> {
    // Attempt to find the user by their mobile number
    const user = await this.userRepository.findOne({ where: { mobile: loginDto.mobile } });

    // If the user is found, check the password
    if (user && await bcrypt.compare(loginDto.password, user.password)) {
      return user; // Return the user if validation succeeds
    }
    
    return null; // Return null if validation fails
  }

  // Method to find a user by their ID
  async findById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`); // Throw exception if user is not found
    }
    return user; // Return the user if found
  }

  // Method to find a user by their mobile number
  async findByMobile(mobile: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { mobile } });
  }
}
