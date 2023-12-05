import {
  CreateTodoDto,
  TodoEntity,
  TodoRepository,
  UpdateTodoDto,
} from '../../domain';
import { TodoDatasourceImpl } from '../datasource/todo.datasource.impl';

export class TodoRepositoryImp implements TodoRepository {
  constructor(private readonly datasource: TodoDatasourceImpl) {}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  getById(id: number): Promise<TodoEntity> {
    return this.datasource.getById(id);
  }
  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto);
  }
  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
}
