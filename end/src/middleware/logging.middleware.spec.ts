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
          callback(); // Call the callback for the finish event
        }
      }),
      statusCode: 200,
    } as unknown as Response;
    const next: NextFunction = jest.fn();

    const loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();

    loggingMiddleware.use(req, res, next);

    expect(res.on).toHaveBeenCalledWith('finish', expect.any(Function));
    
    // Use a regex to check the logged message
    expect(loggerSpy).toHaveBeenCalledWith(expect.stringMatching(/GET \/test 200 - \d+ms/));
    
    expect(next).toHaveBeenCalled();

    loggerSpy.mockRestore();
  });
});
