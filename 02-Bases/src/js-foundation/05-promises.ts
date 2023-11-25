interface IPokemon {
  name: string;
}

const getPokemonById = (id: number): Promise<string> => {
  const url = 'https://pokeapi.co/api/v2/pokemon';

  return fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then(() => {
      throw new Error('EEEERRRROOOOOORRRRR');
    })
    .then((pokemon: IPokemon) => pokemon.name);
};

module.exports = { getPokemonById };
