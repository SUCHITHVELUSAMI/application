// /backend/src/user/user.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async create(registerDto: RegisterDto): Promise<User> {
    // Check if the mobile number already exists
    const existingUser = await this.userRepository.findOne({ where: { mobile: registerDto.mobile } });
    if (existingUser) {
      throw new ConflictException('Mobile number already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(registerDto.password, 10); // Adjust the rounds as necessary

    // Create a new user instance with hashed password
    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashedPassword, // Use the hashed password
    });

    // Save the new user to the database
    return await this.userRepository.save(newUser);
  }

  async validateUser(mobile: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { mobile } }); // Fixed the syntax error
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compare the hashed password with the provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null; // Return user if password is valid
  }
}
