import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'code-challenge-4',
  frameworkVersion: '2',
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'dev'}",
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['dynamodb:*'],
        Resource: [
          {
            'Fn::GetAtt': ['TodosTable', 'Arn'],
          },
        ],
      },
    ],
    environment: {
      TODOS_TABLE_NAME: '${self:custom.todos_table_name}',
    },
  },
  custom: {
    todos_table_name: '${self:service}-${self:provider.stage}-todos',
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
      packager: 'yarn',
    },
  },
  package: {
    individually: true,
  },
  functions: {
    hello: {
      handler: 'src/hello.handler',
      events: [
        {
          http: {
            path: '/',
            method: 'GET',
          },
        },
      ],
    },
    createTodo: {
      handler: 'src/lambdas/createTodo.handler',
    },
    deleteTodo: {
      handler: 'src/lambdas/deleteTodo.handler',
    },
    getTodo: {
      handler: 'src/lambdas/getTodo.handler',
    },
    getTodos: {
      handler: 'src/lambdas/getTodos.handler',
    },
  },
  resources: {
    Resources: {
      TodosTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          TableName: '${self:custom.todos_table_name}',
          AttributeDefinitions: [
            {
              AttributeName: 'id',
              AttributeType: 'S',
            },
          ],
          KeySchema: [
            {
              AttributeName: 'id',
              KeyType: 'HASH',
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: '1',
            WriteCapacityUnits: '1',
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
