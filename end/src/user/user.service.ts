import { Injectable, InternalServerErrorException, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    // Check if the mobile number is provided
    if (!userData.mobile) {
      throw new ConflictException('Mobile number is required');
    }

    // Check if the mobile number already exists
    const existingUser = await this.findByMobile(userData.mobile);
    if (existingUser) {
      throw new ConflictException('Mobile number already exists');
    }

    // Hash the password before saving
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const user = this.userRepository.create(userData);
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findByMobile(mobile: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { mobile } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
