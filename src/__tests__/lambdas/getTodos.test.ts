import { AppSyncResolverEvent } from 'aws-lambda';
import { createHandler } from '../../lambdas/getTodos';
import { GetTodosArguments } from '../../types';

describe('createHandler({todosRepository})(event)', () => {
  describe('when todosRepository.getAll rejects', () => {
    let todosRepository;
    const getAllResponse = new Error('Something wrong happened!');
    beforeEach(() => {
      todosRepository = {
        getAll: jest.fn().mockRejectedValue(getAllResponse),
      };
    });

    describe('run', () => {
      let result;

      // expected result
      const expectedResult = getAllResponse;

      beforeEach(async () => {
        try {
          await createHandler({ todosRepository })(
            {} as AppSyncResolverEvent<GetTodosArguments>,
          );
        } catch (e) {
          result = e;
        }
      });

      it('should call todosRepository.getAll once with right args', () => {
        expect(todosRepository.getAll).toBeCalledTimes(1);
        expect(todosRepository.getAll).toBeCalledWith({});
      });

      it('should reject', () => {
        expect(result).toEqual(expectedResult);
      });
    });
  });
  describe('when todosRepository.getAll resolves', () => {
    let todosRepository;
    const getAllResponse = {
      Items: [
        {
          id: 'id1',
          title: 'task 1',
        },
        {
          id: 'id2',
          title: 'task 2',
        },
      ],
    };
    beforeEach(() => {
      todosRepository = {
        getAll: jest.fn().mockResolvedValue(getAllResponse),
      };
    });

    describe('run', () => {
      let result;

      // expected result
      const expectedResult = getAllResponse;

      beforeEach(async () => {
        try {
          result = await createHandler({ todosRepository })(
            {} as AppSyncResolverEvent<GetTodosArguments>,
          );
        } catch (e) {}
      });

      it('should call todosRepository.getAll once with right args', () => {
        expect(todosRepository.getAll).toBeCalledTimes(1);
        expect(todosRepository.getAll).toBeCalledWith({});
      });

      it('should resolve', () => {
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
