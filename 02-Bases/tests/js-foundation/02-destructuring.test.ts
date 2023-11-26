import 'jest';
import { characters } from '../../src/js-foundation/02-destructuring';

describe('js-foundation/02-destructuring.ts', () => {
  test('characters array length to be 3', () => {
    expect(characters.length).toEqual(3);
  });

  test('characters array to include Superman, Flash', () => {
    expect(characters).toContain('Superman');
    expect(characters).toContain('Flash');
  });

  test('first character should be Flash, and second Superman', () => {
    const [flash, superman] = characters;

    expect(flash).toBe('Flash');
    expect(superman).toBe('Superman');
  });

  test('characters to be an array', () => {
    expect(characters).toBeInstanceOf(Object);
  });
});
