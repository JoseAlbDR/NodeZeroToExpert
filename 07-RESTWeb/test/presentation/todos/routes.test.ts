import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Todo route testing', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => testServer.close());

  test('should return TODOs api/todo', async () => {
    const response = await request(testServer.app)
      .get('/api/v1/todos')
      .expect(200);

    console.log(response.body);
  });
});
