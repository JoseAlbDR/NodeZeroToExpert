import 'jest';
import { getUUID } from '../../src/plugins';

describe('plugins/get-id.plugin.ts', () => {
  const uuid = getUUID();
  test('getUUID() should return a string', () => {
    expect(typeof uuid).toBe('string');
  });

  test('getUUID() should return a string 36 chars long', () => {
    expect(uuid.length).toBe(36);
  });

  test('getUUID() should return unique UUIDs', () => {
    const uuidA = getUUID();
    const uuidB = getUUID();

    expect(uuidA).not.toEqual(uuidB);
  });
});
