import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt'; // Import JwtService

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    find: jest.fn().mockResolvedValue([]),
    save: jest.fn().mockResolvedValue({ id: 1, username: 'testuser' }),
    findOne: jest.fn().mockResolvedValue({ id: 1, username: 'testuser', password: 'testpass' }),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('jwt-token'), // Mock sign method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Add additional tests as needed
});
