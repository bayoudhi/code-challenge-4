import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';
import TodosRepository from '../repositories/TodosRepository';
import { GetTodoArguments, Todo } from '../types';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (event: AppSyncResolverEvent<GetTodoArguments>): Promise<Todo> => {
  return todosRepository.get(event.arguments.id);
};

export const handler = createHandler({
  todosRepository,
});
