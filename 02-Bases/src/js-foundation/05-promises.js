const getPokemonById = (id) => {
  const url = 'https://pokeapi.co/api/v2/pokemon';

  return fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((pokemon) => pokemon.name)
    .catch((err) => console.log(err))
    .finally(() => console.log('All Done'));
};

module.exports = { getPokemonById };
