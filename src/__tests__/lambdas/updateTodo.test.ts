import { AppSyncResolverEvent } from 'aws-lambda';
import { createHandler } from '../../lambdas/updateTodo';

describe('createHandler({todosRepository})(event)', () => {
  describe('when event.arguments.id equals "id1", event.arguments.todo.completed equals true and event.arguments.todo.title equals "Go to Cinema"', () => {
    const event = {
      arguments: {
        id: 'id1',
        todo: {
          completed: true,
          title: 'Go to Cinema',
        },
      },
    } as AppSyncResolverEvent<{
      id: string;
      todo: { completed: boolean; title: string };
    }>;
    describe('when todosRepository.update rejects', () => {
      let todosRepository;
      const updateResponse = new Error('Something wrong happened!');
      beforeEach(() => {
        todosRepository = {
          update: jest.fn().mockRejectedValue(updateResponse),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = updateResponse;

        beforeEach(async () => {
          try {
            await createHandler({ todosRepository })(event);
          } catch (e) {
            result = e;
          }
        });

        it('should call todosRepository.update once with right args', () => {
          expect(todosRepository.update).toBeCalledTimes(1);
          expect(todosRepository.update).toBeCalledWith({
            id: event.arguments.id,
            title: event.arguments.todo.title,
            completed: event.arguments.todo.completed,
          });
        });

        it('should reject', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
    describe('when todosRepository.update resolves', () => {
      let todosRepository;
      const updateResponse = {
        id: event.arguments.id,
        completed: true,
        title: 'Go to Cinema',
        updateAt: 1234567890123,
      };
      beforeEach(() => {
        todosRepository = {
          update: jest.fn().mockResolvedValue(updateResponse),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = updateResponse;

        beforeEach(async () => {
          try {
            result = await createHandler({ todosRepository })(event);
          } catch (e) {}
        });

        it('should call todosRepository.update once with right args', () => {
          expect(todosRepository.update).toBeCalledTimes(1);
          expect(todosRepository.update).toBeCalledWith({
            id: event.arguments.id,
            title: event.arguments.todo.title,
            completed: event.arguments.todo.completed,
          });
        });

        it('should resolve', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
  });
});
