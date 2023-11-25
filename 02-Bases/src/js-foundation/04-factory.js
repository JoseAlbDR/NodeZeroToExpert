const { getAge } = require('../plugins/get-age.plugin');
const { getUUID } = require('../plugins/get-id.plugin');

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
