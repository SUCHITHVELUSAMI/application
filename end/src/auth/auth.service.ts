import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto'; // Ensure this is correctly imported
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    // Method to create a new user
    async register(createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        
        const user = await this.userService.createUser({ ...createUserDto, password: hashedPassword }); // Call createUser instead of create
        
        const payload = { userId: user.id, mobile: user.mobile }; // Customize payload as needed
        const accessToken = this.jwtService.sign(payload); // Create token using JwtService

        return { accessToken }; // Return the generated token
    }

    // Login method to authenticate the user and return JWT token
    async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const { mobile, password } = loginDto;

        // Find the user by their mobile number
        const user = await this.userService.findByMobile(mobile);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials'); // User not found
        }

        // Validate the user's password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials'); // Password does not match
        }

        // Generate the JWT token
        const payload = { userId: user.id, mobile: user.mobile }; // Customize payload as needed
        const accessToken = this.jwtService.sign(payload); // Create token using JwtService

        return { accessToken }; // Return the generated token
    }
}
