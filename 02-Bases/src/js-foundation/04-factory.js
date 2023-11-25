const buildMakePerson =
  ({ getUUID, getAge }) =>
  ({ name, birthdate }) => {
    return {
      id: getUUID(),
      name,
      birthdate,
      age: getAge(birthdate),
    };
  };

// const obj = { name: 'John', birthdate: '02-07-1984' };
// const john = buildPerson(obj);

// console.log(john);

module.exports = { buildMakePerson };
