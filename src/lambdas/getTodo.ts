import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';
import TodosRepository from '../repositories/TodosRepository';
import { GetTodoArguments, Todo } from '../types';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (event: AppSyncResolverEvent<GetTodoArguments>): Promise<Todo> => {
  const { id } = event.arguments;
  return todosRepository.get({ id });
};

export const handler = createHandler({
  todosRepository,
});
