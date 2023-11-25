import { heroes } from '../data/heros';

export const findHeroById = (id: number) => {
  return heroes.find((hero) => hero.id === id);
};
