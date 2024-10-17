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
    filter = new HttpExceptionFilter(); // Initialize the filter before each test
  });

  it('should catch an HTTP exception and format the response', () => {
    const exception = new HttpException('Test error message', 400); // Create a test HTTP exception

    // Call the catch method of the filter with the exception and mocked ArgumentsHost
    filter.catch(exception, mockArgumentsHost);

    // Ensure that the status method of the response was called with the correct status code
    expect(mockResponse.status).toHaveBeenCalledWith(400);

    // Ensure that the json method of the response was called with the correct response format
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: 400,
      timestamp: expect.any(String), // Ensure the timestamp is present, but allow any string
      path: '/test-url', // Ensure the correct URL is included
      message: 'Test error message', // Ensure the correct error message is included
    });
  });
});
