import { Todo, Todos } from '../types';

export default interface ITodosRepository {
  create({ title }: { title: string }): Promise<Todo>;
  update({
    id,
    title,
    completed,
  }: {
    id: string;
    title: string;
    completed: boolean;
  }): Promise<Todo>;
  delete({ id }: { id: string }): Promise<Todo>;
  get({ id }: { id: string }): Promise<Todo>;
  getAll({ limit, token }: { limit?: number; token?: string }): Promise<Todos>;
}
