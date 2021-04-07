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
  const { title } = event.arguments;
  return todosRepository.create({ title });
};

export const handler = createHandler({
  todosRepository,
});

export const x = '';
