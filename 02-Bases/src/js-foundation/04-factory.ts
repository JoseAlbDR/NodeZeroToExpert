import { UUID } from 'crypto';

export const buildMakePerson =
  ({
    getUUID,
    getAge,
  }: {
    getUUID: () => string;
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
