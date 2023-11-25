const { v4: uuidv4 } = require('uuid');
const { getAge } = require('../public/get-age.plugin');

const obj = { name: 'John', birthdate: '02-07-1984' };

const buildPerson = ({ name, birthdate }) => {
  return {
    id: uuidv4(),
    name,
    birthdate,
    age: getAge(birthdate),
  };
};

const john = buildPerson(obj);

console.log(john);
