// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UnauthorizedException } from '@nestjs/common'; // Import UnauthorizedException

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      ignoreExpiration: false, // Do not ignore expiration, the token must be valid
      secretOrKey: 'your_jwt_secret', // Use your actual secret key
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findById(payload.sub); // Get user by ID from the token payload
    if (!user) {
      throw new UnauthorizedException(); // Throw an error if the user is not found
    }
    return user; // Return the user object to be available in the request
  }
}
