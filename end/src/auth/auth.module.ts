import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module'; // Import UsersModule correctly
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }), // Use JWT strategy by default
    JwtModule.register({
      secret: 'your_jwt_secret', // Ensure to use a secure secret
      signOptions: { expiresIn: '1h' }, // Set token expiration
    }),
    UsersModule, // Import UsersModule to access user-related services
  ],
  providers: [AuthService, JwtStrategy], // Providers for authentication services and strategies
  controllers: [AuthController], // Controllers for handling auth routes
  exports: [PassportModule], // Export PassportModule if you need to use guards elsewhere
})
export class AuthModule {}
