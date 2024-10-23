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
    const existingUser = await this.userRepository.findOne({ where: { mobile: registerDto.mobile } });
    if (existingUser) {
      throw new ConflictException('Mobile number already exists');
    }

    const newUser = this.userRepository.create(registerDto);
    return await this.userRepository.save(newUser);
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
