import 'jest';
import { buildMakePerson } from '../../src/js-foundation/04-factory';

describe('js-foundation/04-factory.ts', () => {
  const getUUID = () => '1234';
  const getAge = () => 39;

  test('buildMakePerson should return a function', () => {
    const makePerson = buildMakePerson({ getUUID, getAge });
    // expect(makePerson).toBeInstanceOf(Function);

    expect(typeof makePerson).toBe('function');
  });

  test('makePerson should return a person', () => {
    const makePerson = buildMakePerson({ getUUID, getAge });
    const johnDoe = makePerson({ name: 'John Doe', birthdate: '1985-10-21' });

    expect(johnDoe).toEqual({
      name: 'John Doe',
      birthdate: '1985-10-21',
      id: '1234',
      age: 39,
    });
  });
});
