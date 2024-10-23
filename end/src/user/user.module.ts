import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
// Import other necessary modules or services if needed
// import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    // Register User entity with TypeORM for dependency injection
    TypeOrmModule.forFeature([User]),
    // Import other modules if needed, like AuthModule for authentication
    // AuthModule,
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
