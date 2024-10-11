import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto'; // Ensure this is the correct import

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService;

  beforeEach(async () => {
    mockUsersService = {
      create: jest.fn(), // Mock the create method
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService, // Use mocked service
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should create a user', async () => {
    const userDto: CreateUserDto = {
      username: 'testuser',
      password: 'testpass',
      name: 'Test User',
      mobile: '1234567890',
      gender: 'male',
      hobbies: ['hiking'],
      email: 'test@example.com',
    };

    mockUsersService.create.mockResolvedValue(userDto); // Mock the service response

    const result = await controller.create(userDto); // Pass the userDto as a single object
    expect(mockUsersService.create).toHaveBeenCalledWith(userDto); // Ensure it's called with the correct object
    expect(result).toEqual(userDto); // Expect the result to be equal to the mock response
  });
});
