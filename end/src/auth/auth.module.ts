// /backend/src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { UserModule } from '../user/user.module'; // Import UserModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // Import JwtStrategy if you have one

@Module({
  imports: [
    UserModule, // Make sure UserModule is imported to provide UserService
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret', // Use your secret here
      signOptions: { expiresIn: '60s' }, // Set the expiration time for your tokens
    }),
  ],
  providers: [AuthService, JwtStrategy], // Register JwtStrategy if you have one
  controllers: [AuthController],
})
export class AuthModule {}
