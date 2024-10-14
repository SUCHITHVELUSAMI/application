import { HttpExceptionFilter } from './http-exception.filter';
import { HttpException, ArgumentsHost } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  // Properly typed mock for Response
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;

  // Properly typed mock for Request
  const mockRequest = {
    url: '/test-url',
  };

  // Properly typed mock for ArgumentsHost
  const mockArgumentsHost: ArgumentsHost = {
    switchToHttp: jest.fn(() => ({
      getResponse: () => mockResponse,
      getRequest: () => mockRequest,
    })),
  } as unknown as ArgumentsHost;

  beforeEach(() => {
    filter = new HttpExceptionFilter(); // Initialize filter
  });

  it('should catch an HTTP exception and format the response', () => {
    const exception = new HttpException('Test error message', 400); // Create an HTTP exception
    
    // Call the filter's catch method
    filter.catch(exception, mockArgumentsHost);

    // Assert that the response methods were called with the expected arguments
    expect(mockResponse.status).toHaveBeenCalledWith(400); // Check status code
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 400,
      timestamp: expect.any(String),
      path: '/test-url',
      message: 'Test error message',
    });
  });
});
