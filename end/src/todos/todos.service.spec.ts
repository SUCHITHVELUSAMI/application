import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

describe('TodosService', () => {
  let service: TodosService;
  let mockTodoRepository: Partial<Repository<Todo>>;

  // Mocking createQueryBuilder for pagination and filtering
  const mockQueryBuilder: Partial<SelectQueryBuilder<Todo>> = {
    where: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  };

  beforeEach(async () => {
    mockTodoRepository = {
      createQueryBuilder: jest.fn(() => mockQueryBuilder as SelectQueryBuilder<Todo>), // Cast the mock to SelectQueryBuilder<Todo>
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository, // Mocking the repository
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return todos with pagination', async () => {
    const mockTodos = [
      { id: 1, title: 'Todo 1', description: 'Description 1', status: 'pending', time: new Date() },
      { id: 2, title: 'Todo 2', description: 'Description 2', status: 'pending', time: new Date() },
    ];

    (mockQueryBuilder.getMany as jest.Mock).mockResolvedValue(mockTodos); // Mock return value for getMany

    const result = await service.findAll(1, 2); // page 1, limit 2
    expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0); // page 1 skips 0 items
    expect(mockQueryBuilder.take).toHaveBeenCalledWith(2); // takes 2 items
    expect(result).toEqual(mockTodos); // Expect the result to match the mocked todos
  });

  it('should filter todos by status', async () => {
    const mockTodos = [
      { id: 1, title: 'Todo 1', description: 'Description 1', status: 'completed', time: new Date() },
    ];

    (mockQueryBuilder.getMany as jest.Mock).mockResolvedValue(mockTodos);

    const result = await service.findAll(1, 2, 'completed');
    expect(mockQueryBuilder.where).toHaveBeenCalledWith('todo.status = :status', { status: 'completed' });
    expect(result).toEqual(mockTodos);
  });
});
