export const regularExps = {
  // email
  email: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/,
  mongoId: /^[0-9a-fA-F]{24}$/,
};
