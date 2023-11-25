const getPokemonById = (id, cb) => {
  const url = 'https://pokeapi.co/api/v2/pokemon';

  fetch(`${url}/${id}`)
    .then((response) => response.json())
    .then((pokemon) => cb(pokemon.name))
    .catch((err) => console.log(err))
    .finally(() => console.log('All Done'));
};

module.exports = { getPokemonById };
