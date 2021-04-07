import { AppSyncResolverEvent } from 'aws-lambda';
import { createHandler } from '../../lambdas/deleteTodo';

describe('createHandler({todosRepository})(event)', () => {
  describe('when event.arguments.id equals "id1"', () => {
    const event = {
      arguments: {
        id: 'id1',
      },
    } as AppSyncResolverEvent<{ id: string }>;
    describe('when todosRepository.delete rejects', () => {
      let todosRepository;
      const deleteResponse = new Error('Something wrong happened!');
      beforeEach(() => {
        todosRepository = {
          delete: jest.fn().mockRejectedValue(deleteResponse),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = deleteResponse;

        beforeEach(async () => {
          try {
            await createHandler({ todosRepository })(event);
          } catch (e) {
            result = e;
          }
        });

        it('should call todosRepository.delete once with right args', () => {
          expect(todosRepository.delete).toBeCalledTimes(1);
          expect(todosRepository.delete).toBeCalledWith({
            id: event.arguments.id,
          });
        });

        it('should reject', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
    describe('when todosRepository.delete resolves', () => {
      let todosRepository;
      const deleteResponse = {
        id: event.arguments.id,
        completed: true,
      };
      beforeEach(() => {
        todosRepository = {
          delete: jest.fn().mockResolvedValue(deleteResponse),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = deleteResponse;

        beforeEach(async () => {
          try {
            result = await createHandler({ todosRepository })(event);
          } catch (e) {}
        });

        it('should call todosRepository.delete once with right args', () => {
          expect(todosRepository.delete).toBeCalledTimes(1);
          expect(todosRepository.delete).toBeCalledWith({
            id: event.arguments.id,
          });
        });

        it('should resolve', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
  });
});
