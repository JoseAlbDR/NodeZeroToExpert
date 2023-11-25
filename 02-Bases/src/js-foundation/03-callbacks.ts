export interface IUser {
  id: number;
  name: string;
}

const users: IUser[] = [
  {
    id: 1,
    name: 'John Doe',
  },
  {
    id: 2,
    name: 'Jane Doe',
  },
];

export const getUserById = (
  id: number,
  cb: (error?: string | null, user?: IUser) => void
) => {
  const user = users.find((user) => user.id === id);

  !user ? cb(`User not found with id ${id}`) : cb(null, user);
};
