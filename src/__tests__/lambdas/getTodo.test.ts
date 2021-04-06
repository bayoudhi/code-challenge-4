import { AppSyncResolverEvent } from 'aws-lambda';
import { createHandler } from '../../lambdas/getTodo';

describe('createHandler({todosRepository})(event)', () => {
  describe('when event.arguments.id equals "id1"', () => {
    const event = {
      arguments: {
        id: 'id1',
      },
    } as AppSyncResolverEvent<{ id: string }>;
    describe('when todosRepository.get rejects', () => {
      let todosRepository;
      const getResponse = new Error('Something wrong happened!');
      beforeEach(() => {
        todosRepository = {
          get: jest.fn().mockRejectedValue(getResponse),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = getResponse;

        beforeEach(async () => {
          try {
            await createHandler({ todosRepository })(event);
          } catch (e) {
            result = e;
          }
        });

        it('should call todosRepository.get once with right args', () => {
          expect(todosRepository.get).toBeCalledTimes(1);
          expect(todosRepository.get).toBeCalledWith(event.arguments.id);
        });

        it('should reject', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
    describe('when todosRepository.get resolves', () => {
      let todosRepository;
      const getResponse = {
        id: event.arguments.id,
        completed: true,
      };
      beforeEach(() => {
        todosRepository = {
          get: jest.fn().mockResolvedValue(getResponse),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = getResponse;

        beforeEach(async () => {
          try {
            result = await createHandler({ todosRepository })(event);
          } catch (e) {}
        });

        it('should call todosRepository.get once with right args', () => {
          expect(todosRepository.get).toBeCalledTimes(1);
          expect(todosRepository.get).toBeCalledWith(event.arguments.id);
        });

        it('should resolve', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
  });
});
