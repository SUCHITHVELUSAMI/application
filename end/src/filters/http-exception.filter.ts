import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException) // Catch all HTTP exceptions
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // Get the HTTP context
    const response = ctx.getResponse<Response>(); // Get the response object
    const request = ctx.getRequest<Request>(); // Get the request object
    const status = exception.getStatus(); // Get the status code from the exception

    const exceptionResponse = exception.getResponse(); // Get the response message from the exception
    const message = typeof exceptionResponse === 'string'
      ? exceptionResponse // Handle string messages
      : (exceptionResponse as any).message || exceptionResponse; // Handle object responses

    // Send the formatted error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(), // Add a timestamp to the response
      path: request.url, // Include the request URL
      message, // Include the error message
    });
  }
}
