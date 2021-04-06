import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';
import TodosRepository from '../repositories/TodosRepository';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (event: AppSyncResolverEvent<{ id: string }>): Promise<{}> => {
  return todosRepository.delete(event.arguments.id);
};

export const handler = createHandler({
  todosRepository,
});
