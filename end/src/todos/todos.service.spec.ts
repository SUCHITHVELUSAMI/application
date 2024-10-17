import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateTodoDto } from './create-todo.dto';

describe('TodosService', () => {
  let service: TodosService;

  const mockTodoRepository = {
    create: jest.fn().mockReturnValue({ id: 1, title: 'Sample Todo' }), // Mock the create method
    save: jest.fn().mockResolvedValue({ id: 1, title: 'Sample Todo' }),
    findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Sample Todo' }),
    update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Todo' }),
    delete: jest.fn().mockResolvedValue(undefined),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
    })),
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

  it('should create a todo', async () => {
    const newTodo: CreateTodoDto = {
      title: 'New Todo',
      description: 'Todo Description',
      time: new Date(),
      status: 'pending',
    };

    const createdTodo = await service.create(newTodo);
    expect(mockTodoRepository.create).toHaveBeenCalledWith(newTodo); // Check if create was called with newTodo
    expect(createdTodo).toEqual({ id: 1, title: 'Sample Todo' }); // Change according to your expectations
  });
});
