const { http } = require('../plugins');

interface IPokemon {
  name: string;
}

const getPokemonByIdAsync = async (id: number): Promise<string> => {
  const url = 'https://pokeapi.co/api/v2/pokemon';

  const pokemon: IPokemon = await http.get(`${url}/${id}`);

  return pokemon.name;
};

module.exports = { getPokemonByIdAsync };
