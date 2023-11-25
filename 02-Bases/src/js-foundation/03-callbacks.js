const users = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Jane Doe',
  },
];

const getUserById = (id, cb) => {
  const user = users.find((user) => user.id === id);
  if (!user) return cb(`User not found with id ${id}`);
  return cb(null, user);
};

// console.log({ user: getUserById(1) });

module.exports = { getUserById };
