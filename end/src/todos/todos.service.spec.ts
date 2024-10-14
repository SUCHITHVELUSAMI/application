import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('TodosService', () => {
  let service: TodosService;
  let todosRepository: Repository<Todo>;

  const mockQueryBuilder = {
    where: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getMany: jest.fn().mockResolvedValue([]), // Mock return value for getMany
  };

  const mockTodosRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder), // Mock createQueryBuilder method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodosRepository, // Use the mock repository
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    todosRepository = module.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should return an empty array', async () => {
    const result = await service.findAll();
    expect(todosRepository.createQueryBuilder).toHaveBeenCalledWith('todo');
    expect(result).toEqual([]); // Since we mock getMany() to return an empty array
  });
});
