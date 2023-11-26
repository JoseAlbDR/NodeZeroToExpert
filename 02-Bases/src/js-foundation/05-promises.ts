import { http } from '../plugins';

interface IPokemon {
  name: string;
}

export const getPokemonById = async (id: number): Promise<string> => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const pokemon = await http.get<IPokemon>(url);

  return pokemon.name;
  // return fetch(`${url}/${id}`)
  //   .then((response) => response.json())
  //   .then(() => {
  //     throw new Error('EEEERRRROOOOOORRRRR');
  //   })
  //   .then((pokemon: IPokemon) => pokemon.name);
};
