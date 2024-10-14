import { Test, TestingModule } from '@nestjs/testing';
import { LoggingMiddleware } from './logging.middleware';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common'; // Ensure you import the Logger

describe('LoggingMiddleware', () => {
  let loggingMiddleware: LoggingMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingMiddleware],
    }).compile();

    loggingMiddleware = module.get<LoggingMiddleware>(LoggingMiddleware);
  });

  it('should log requests', () => {
    const req = {} as Request;
    const res = {
      on: jest.fn((event: string, callback: (...args: any[]) => void) => {
        if (event === 'finish') {
          callback(); // Call the callback for the finish event
        }
      }),
    } as unknown as Response; // Cast to Response type
    const next: NextFunction = jest.fn();

    // Mock the Logger's log method
    jest.spyOn(Logger.prototype, 'log').mockImplementation();

    loggingMiddleware.use(req, res, next); // Call the middleware

    expect(Logger.prototype.log).toHaveBeenCalled(); // Check if log was called
    expect(next).toHaveBeenCalled(); // Ensure next middleware was called
  });
});
