import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './create-todo.dto'; // Ensure this import exists
import { Todo } from './todo.entity'; // Ensure this import exists

describe('TodosController', () => {
  let controller: TodosController;
  let mockTodosService;

  beforeEach(async () => {
    // Mock implementation of TodosService methods
    mockTodosService = {
      create: jest.fn().mockResolvedValue({ id: 1, title: 'Sample Todo', description: 'Todo Description', time: new Date(), status: 'pending' }),
      findAll: jest.fn().mockResolvedValue([]), // Mock other methods if needed
      findOne: jest.fn().mockResolvedValue({ id: 1, title: 'Sample Todo' }),
      update: jest.fn().mockResolvedValue({ id: 1, title: 'Updated Todo' }),
      remove: jest.fn().mockResolvedValue(undefined),
    };

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
  });

  it('should create a todo', async () => {
    const newTodo: CreateTodoDto = {
      title: 'New Todo',
      description: 'Todo Description',
      time: new Date(),
      status: 'pending', // Set default status if needed
    };

    const result = await controller.create(newTodo);
    expect(mockTodosService.create).toHaveBeenCalledWith(newTodo); // Verify the service is called with the new todo
    expect(result).toEqual({ id: 1, title: 'Sample Todo', description: 'Todo Description', time: expect.any(Date), status: 'pending' }); // Adjusted to include all expected fields
  });

  // You can add more tests for other methods (findAll, findOne, update, remove) if needed
});
