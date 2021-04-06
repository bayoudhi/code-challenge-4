import TodosRepository from '../../repositories/TodosRepository';

jest.spyOn(Date, 'now').mockImplementation(() => 123);

describe('TodosRepository', () => {
  describe('create(title)', () => {
    describe('when title equals "Go to cinema"', () => {
      const title = 'Go to cinema';
      describe('when uuid returns abc123', () => {
        let uuid;
        const uuidResponse = 'abc123';
        beforeEach(() => {
          uuid = jest.fn().mockReturnValue(uuidResponse);
        });
        describe('when tableName equals todos and db.put throws', () => {
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

            it('should reject', () => {
              expect(result).toEqual(expectedResult);
            });
          });
        });
      });
    });
  });
});
