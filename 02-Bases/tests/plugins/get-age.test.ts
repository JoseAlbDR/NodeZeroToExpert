import 'jest';
import { getAge } from '../../src/plugins';

const getAgePlugin = require('get-age');

describe('/plugins/get-age.plugin.ts', () => {
  test('getAge() argument should not be empty', () => {
    const birthdate = '';

    try {
      getAge(birthdate);
    } catch (error) {
      expect(error).toBe('birthdate is required');
    }
  });

  test('getAge() should return current age', () => {
    const birthdate = '02-07-1984';

    const age = getAge(birthdate);
    const calculatedAge = getAgePlugin(birthdate);

    expect(age).toBe(calculatedAge);
  });

  test('getAge() should return the age of a person', () => {
    const birthdate = new Date().toISOString();

    const age = getAge(birthdate);

    expect(typeof age).toBe('number');
  });

  test('getAge() argument should be a correct date', () => {
    const birthdate = 'asdf';

    const age = getAge(birthdate);

    expect(age).toBe(NaN);
  });

  test('getAge() should return 0 years', () => {
    // const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);

    // const birthdate = '1995-10-21';
    // const age = getAge(birthdate);

    // expect(age).toBe(0);
    // expect(spy).toHaveBeenCalled();

    const birthdate = new Date().toISOString();

    const age = getAge(birthdate);
    expect(age).toBe(0);
  });
});
