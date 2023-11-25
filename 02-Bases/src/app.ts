// const { emailTemplate } = require('./js-foundation/01-template');
// console.log(emailTemplate);
// require('./js-foundation/02-destructuring');
// const { getUserById } = require('./js-foundation/03-callbacks');
// const { getUUID, getAge } = require('./plugins');
// const { buildMakePerson } = require('./js-foundation/04-factory');

// const id = 1;

// getUserById(id, (error, user) => {
//   if (error) throw new Error(error);

//   getUserById(2, (error, user2) => {
//     if (error) throw new Error(error);
//     console.log(user, user2);
//   });
// });

// const obj = { name: 'John', birthdate: '02-07-1984' };

// const makePerson = buildMakePerson({ getUUID, getAge });

// const john = makePerson(obj);

// console.log(john);

// const { getPokemonById } = require('./js-foundation/05-promises');

// getPokemonById(1)
//   .then((name) => console.log({ pokemon: name }))
//   .catch((err) => console.log('There was an error:', err))
//   .finally(() => console.log('All Done'));

// const { getPokemonByIdAsync } = require('./js-foundation/06-async-await');
// const fs = require('fs');

// getPokemonByIdAsync(1)
//   .then((pokemon) => console.log({ pokemon }))
//   .catch((err) => console.log('There was an error:', err))
//   .finally(() => console.log('All Done'));

// const { buildLogger } = require('./plugins');

// fs.readFile('./error.log', 'utf-8', (err, data) => {
//   if (err) throw err;
//   console.log(JSON.parse(data));
// });

import { buildLogger } from './plugins/logger.plugin';

const logger = buildLogger('app.js');
logger.log('Hello there');
logger.error('There was an error');
