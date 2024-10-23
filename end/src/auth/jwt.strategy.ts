import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

interface JwtPayload {
  id: number; // Assuming ID is a number
  mobile: string; // Added for clarity if you decide to use it
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensure expiration is not ignored
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret', // Use environment variable for security
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException('User not found'); // Clear exception message
    }
    return user; // Return the user if found
  }
}
