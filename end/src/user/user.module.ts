import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [
    // Register User entity with TypeORM for dependency injection
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    // Provide the UserService for dependency injection
    UserService,
  ],
  exports: [
    // Export UserService to be used in other modules
    UserService,
  ],
})
export class UserModule {}
