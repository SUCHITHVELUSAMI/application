import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from './todo.entity';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  const mockTodosService = {
    findAll: jest.fn().mockResolvedValue([]),
    create: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Sample Todo',
      description: 'Sample Description',
      time: new Date(),
      status: 'pending',
    }),
    findOne: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Sample Todo',
      description: 'Sample Description',
      time: new Date(),
      status: 'pending',
    }),
    update: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Updated Todo',
      description: 'Updated Description',
      time: new Date(),
      status: 'completed',
    }),
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

  it('should create a todo', async () => {
    const todo: Todo = {
      id: 1, // Added id here
      title: 'Sample Todo',
      description: 'Sample Description',
      time: new Date(),
      status: 'pending',
    };
    const result = await controller.create(todo);
    expect(service.create).toHaveBeenCalledWith(todo);
    expect(result).toEqual(expect.objectContaining({ id: 1, title: 'Sample Todo' }));
  });

  it('should find one todo by ID', async () => {
    const id = 1;
    const result = await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(id);
    expect(result).toEqual(expect.objectContaining({ id: 1, title: 'Sample Todo' }));
  });

  it('should update a todo', async () => {
    const id = 1;
    const todo: Todo = {
      id: 1,
      title: 'Updated Todo',
      description: 'Updated Description',
      time: new Date(),
      status: 'completed',
    };
    const result = await controller.update(id, todo);
    expect(service.update).toHaveBeenCalledWith(id, todo);
    expect(result).toEqual(expect.objectContaining({ id: 1, title: 'Updated Todo' }));
  });

  it('should remove a todo', async () => {
    const id = 1;
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
