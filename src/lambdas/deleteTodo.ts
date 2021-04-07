import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';
import TodosRepository from '../repositories/TodosRepository';
import { DeleteTodoArguments, Todo } from '../types';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (event: AppSyncResolverEvent<DeleteTodoArguments>): Promise<Todo> => {
  return todosRepository.delete(event.arguments.id);
};

export const handler = createHandler({
  todosRepository,
});
