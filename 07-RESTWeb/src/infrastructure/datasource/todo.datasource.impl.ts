import { Status } from '../../config/plugins/statusCodes';
import { prisma } from '../../data/postgres';
import {
  CreateTodoDto,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDto,
} from '../../domain';
import { CustomError } from '../../errors/custom.error';

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!,
    });

    return TodoEntity.fromObject(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map((todo) => TodoEntity.fromObject(todo));
  }
  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo)
      throw new CustomError(`Todo with id ${id} not found`, Status.NOT_FOUND);

    return TodoEntity.fromObject(todo);
  }
  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const { id } = updateTodoDto;

    await this.getById(id);

    const todo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values,
    });

    return TodoEntity.fromObject(todo);
  }
  async deleteById(id: number): Promise<TodoEntity> {
    await this.getById(id);

    const todo = await prisma.todo.delete({ where: { id } });

    return TodoEntity.fromObject(todo);
  }
}
