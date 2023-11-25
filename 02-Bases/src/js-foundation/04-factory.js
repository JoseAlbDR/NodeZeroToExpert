const { getUUID, getAge } = require('../plugins');

const obj = { name: 'John', birthdate: '02-07-1984' };

const buildPerson = ({ name, birthdate }) => {
  return {
    id: getUUID(),
    name,
    birthdate,
    age: getAge(birthdate),
  };
};

const john = buildPerson(obj);

console.log(john);
