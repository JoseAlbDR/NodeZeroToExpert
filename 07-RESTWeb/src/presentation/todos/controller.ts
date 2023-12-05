import { Request, Response } from 'express';
import { Status } from '../../config/plugins/statusCodes';
import { prisma } from '../../data/postgres';

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

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

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

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text)
      return res
        .status(Status.BAD_REQUEST)
        .json({ msg: 'Property text is required' });

    const todo = await prisma.todo.create({
      data: { text },
    });

    res.status(Status.CREATED).json(todo);
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
