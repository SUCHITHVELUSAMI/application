import { Controller, Get, Param, UseGuards, NotFoundException, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './user.entity';

@UseGuards(JwtAuthGuard)
@Controller('users') // Adjust as needed
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    const userId = Number(id); // Convert id to number

    // Validate userId before calling the service
    if (isNaN(userId)) {
      this.logger.warn(`Invalid user ID: ${id}`); // Log the warning
      throw new NotFoundException('Invalid user ID'); // If the id is not a number, throw an error
    }

    this.logger.log(`Fetching user with ID: ${userId}`); // Log the request
    const user = await this.userService.findById(userId); // Call with the converted id
    
    if (!user) {
      this.logger.warn(`User with ID ${userId} not found`); // Log if user not found
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    
    this.logger.log(`User with ID ${userId} fetched successfully`); // Log success
    return user; // Return the user found
  }
}
