import TodosRepository from '../repositories/TodosRepository';
import { DynamoDB } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

const { TODOS_TABLE_NAME } = process.env;

export const todosRepository = new TodosRepository(
  new DynamoDB.DocumentClient(),
  TODOS_TABLE_NAME,
  uuid,
);
