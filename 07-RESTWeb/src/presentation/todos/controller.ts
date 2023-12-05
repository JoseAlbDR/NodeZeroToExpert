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

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res
        .status(Status.NOT_FOUND)
        .json({ msg: `Todo with id ${id} not found` });

    res.status(Status.OK).json({ todo });
  };

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text)
      return res
        .status(Status.BAD_REQUEST)
        .json({ msg: 'Property text is required' });

    const newTodo = {
      id: todos.length + 1,
      text,
      createdAt: new Date(),
    };

    todos.push(newTodo);

    res.status(Status.CREATED).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(Status.BAD_REQUEST).json({ msg: 'Invalid id' });

    const todo = todos.find((todo) => todo.id === id);

    if (!todo)
      return res
        .status(Status.NOT_FOUND)
        .json({ msg: `Todo with id ${id} not found` });

    const { text } = req.body;
    if (!text)
      return res
        .status(Status.BAD_REQUEST)
        .json({ msg: 'Property text is required' });

    todo.text = text;

    res.status(Status.OK).json({ updatedTodo: todo });
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    if (todoIndex < 0)
      return res
        .status(Status.NOT_FOUND)
        .json({ msg: `Todo with id: ${id} not found` });

    const deletedTodo = todos[todoIndex];
    todos.splice(todoIndex, 1);

    res.status(Status.OK).json({ deletedTodo });
  };
}
