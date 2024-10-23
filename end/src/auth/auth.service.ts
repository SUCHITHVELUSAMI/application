import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const { mobile, password, ...userData } = registerDto;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.userService.create({
        ...userData,
        mobile,
        password: hashedPassword,
      });

      return this.userService.findById(user.id);
    } catch (error) {
      this.logger.error('Registration error:', error);

      if (error.code === '23505') {
        // Unique constraint violation
        throw new ConflictException('Mobile number already exists');
      }

      throw new InternalServerErrorException('Failed to register user');
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string; user: User }> {
    const { mobile, password } = loginDto;

    this.logger.log(`User login attempt for mobile: ${mobile}`);

    const user = await this.userService.findByMobile(mobile);
    if (!user) {
      this.logger.warn(`No user found with mobile: ${mobile}`);
      throw new UnauthorizedException('Invalid mobile number or password');
    }

    this.logger.log(`User found with mobile: ${mobile}, comparing passwords`);
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      this.logger.warn(`Password does not match for user with mobile: ${mobile}`);
      throw new UnauthorizedException('Invalid mobile number or password');
    }

    const payload = { mobile: user.mobile, id: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' }); // Optional: Set expiration for token
    return { accessToken, user }; // Return user info if needed
  }
}
