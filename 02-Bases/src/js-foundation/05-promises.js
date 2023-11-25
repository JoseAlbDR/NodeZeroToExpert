const getPokemonById = (id) => {
  const url = 'https://pokeapi.co/api/v2/pokemon';

  return fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then(() => {
      throw new Error('EEEERRRROOOOOORRRRR');
    })
    .then((pokemon) => pokemon.name);
};

module.exports = { getPokemonById };
