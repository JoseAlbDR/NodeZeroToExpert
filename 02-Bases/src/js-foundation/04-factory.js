const obj = { name: 'John', birthdate: '02-07-1984' };

const buildPerson = ({ name, birthdate }) => {
  return {
    id: new Date().getTime(),
    name,
    birthdate,
    age: new Date().getFullYear() - new Date(birthdate).getFullYear(),
  };
};

const john = buildPerson(obj);

console.log(john);
