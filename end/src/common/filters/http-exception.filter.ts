// /backend/src/common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino'; // Import PinoLogger

@Catch() // Catch all exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    
    // Check if the exception is an instance of HttpException
    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    // Log the error using Pino Logger
    this.logger.error(exception, 'An error occurred');

    response.status(status).json({
      statusCode: status,
      message: (exception instanceof HttpException) ? exception.getResponse() : 'An error occurred while processing your request',
    });
  }
}
