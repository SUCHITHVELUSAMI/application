import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api') // Prefixing the routes with 'api'
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    try {
      return this.appService.getHello();  // Calls the service to get the greeting
    } catch (error) {
      // Log the error if needed and throw an HTTP exception
      throw new HttpException('Error retrieving greeting', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
