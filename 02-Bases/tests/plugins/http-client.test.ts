import 'jest';
import { http } from '../../src/plugins';
import { AxiosError } from 'axios';

interface Data {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

describe('plugins/http-client.plugin.ts', () => {
  test('http() should return a object', async () => {
    const data = await http.get<Data>(
      'https://jsonplaceholder.typicode.com/todos/1'
    );

    expect(data).toEqual({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean),
    });
  });

  test('http() should throw an error', async () => {
    try {
      await http.get('');
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError);
    }
  });

  test('http().post, .put, .delete should be functions throw an error', async () => {
    expect(typeof http.post).toBe('function');

    expect(typeof http.put).toBe('function');

    expect(typeof http.delete).toBe('function');

    try {
      await http.post('', {});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    try {
      await http.put('', {});
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }

    try {
      await http.delete('');
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
