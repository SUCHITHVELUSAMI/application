import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { LoginDto } from './login.dto'; // Import your Login DTO
import { User } from './user.entity';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService;

  beforeEach(async () => {
    mockUsersService = {
      create: jest.fn(),
      login: jest.fn(), // Mock the login method
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should register a user', async () => {
    const userDto: CreateUserDto = {
      username: 'testuser',
      password: 'testpass',
      name: 'Test User',
      mobile: '1234567890',
      gender: 'male',
      hobbies: ['hiking'],
      email: 'test@example.com',
    };

    mockUsersService.create.mockResolvedValue(userDto);

    const result = await controller.register(userDto);
    expect(mockUsersService.create).toHaveBeenCalledWith(userDto);
    expect(result).toEqual(userDto);
  });

  it('should log in a user', async () => {
    const loginDto: LoginDto = {
      username: 'testuser',
      password: 'testpass',
    };

    const expectedResponse = { token: 'some-token' }; // Replace with your expected token logic
    mockUsersService.login.mockResolvedValue(expectedResponse);

    const result = await controller.login(loginDto);
    expect(mockUsersService.login).toHaveBeenCalledWith(loginDto);
    expect(result).toEqual(expectedResponse);
  });

  it('should throw an error when registration fails', async () => {
    const userDto: CreateUserDto = {
      username: 'testuser',
      password: 'testpass',
      name: 'Test User',
      mobile: '1234567890',
      gender: 'male',
      hobbies: ['hiking'],
      email: 'test@example.com',
    };

    mockUsersService.create.mockRejectedValue(new Error('Registration failed'));

    await expect(controller.register(userDto)).rejects.toThrow('Registration failed');
  });

  it('should throw an error when login fails', async () => {
    const loginDto: LoginDto = {
      username: 'wronguser',
      password: 'wrongpass',
    };

    mockUsersService.login.mockRejectedValue(new Error('Invalid credentials'));

    await expect(controller.login(loginDto)).rejects.toThrow('Invalid credentials');
  });
});
