import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';
import Todo from '../repositories/models/Todo';
import TodosRepository from '../repositories/TodosRepository';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (
  event: AppSyncResolverEvent<{
    id: string;
    todo: { completed: boolean; title: string };
  }>,
): Promise<Todo> => {
  return todosRepository.update(event.arguments.id, event.arguments.todo);
};

export const handler = createHandler({
  todosRepository,
});
