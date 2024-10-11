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
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
  
      const message = exception.getResponse();
  
      // Ensure the response method is being used correctly
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
    }
  }
  