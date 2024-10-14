import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  const mockTodosService = {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({ id: 1, title: 'Sample Todo' }),
    findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Sample Todo' }),
    update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Todo' }),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call findAll and return an array of todos', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([]); // Expecting an empty array as defined in the mock
  });

  // Additional tests for create, findOne, update, and remove can be added similarly.
});
