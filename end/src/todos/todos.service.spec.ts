import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TodosService', () => {
  let service: TodosService;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]), // Return an empty array
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
  };

  const mockTodoRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder), // Mock the repository's createQueryBuilder
    find: jest.fn().mockResolvedValue([]), // Mock the find method
    save: jest.fn().mockResolvedValue({ id: 1, title: 'Sample Todo' }), // Mock the save method
    findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Sample Todo' }), // Mock findOne
    update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Todo' }), // Mock update
    delete: jest.fn().mockResolvedValue(undefined), // Mock delete
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an empty array when no todos exist', async () => {
    const todos = await service.findAll();
    expect(todos).toEqual([]); // Expect empty array
    expect(mockTodoRepository.createQueryBuilder).toHaveBeenCalled(); // Check that createQueryBuilder was called
  });
});
