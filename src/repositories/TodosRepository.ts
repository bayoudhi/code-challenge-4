import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Todo, Todos } from '../types';
import ITodosRepository from './ITodosRepository';

export default class TodosRepository implements ITodosRepository {
  constructor(
    private db: DocumentClient,
    private tableName: string,
    private uuid: () => string,
  ) {}

  async create({ title }: { title: string }): Promise<Todo> {
    if (!title) {
      throw new Error('title is missing');
    }
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

  async update({
    id,
    title,
    completed,
  }: {
    id: string;
    title: string;
    completed: boolean;
  }): Promise<Todo> {
    if (!id) {
      throw new Error('id is missing');
    }
    if (!title) {
      throw new Error('title is missing');
    }
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
          ':title': title,
          ':completed': completed,
          ':now': Date.now(),
        },
      })
      .promise();
    return resposne.Attributes as Todo;
  }

  async delete({ id }: { id: string }): Promise<Todo> {
    if (!id) {
      throw new Error('id is missing');
    }
    const response = await this.db
      .delete({
        TableName: this.tableName,
        Key: {
          id,
        },
        ReturnValues: 'ALL_OLD',
      })
      .promise();
    return response.Attributes as Todo;
  }

  async get({ id }: { id: string }): Promise<Todo> {
    if (!id) {
      throw new Error('id is missing');
    }
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

  async getAll({
    limit,
    token,
  }: {
    limit?: number;
    token?: string;
  }): Promise<Todos> {
    const response = await this.db
      .scan({
        TableName: this.tableName,
        Limit: limit,
        ExclusiveStartKey:
          (token && JSON.parse(decodeURIComponent(token))) || undefined,
      })
      .promise();

    const todos: Todos = {
      Items: response.Items as Todo[],
      nextToken:
        (response.LastEvaluatedKey &&
          encodeURIComponent(JSON.stringify(response.LastEvaluatedKey))) ||
        undefined,
    };

    return todos;
  }
}
