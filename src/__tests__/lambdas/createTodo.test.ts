import { AppSyncResolverEvent } from 'aws-lambda';
import { createHandler } from '../../lambdas/createTodo';
import Todo from '../../repositories/models/Todo';

describe('createHandler({todosRepository})(event)', () => {
  describe('when event.arguments.title equals "Play Basketball"', () => {
    const event = {
      arguments: {
        title: 'Play Basketball',
      },
    } as AppSyncResolverEvent<{ title: string }>;
    describe('when todosRepository.create rejects', () => {
      let todosRepository;
      const createResponse = new Error('Something wrong happened!');
      beforeEach(() => {
        todosRepository = {
          create: jest.fn().mockRejectedValue(createResponse),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = createResponse;

        beforeEach(async () => {
          try {
            await createHandler({ todosRepository })(event);
          } catch (e) {
            result = e;
          }
        });

        it('should call todosRepository.create once with right args', () => {
          expect(todosRepository.create).toBeCalledTimes(1);
          expect(todosRepository.create).toBeCalledWith(event.arguments.title);
        });

        it('should reject', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
    describe('when todosRepository.create resolves', () => {
      let todosRepository;
      const createResponse: Todo = {
        id: 'abc123-321',
        title: event.arguments.title,
        completed: false,
        createdAt: 1234567890123,
        updatedAt: 1234567890123,
      };
      beforeEach(() => {
        todosRepository = {
          create: jest.fn().mockResolvedValue(createResponse),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = createResponse;

        beforeEach(async () => {
          try {
            result = await createHandler({ todosRepository })(event);
          } catch (e) {}
        });

        it('should call todosRepository.create once with right args', () => {
          expect(todosRepository.create).toBeCalledTimes(1);
          expect(todosRepository.create).toBeCalledWith(event.arguments.title);
        });

        it('should resolve', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
  });
});
