import 'jest';
import { getPokemonByIdAsync } from '../../src/js-foundation/06-async-await';

describe('js-foundation/05-promises.ts', () => {
  test('getPokemonByIdAsync should return a string', async () => {
    const pokeName = await getPokemonByIdAsync(1);

    expect(typeof pokeName).toBe('string');
  });

  test('getPokemonByIdAsync should return bulbasaur', async () => {
    const pokeName = await getPokemonByIdAsync(1);

    expect(pokeName).toBe('bulbasaur');
  });

  test('should return an error if pokemon does not exist', async () => {
    const pokeId = 1000000000;

    try {
      const pokeName = await getPokemonByIdAsync(pokeId);
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBe(`Pokemon not found with id ${pokeId}`);
    }
  });
});
