import { Test, TestingModule } from '@nestjs/testing';
import { LoggingMiddleware } from './logging.middleware';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

describe('LoggingMiddleware', () => {
  let loggingMiddleware: LoggingMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingMiddleware],
    }).compile();

    loggingMiddleware = module.get<LoggingMiddleware>(LoggingMiddleware);
  });

  it('should log requests', () => {
    const req = { method: 'GET', originalUrl: '/test' } as Request;
    const res = {
      on: jest.fn((event: string, callback: (...args: any[]) => void) => {
        if (event === 'finish') {
          callback(); // Simulate the 'finish' event
        }
      }),
      statusCode: 200,
    } as unknown as Response;
    
    const next: NextFunction = jest.fn();

    // Spy on Logger's log method to verify it was called with the correct message
    const loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();

    // Call the middleware use method
    loggingMiddleware.use(req, res, next);

    // Ensure 'finish' event was registered on the response
    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    
    // Ensure the logger was called with the expected message format
    expect(loggerSpy).toHaveBeenCalledWith(expect.stringMatching(/GET \/test 200 - \d+ms/));

    // Ensure the next middleware function was called
    expect(next).toHaveBeenCalled();

    // Restore the original logger behavior
    loggerSpy.mockRestore();
  });
});
