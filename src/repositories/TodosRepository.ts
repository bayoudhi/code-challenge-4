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
  get(id: string): Promise<Todo> {
    throw new Error('Method not implemented.' + id);
  }
  getAll(): Promise<Todo[]> {
    throw new Error('Method not implemented.');
  }
}
