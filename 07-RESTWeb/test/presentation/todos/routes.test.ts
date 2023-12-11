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

  beforeEach(async () => {
    await prisma.todo.deleteMany();
  });

  const todo1 = { text: 'Hello there 1' };
  const todo2 = { text: 'Hello there 2' };

  test('should return TODOs api/todo', async () => {
    await prisma.todo.createMany({ data: [todo1, todo2] });

    const response = await request(testServer.app)
      .get('/api/v1/todos')
      .expect(200);

    const body = response.body;

    expect(body).toBeInstanceOf(Array);
    expect(body.length).toBe(2);
    expect(body[0].text).toBe(todo1.text);
    expect(body[1].text).toBe(todo2.text);
    expect(body[0].completedAt).toBeNull();
  });

  test('should return a TODO api/v1/todos/:id', async () => {
    const todo1 = { text: 'Hello there 1' };

    const todo = await prisma.todo.create({
      data: todo1,
    });

    const { body } = await request(testServer.app)
      .get(`/api/v1/todos/${todo.id}`)
      .expect(200);

    expect(body.todo.text).toEqual(todo1.text);
    expect(body.todo.completedAt).toBeNull();
    expect(body.todo).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: todo.completedAt,
    });
  });

  test('should return a 404 NotFound api/v1/todos/:id', async () => {
    const todoId = 999;
    const { body } = await request(testServer.app)
      .get(`/api/v1/todos/${todoId}`)
      .expect(400);

    expect(body).toEqual({ error: `Todo with id ${todoId} not found` });
  });

  test('should return a new Todo api/v1/todos', async () => {
    const { body } = await request(testServer.app)
      .post(`/api/v1/todos`)
      .send(todo1)
      .expect(201);

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null,
    });
  });

  test('should return a error if text is not present api/v1/todos', async () => {
    const { body } = await request(testServer.app)
      .post(`/api/v1/todos`)
      .send({})
      .expect(400);

    expect(body).toEqual({ msg: 'text property is required' });
  });
  test('should return a error if text is empty api/v1/todos', async () => {
    const { body } = await request(testServer.app)
      .post(`/api/v1/todos`)
      .send({ text: '' })
      .expect(400);

    expect(body).toEqual({ msg: 'text property is required' });
  });
});
