import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';

import TodosRepository from '../repositories/TodosRepository';
import { GetTodosArguments, Todos } from '../types';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (
  _event: AppSyncResolverEvent<GetTodosArguments>,
): Promise<Todos> => {
  return todosRepository.getAll({});
};

export const handler = createHandler({
  todosRepository,
});
