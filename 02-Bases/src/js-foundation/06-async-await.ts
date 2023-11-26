import { http } from '../plugins';

interface IPokemon {
  name: string;
}

export const getPokemonByIdAsync = async (id: number): Promise<string> => {
  const url = 'https://pokeapi.co/api/v2/pokemon';

  try {
    const pokemon: IPokemon = await http.get<IPokemon>(`${url}/${id}`);
    return pokemon.name;
  } catch (error) {
    throw `Pokemon not found with id ${id}`;
  }
};
