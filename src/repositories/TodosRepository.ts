import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import ITodosRepository from './interfaces/ITodosRepository';
import Todo from './models/Todo';

export default class TodosRepository implements ITodosRepository {
  constructor(
    private db: DocumentClient,
    private tableName: string,
    private uuid: () => string,
  ) {}
  async create(title: string): Promise<Todo> {
    const id = this.uuid();
    const now = Date.now();
    const newTodo = {
      id,
      title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    await this.db
      .put({
        TableName: this.tableName,
        Item: newTodo,
        ConditionExpression: 'attribute_not_exists(id)',
      })
      .promise();
    return newTodo;
  }
  update(id: string, todo: Todo): Promise<Todo> {
    throw new Error('Method not implemented.' + id + todo);
  }
  async delete(id: string): Promise<void> {
    await this.db
      .delete({
        TableName: this.tableName,
        Key: {
          id,
        },
      })
      .promise();
  }
  async get(id: string): Promise<Todo> {
    const response = await this.db
      .get({
        TableName: this.tableName,
        Key: {
          id,
        },
      })
      .promise();
    if (!response.Item) {
      throw new Error('Item not found');
    }
    return response.Item as Todo;
  }
  getAll(): Promise<{ Items: Todo[] }> {
    throw new Error('Method not implemented.');
  }
}
