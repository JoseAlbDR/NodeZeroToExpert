import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('Todo route testing', () => {
  beforeAll(async () => {
    await testServer.start();
  });

  afterAll(() => {
    testServer.close();
  });

  const todo1 = { text: 'Hello there 1' };
  const todo2 = { text: 'Hello there 2' };

  test('should return TODOs api/todo', async () => {
    await prisma.todo.deleteMany();
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const response = await request(testServer.app)
      .get('/api/v1/todos')
      .expect(200);

    const body = response.body;

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);

    // expect(body[0]).toEqual(
    //   expect.objectContaining({
    //     id: expect.any(Number),
    //     text: expect.any(String),
    //     completedAt: expect.any(null),
    //   })
    // );
  });
});
