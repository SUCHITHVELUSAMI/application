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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your_jwt_secret', // Use your secret key
    });
  }

  async validate(payload: any): Promise<User> {
    const user = await this.userService.findById(payload.sub); // Adjust as needed
    if (!user) {
      throw new UnauthorizedException(); // Throw error if user not found
    }
    return user;
  }
}
