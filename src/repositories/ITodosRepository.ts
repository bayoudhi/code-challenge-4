import { Todo, Todos } from '../types';

export default interface ITodosRepository {
  create(title: string): Promise<Todo>;
  update(
    id: string,
    todo: { title: string; completed: boolean },
  ): Promise<Todo>;
  delete(id: string): Promise<Todo>;
  get(id: string): Promise<Todo>;
  getAll({ limit, token }: { limit?: number; token?: string }): Promise<Todos>;
}
