import { Request, Response } from 'express';
import { Status } from '../../config/plugins/statusCodes';

const todos = [
  {
    id: 1,
    text: 'Buy Milk',
    createdAt: new Date(),
  },
  {
    id: 2,
    text: 'Buy Milk',
    createdAt: null,
  },
  {
    id: 3,
    text: 'Buy Milk',
    createdAt: new Date(),
  },
];

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.status(Status.OK).json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(Status.BAD_REQUEST).json({ msg: 'Invalid id' });

    const todo = todos.filter((todo) => todo.id === id);

    if (todo.length === 0)
      return res.status(Status.NOT_FOUND).json({ msg: 'Not found' });

    res.status(Status.OK).json({ todo });
  };
}
