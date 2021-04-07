import { AppSyncResolverEvent } from 'aws-lambda';
import { createHandler } from '../../lambdas/getTodos';
import { GetTodosArguments } from '../../types';

describe('createHandler({todosRepository})(event)', () => {
  describe('when no arguments are passed', () => {
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

  describe('when event.arguments.limit equals 6', () => {
    const event = {
      arguments: {
        limit: 6,
      },
    };
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
              event as AppSyncResolverEvent<GetTodosArguments>,
            );
          } catch (e) {
            result = e;
          }
        });

        it('should call todosRepository.getAll once with right args', () => {
          expect(todosRepository.getAll).toBeCalledTimes(1);
          expect(todosRepository.getAll).toBeCalledWith({
            limit: event.arguments.limit,
          });
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
        nextToken: 'token',
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
              event as AppSyncResolverEvent<GetTodosArguments>,
            );
          } catch (e) {}
        });

        it('should call todosRepository.getAll once with right args', () => {
          expect(todosRepository.getAll).toBeCalledTimes(1);
          expect(todosRepository.getAll).toBeCalledWith({
            limit: event.arguments.limit,
          });
        });

        it('should resolve', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
  });

  describe('when event.arguments.limit equals 6 and token equals %7B%22id%22%3A%22id3%22%2C%22title%22%3A%22Task3%22%2C%22completed%22%3Afalse%7D', () => {
    const event = {
      arguments: {
        limit: 6,
        token:
          '%7B%22id%22%3A%22id3%22%2C%22title%22%3A%22Task3%22%2C%22completed%22%3Afalse%7D',
      },
    };
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
              event as AppSyncResolverEvent<GetTodosArguments>,
            );
          } catch (e) {
            result = e;
          }
        });

        it('should call todosRepository.getAll once with right args', () => {
          expect(todosRepository.getAll).toBeCalledTimes(1);
          expect(todosRepository.getAll).toBeCalledWith({
            limit: event.arguments.limit,
            token: event.arguments.token,
          });
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
        nextToken: 'token',
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
              event as AppSyncResolverEvent<GetTodosArguments>,
            );
          } catch (e) {}
        });

        it('should call todosRepository.getAll once with right args', () => {
          expect(todosRepository.getAll).toBeCalledTimes(1);
          expect(todosRepository.getAll).toBeCalledWith({
            limit: event.arguments.limit,
            token: event.arguments.token,
          });
        });

        it('should resolve', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
  });
});
