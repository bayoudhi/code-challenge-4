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
  async update(id: string, todo: Todo): Promise<Todo> {
    const resposne = await this.db
      .update({
        TableName: this.tableName,
        Key: {
          id,
        },
        ReturnValues: 'ALL_NEW',
        UpdateExpression:
          'SET #title = :title, #completed = :completed, #updatedAt = :now',
        ConditionExpression: 'attribute_exists(id)',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#completed': 'completed',
          '#updatedAt': 'updatedAt',
        },
        ExpressionAttributeValues: {
          ':title': todo.title,
          ':completed': todo.completed,
          ':now': Date.now(),
        },
      })
      .promise();
    return resposne.Attributes as Todo;
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
  async getAll(): Promise<{ Items: Todo[] }> {
    const response = await this.db
      .scan({ TableName: this.tableName })
      .promise();
    return {
      Items: response.Items as Todo[],
    };
  }
}
