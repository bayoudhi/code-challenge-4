import { AppSyncResolverEvent } from 'aws-lambda';
import { todosRepository } from '../repositories';
import TodosRepository from '../repositories/TodosRepository';
import { Todo, UpdateTodoArguments } from '../types';

export const createHandler = ({
  todosRepository,
}: {
  todosRepository: TodosRepository;
}) => async (
  event: AppSyncResolverEvent<UpdateTodoArguments>,
): Promise<Todo> => {
  return todosRepository.update(event.arguments.id, event.arguments.todo);
};

export const handler = createHandler({
  todosRepository,
});
