// test/todos/todos.controller.integration.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TodosModule } from '../../src/todos/todos.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Todo } from '../../src/todos/todo.entity';

describe('TodosController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodosModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/todos (GET)', () => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .expect([]);
  });

  it('/todos (POST)', () => {
    const todo: Partial<Todo> = { title: 'New Todo', description: 'Todo Description', time: new Date(), status: 'pending' };
    
    return request(app.getHttpServer())
      .post('/todos')
      .send(todo)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body.title).toEqual(todo.title);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
