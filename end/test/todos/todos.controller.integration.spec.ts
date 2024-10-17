// test/todos/todos.controller.integration.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { TodosModule } from '../../src/todos/todos.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Todo } from '../../src/todos/todo.entity';
import { getConnection } from 'typeorm';

describe('TodosController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodosModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.query(`DELETE FROM todo`);
    await app.close();
  });

  describe('GET /todos', () => {
    it('should return an empty array when no todos exist', () => {
      return request(app.getHttpServer())
        .get('/todos')
        .expect(200)
        .expect([]);
    });
  });

  describe('POST /todos', () => {
    it('should create a new todo and return it', async () => {
      const todo: Partial<Todo> = {
        title: 'New Todo',
        description: 'Todo Description',
        time: new Date(), // Use a Date object here
        status: 'pending',
      };

      const response = await request(app.getHttpServer())
        .post('/todos')
        .send(todo)
        .expect(201);
        
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toEqual(todo.title);
      expect(response.body.description).toEqual(todo.description);
      expect(new Date(response.body.time)).toEqual(todo.time); // Convert response time to Date for comparison
      expect(response.body.status).toEqual(todo.status);
    });

    it('should return 400 if title is missing', () => {
      const todo: Partial<Todo> = {
        description: 'Todo Description',
        time: new Date(), // Use a Date object here
        status: 'pending',
      };

      return request(app.getHttpServer())
        .post('/todos')
        .send(todo)
        .expect(400); // Expect a 400 Bad Request error
    });
  });
});
