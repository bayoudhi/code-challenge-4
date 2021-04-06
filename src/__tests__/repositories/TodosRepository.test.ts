import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import TodosRepository from '../../repositories/TodosRepository';

jest.spyOn(Date, 'now').mockImplementation(() => 123);

describe('TodosRepository(db,tableName,uuid)', () => {
  describe('create(title)', () => {
    describe('when title equals "Go to cinema"', () => {
      const title = 'Go to cinema';
      describe('when uuid returns abc123', () => {
        let uuid;
        const uuidResponse = 'abc123';
        beforeEach(() => {
          uuid = jest.fn().mockReturnValue(uuidResponse);
        });
        describe('when tableName equals todos and db.put rejects', () => {
          const tableName = 'todos';
          let db;
          let promise;
          const putResponse = new Error('Something wrong!');
          beforeEach(() => {
            promise = jest.fn().mockRejectedValue(putResponse);
            db = {
              put: jest.fn().mockReturnValue({ promise }),
            };
          });
          describe('run', () => {
            let result;
            // expected result
            const expectedResult = putResponse;
            beforeEach(async () => {
              try {
                // test
                await new TodosRepository(db, tableName, uuid).create(title);
              } catch (e) {
                result = e;
              }
            });
            it('should call uuid once with right args', () => {
              expect(uuid).toBeCalledTimes(1);
              expect(uuid).toBeCalledWith();
            });

            it('should call db.put.promise once with right args', () => {
              expect(promise).toBeCalledTimes(1);
              expect(promise).toBeCalledWith();
            });

            it('should call db.put once with right args', () => {
              expect(db.put).toBeCalledTimes(1);
              expect(db.put).toBeCalledWith({
                TableName: tableName,
                Item: {
                  id: uuidResponse,
                  title,
                  completed: false,
                  createdAt: 123,
                  updatedAt: 123,
                },
                ConditionExpression: 'attribute_not_exists(id)',
              });
            });

            it('should reject', () => {
              expect(result).toEqual(expectedResult);
            });
          });
        });

        describe('when tableName equals todos and db.put resolves', () => {
          const tableName = 'todos';
          let db;
          let promise;
          const putResponse = {};
          beforeEach(() => {
            promise = jest.fn().mockResolvedValue(putResponse);
            db = {
              put: jest.fn().mockReturnValue({ promise }),
            };
          });
          describe('run', () => {
            let result;
            // expected result
            const expectedResult = {
              id: uuidResponse,
              title,
              completed: false,
              createdAt: 123,
              updatedAt: 123,
            };
            beforeEach(async () => {
              try {
                // test
                result = await new TodosRepository(db, tableName, uuid).create(
                  title,
                );
              } catch (e) {}
            });
            it('should call uuid once with right args', () => {
              expect(uuid).toBeCalledTimes(1);
              expect(uuid).toBeCalledWith();
            });

            it('should call db.put.promise once with right args', () => {
              expect(promise).toBeCalledTimes(1);
              expect(promise).toBeCalledWith();
            });

            it('should call db.put once with right args', () => {
              expect(db.put).toBeCalledTimes(1);
              expect(db.put).toBeCalledWith({
                TableName: tableName,
                Item: {
                  id: uuidResponse,
                  title,
                  completed: false,
                  createdAt: 123,
                  updatedAt: 123,
                },
                ConditionExpression: 'attribute_not_exists(id)',
              });
            });

            it('should resolve', () => {
              expect(result).toEqual(expectedResult);
            });
          });
        });
      });
    });
  });

  describe('delete(id)', () => {
    describe('when id equals id007', () => {
      const id = 'id007';
      describe('when tableName equals todos-dev and db.delete rejects', () => {
        const tableName = 'todos-dev';
        let db;
        let promise;
        let deleteResponse = new Error('Dynamodb is down');

        beforeEach(() => {
          promise = jest.fn().mockRejectedValue(deleteResponse);
          db = {
            delete: jest.fn().mockReturnValue({ promise }),
          };
        });

        describe('run', () => {
          let result;
          // expected result
          const expectedResult = deleteResponse;
          beforeEach(async () => {
            try {
              // test
              await new TodosRepository(db, tableName, jest.fn()).delete(id);
            } catch (e) {
              result = e;
            }
          });

          it('should call db.delete.promise once with right args', () => {
            expect(promise).toBeCalledTimes(1);
            expect(promise).toBeCalledWith();
          });

          it('should call db.delete once with right args', () => {
            expect(db.delete).toBeCalledTimes(1);
            expect(db.delete).toBeCalledWith({
              TableName: tableName,
              Key: {
                id,
              },
            });
          });

          it('should reject', () => {
            expect(result).toEqual(expectedResult);
          });
        });
      });

      describe('when tableName equals todos-dev and db.delete resolves', () => {
        const tableName = 'todos-dev';
        let db;
        let promise;
        let deleteResponse = {};

        beforeEach(() => {
          promise = jest.fn().mockResolvedValue(deleteResponse);
          db = {
            delete: jest.fn().mockReturnValue({ promise }),
          };
        });

        describe('run', () => {
          let result;
          // expected result
          const expectedResult = undefined;
          beforeEach(async () => {
            try {
              // test
              await new TodosRepository(db, tableName, jest.fn()).delete(id);
            } catch (e) {
              result = e;
            }
          });

          it('should call db.delete.promise once with right args', () => {
            expect(promise).toBeCalledTimes(1);
            expect(promise).toBeCalledWith();
          });

          it('should call db.delete once with right args', () => {
            expect(db.delete).toBeCalledTimes(1);
            expect(db.delete).toBeCalledWith({
              TableName: tableName,
              Key: {
                id,
              },
            });
          });

          it('should resolve', () => {
            expect(result).toBeUndefined();
          });
        });
      });
    });
  });

  describe('get(id)', () => {
    describe('when id equals id007', () => {
      const id = 'id007';
      describe('when tableName equals todos-dev and db.get rejects', () => {
        const tableName = 'todos-dev';
        let db;
        let promise;
        let getResponse = new Error('Dynamodb is down');

        beforeEach(() => {
          promise = jest.fn().mockRejectedValue(getResponse);
          db = {
            get: jest.fn().mockReturnValue({ promise }),
          };
        });

        describe('run', () => {
          let result;
          // expected result
          const expectedResult = getResponse;
          beforeEach(async () => {
            try {
              // test
              await new TodosRepository(db, tableName, jest.fn()).get(id);
            } catch (e) {
              result = e;
            }
          });

          it('should call db.get.promise once with right args', () => {
            expect(promise).toBeCalledTimes(1);
            expect(promise).toBeCalledWith();
          });

          it('should call db.get once with right args', () => {
            expect(db.get).toBeCalledTimes(1);
            expect(db.get).toBeCalledWith({
              TableName: tableName,
              Key: {
                id,
              },
            });
          });

          it('should reject', () => {
            expect(result).toEqual(expectedResult);
          });
        });
      });

      describe('when tableName equals todos-dev and db.get resolves without Item', () => {
        const tableName = 'todos-dev';
        let db;
        let promise;
        let getResponse = {};

        beforeEach(() => {
          promise = jest.fn().mockResolvedValue(getResponse);
          db = {
            get: jest.fn().mockReturnValue({ promise }),
          };
        });

        describe('run', () => {
          let result;

          // expected result
          const expectedResult = new Error('Item not found');

          beforeEach(async () => {
            try {
              // test
              await new TodosRepository(db, tableName, jest.fn()).get(id);
            } catch (e) {
              result = e;
            }
          });

          it('should call db.get.promise once with right args', () => {
            expect(promise).toBeCalledTimes(1);
            expect(promise).toBeCalledWith();
          });

          it('should call db.get once with right args', () => {
            expect(db.get).toBeCalledTimes(1);
            expect(db.get).toBeCalledWith({
              TableName: tableName,
              Key: {
                id,
              },
            });
          });

          it('should reject', () => {
            expect(result).toEqual(expectedResult);
          });
        });
      });

      describe('when tableName equals todos-dev and db.get resolves with data', () => {
        const tableName = 'todos-dev';
        let db;
        let promise;
        let getResponse: DocumentClient.GetItemOutput = {
          Item: {
            id,
            title: 'Test is awesome',
          },
        };

        beforeEach(() => {
          promise = jest.fn().mockResolvedValue(getResponse);
          db = {
            get: jest.fn().mockReturnValue({ promise }),
          };
        });

        describe('run', () => {
          let result;

          // expected result
          const expectedResult = getResponse.Item;

          beforeEach(async () => {
            try {
              // test
              result = await new TodosRepository(db, tableName, jest.fn()).get(
                id,
              );
            } catch (e) {}
          });

          it('should call db.get.promise once with right args', () => {
            expect(promise).toBeCalledTimes(1);
            expect(promise).toBeCalledWith();
          });

          it('should call db.get once with right args', () => {
            expect(db.get).toBeCalledTimes(1);
            expect(db.get).toBeCalledWith({
              TableName: tableName,
              Key: {
                id,
              },
            });
          });

          it('should resolve', () => {
            expect(result).toEqual(expectedResult);
          });
        });
      });
    });
  });

  describe('getAll()', () => {
    describe('when tableName equals todos-dev and db.scan rejects', () => {
      const tableName = 'todos-dev';
      let db;
      let promise;
      const scanResponse = new Error('Error happened!');

      beforeEach(() => {
        promise = jest.fn().mockRejectedValue(scanResponse);
        db = {
          scan: jest.fn().mockReturnValue({ promise }),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = scanResponse;

        beforeEach(async () => {
          try {
            // test
            await new TodosRepository(db, tableName, jest.fn()).getAll();
          } catch (e) {
            result = e;
          }
        });

        it('should call db.scan.promise once with right args', () => {
          expect(promise).toBeCalledTimes(1);
          expect(promise).toBeCalledWith();
        });

        it('should call db.scan once with right args', () => {
          expect(db.scan).toBeCalledTimes(1);
          expect(db.scan).toBeCalledWith({
            TableName: tableName,
          });
        });

        it('should reject', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });

    describe('when tableName equals todos-dev and db.scan resolves', () => {
      const tableName = 'todos-dev';
      let db;
      let promise;
      const scanResponse: DocumentClient.ScanOutput = {
        Items: [
          {
            id: 'id1',
            title: 'Task 1',
            completed: true,
          },
          {
            id: 'id2',
            title: 'Task 2',
            completed: false,
          },
        ],
      };

      beforeEach(() => {
        promise = jest.fn().mockResolvedValue(scanResponse);
        db = {
          scan: jest.fn().mockReturnValue({ promise }),
        };
      });

      describe('run', () => {
        let result;

        // expected result
        const expectedResult = scanResponse;

        beforeEach(async () => {
          try {
            // test
            result = await new TodosRepository(
              db,
              tableName,
              jest.fn(),
            ).getAll();
          } catch (e) {}
        });

        it('should call db.scan.promise once with right args', () => {
          expect(promise).toBeCalledTimes(1);
          expect(promise).toBeCalledWith();
        });

        it('should call db.scan once with right args', () => {
          expect(db.scan).toBeCalledTimes(1);
          expect(db.scan).toBeCalledWith({
            TableName: tableName,
          });
        });

        it('should resolve', () => {
          expect(result).toEqual(expectedResult);
        });
      });
    });
  });
});
