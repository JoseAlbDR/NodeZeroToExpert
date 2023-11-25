import { UUID } from 'crypto';

export const buildMakePerson =
  ({
    getUUID,
    getAge,
  }: {
    getUUID: () => UUID;
    getAge: (birthdate: string) => number;
  }) =>
  ({ name, birthdate }: { name: string; birthdate: string }) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate),
    };
  };
