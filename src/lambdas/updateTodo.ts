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
  const { id, todo } = event.arguments;
  return todosRepository.update({
    id,
    title: todo.title,
    completed: todo.completed,
  });
};

export const handler = createHandler({
  todosRepository,
});
