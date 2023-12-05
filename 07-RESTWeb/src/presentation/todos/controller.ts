import { Request, Response } from 'express';
import { Status } from '../../config/plugins/statusCodes';
import { prisma } from '../../data/postgres';

export class TodosController {
  //* DI
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();

    res.status(Status.OK).json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const todo = await prisma.todo.findUnique({ where: { id } });

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

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const { text, completedAt } = req.body;

    const todo = await prisma.todo.update({
      where: { id },
      data: { text, completedAt: completedAt ? new Date(completedAt) : null },
    });
    res.status(Status.OK).json({ updatedTodo: todo });
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    await prisma.todo.delete({ where: { id } });

    res.status(Status.OK).json({ msg: `Todo with id: ${id} deleted` });
  };
}
