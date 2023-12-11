import { Request, Response } from 'express';
import { Status } from '../../config/plugins/statusCodes';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from '../../domain';

export class TodosController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await new GetTodos(this.todoRepository).execute();

    res.status(Status.OK).json(todos);
  };

  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) throw `id:${req.params.id} must be a number`;

    const todo = await new GetTodo(this.todoRepository).execute(id);

    res.status(Status.OK).json({ todo });
  };

  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);

    if (error) throw error;

    new CreateTodo(this.todoRepository)
      .execute(createTodoDto!)
      .then((todo) => res.status(Status.CREATED).json(todo));
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) throw `id:${req.params.id} must be a number`;

    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });

    if (error) throw error;

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.status(Status.OK).json(todo))
      .catch((err) => res.status(Status.BAD_REQUEST).json({ err }));
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id)) throw `id:${req.params.id} must be a number`;

    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((_) =>
        res.status(Status.OK).json({ msg: `Todo with id: ${id} deleted` })
      )
      .catch((err) => res.status(Status.BAD_REQUEST).json({ err }));
  };
}
