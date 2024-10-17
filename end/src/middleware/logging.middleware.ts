import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // Initialize logger with the class name for better log context
  private readonly logger = new Logger(LoggingMiddleware.name);  

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;  // Destructure method and URL from the request
    const startTime = Date.now();  // Capture the start time of the request

    // Log the incoming request with method and URL
    this.logger.log(`Incoming Request: ${method} ${originalUrl}`);

    // Listen for the 'finish' event on the response object to log response details after it's sent
    res.on('finish', () => {
      const { statusCode } = res;  // Get the status code of the response
      const endTime = Date.now();  // Capture the end time when the response is finished
      const duration = endTime - startTime;  // Calculate the time taken to handle the request

      // Log the request method, URL, response status, and duration in milliseconds
      this.logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });

    next();  // Call the next middleware or route handler in the chain
  }
}
