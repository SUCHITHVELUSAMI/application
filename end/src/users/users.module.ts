import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Ensure this is defined in your .env
      signOptions: { expiresIn: '1h' }, // Adjust the expiration as needed
    }),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
