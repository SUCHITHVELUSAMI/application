// /backend/src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt-payload.interface'; // You will need to create this interface

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret', // Use your secret here
    });
  }

  async validate(payload: JwtPayload) {
    // Here, you can use the UserService to find the user by ID (from the payload)
    const user = await this.userService.findById(payload.sub);
    return user; // This will be attached to the request as req.user
  }
}
