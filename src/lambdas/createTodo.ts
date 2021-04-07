import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';
import TodosRepository from '../repositories/TodosRepository';
import { CreateTodoArguments, Todo } from '../types';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (
  event: AppSyncResolverEvent<CreateTodoArguments>,
): Promise<Todo> => {
  return todosRepository.create(event.arguments.title);
};

export const handler = createHandler({
  todosRepository,
});
