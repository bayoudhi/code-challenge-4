import Todo from '../models/Todo';

export default interface ITodosRepository {
  create(title: string): Promise<Todo>;
  update(id: string, todo: Todo): Promise<Todo>;
  delete(id: string): Promise<void>;
  get(id: string): Promise<Todo>;
  getAll(): Promise<Todo[]>;
}
