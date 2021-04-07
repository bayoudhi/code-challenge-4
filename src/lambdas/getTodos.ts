import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';

import TodosRepository from '../repositories/TodosRepository';
import { GetTodosArguments, Todos } from '../types';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (
  event: AppSyncResolverEvent<GetTodosArguments>,
): Promise<Todos> => {
  const { limit, token } = event.arguments || {};
  return todosRepository.getAll({ limit, token });
};

export const handler = createHandler({
  todosRepository,
});
