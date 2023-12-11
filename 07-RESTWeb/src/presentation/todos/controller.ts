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
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { CustomError } from '../../errors/custom.error';

export class TodosController {
  //* DI
  constructor(private readonly todoRepository: TodoRepository) {}

  private handleError = (res: Response, err: unknown) => {
    console.log(err);

    let msg, statusCode;

    // Prisma Errors
    if (err instanceof PrismaClientValidationError) {
      statusCode = Status.BAD_REQUEST;
      msg = err.message.split('\n').at(-1);
    }

    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
      statusCode = Status.NOT_FOUND;
      msg = err.meta?.cause;
    }

    // Custom Error
    if (err instanceof CustomError) {
      statusCode = err.status;
      msg = err.message;
    }

    // DTO error
    if (typeof err === 'string') {
      statusCode = Status.BAD_REQUEST;
      msg = err;
    }

    return res.status(statusCode || Status.INTERNAL_SERVER_ERROR).json({
      name: (err as Error).name,
      msg:
        msg ||
        (err as Error).message ||
        'Internal Server Error. Try Again Later',
      stack: (err as Error).stack,
    });
  };

  public getTodos = async (req: Request, res: Response) => {
    try {
      const todos = await new GetTodos(this.todoRepository).execute();
      res.status(Status.OK).json(todos);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public getTodoById = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      if (isNaN(id)) throw `id:${req.params.id} must be a number`;
      const todo = await new GetTodo(this.todoRepository).execute(id);
      res.status(Status.OK).json({ todo });
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    try {
      const [error, createTodoDto] = CreateTodoDto.create(req.body);
      if (error) throw error;
      const todo = await new CreateTodo(this.todoRepository).execute(
        createTodoDto!
      );
      res.status(Status.CREATED).json(todo);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      if (isNaN(id)) throw `id:${req.params.id} must be a number`;
      const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
      if (error) throw error;
      const todo = await new UpdateTodo(this.todoRepository).execute(
        updateTodoDto!
      );
      res.status(Status.OK).json(todo);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    try {
      const id = +req.params.id;
      if (isNaN(id)) throw `id:${req.params.id} must be a number`;
      await new DeleteTodo(this.todoRepository).execute(id);
      res.status(Status.OK).json({ msg: `Todo with id: ${id} deleted` });
    } catch (error) {
      this.handleError(res, error);
    }
  };
}
