import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';
import Todo from '../repositories/models/Todo';
import TodosRepository from '../repositories/TodosRepository';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (_event: AppSyncResolverEvent<{}>): Promise<{ Items: Todo[] }> => {
  return todosRepository.getAll();
};

export const handler = createHandler({
  todosRepository,
});
