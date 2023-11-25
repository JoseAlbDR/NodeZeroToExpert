// const { emailTemplate } = require('./js-foundation/01-template');
// console.log(emailTemplate);
// require('./js-foundation/02-destructuring');

const { getUserById } = require('./js-foundation/03-callbacks');

const id = 1;

getUserById(id, (error, user) => {
  if (error) throw new Error(error);

  getUserById(2, (error, user2) => {
    if (error) throw new Error(error);
    console.log(user, user2);
  });
});
