import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    PassportModule, // Enables Passport.js for authentication
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_jwt_secret', // Ensure this is set in production
      signOptions: { expiresIn: '60m' }, // Customize expiration time as needed
    }),
  ],
  controllers: [AuthController], // Registering the AuthController
  providers: [AuthService, JwtStrategy], // Registering AuthService and JwtStrategy
  exports: [AuthService, JwtModule], // Exporting AuthService and JwtModule for use in other modules
})
export class AuthModule {}
