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

  public getTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    const todo = todos.filter((todo) => todo.id === +id);

    res.status(Status.OK).json({ todo });
  };
}
