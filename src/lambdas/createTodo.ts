import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';
import Todo from '../repositories/models/Todo';
import TodosRepository from '../repositories/TodosRepository';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (event: AppSyncResolverEvent<{ title: string }>): Promise<Todo> => {
  return todosRepository.create(event.arguments.title);
};

export const handler = createHandler({
  todosRepository,
});
