import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'code-challenge-4',
  frameworkVersion: '2',
  plugins: [
    'serverless-webpack',
    'serverless-appsync-plugin',
    'serverless-prune-plugin',
    'serverless-stack-output',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    stage: "${opt:stage, 'dev'}",
    lambdaHashingVersion: '20201221',
    memorySize: 128,
    timeout: 6,
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
      includeModules: false,
      packager: 'yarn',
    },
    prune: {
      automatic: true,
      number: 3,
    },
    output: {
      file: 'stack.json',
    },
    appSync: {
      name: '${self:service}-${self:provider.stage}-api',
      authenticationType: 'API_KEY',
      dataSources: [
        {
          type: 'AWS_LAMBDA',
          name: 'Lambda_CreateTodo',
          description: 'CreateTodo Lambda DataSource',
          config: {
            functionName: 'createTodo',
          },
        },
        {
          type: 'AWS_LAMBDA',
          name: 'Lambda_UpdateTodo',
          description: 'UpdateTodo Lambda DataSource',
          config: {
            functionName: 'updateTodo',
          },
        },
        {
          type: 'AWS_LAMBDA',
          name: 'Lambda_DeleteTodo',
          description: 'DeleteTodo Lambda DataSource',
          config: {
            functionName: 'deleteTodo',
          },
        },
        {
          type: 'AWS_LAMBDA',
          name: 'Lambda_GetTodo',
          description: 'GetTodo Lambda DataSource',
          config: {
            functionName: 'getTodo',
          },
        },
        {
          type: 'AWS_LAMBDA',
          name: 'Lambda_GetTodos',
          description: 'GetTodos Lambda DataSource',
          config: {
            functionName: 'getTodos',
          },
        },
      ],
      mappingTemplates: [
        {
          dataSource: 'Lambda_CreateTodo',
          type: 'Mutation',
          field: 'createTodo',
          request: false,
          response: false,
        },
        {
          dataSource: 'Lambda_UpdateTodo',
          type: 'Mutation',
          field: 'updateTodo',
          request: false,
          response: false,
        },
        {
          dataSource: 'Lambda_DeleteTodo',
          type: 'Mutation',
          field: 'deleteTodo',
          request: false,
          response: false,
        },
        {
          dataSource: 'Lambda_GetTodo',
          type: 'Query',
          field: 'getTodo',
          request: false,
          response: false,
        },
        {
          dataSource: 'Lambda_GetTodos',
          type: 'Query',
          field: 'getTodos',
          request: false,
          response: false,
        },
      ],
    },
  },
  package: {
    individually: true,
  },
  layers: {
    modules: {
      name: '${self:service}-${self:provider.stage}-node-modules',
      path: 'layer',
    },
  },
  functions: {
    createTodo: {
      handler: 'src/lambdas/createTodo.handler',
      layers: [
        {
          Ref: 'ModulesLambdaLayer',
        },
      ],
    },
    deleteTodo: {
      handler: 'src/lambdas/deleteTodo.handler',
      layers: [
        {
          Ref: 'ModulesLambdaLayer',
        },
      ],
    },
    getTodo: {
      handler: 'src/lambdas/getTodo.handler',
      layers: [
        {
          Ref: 'ModulesLambdaLayer',
        },
      ],
    },
    getTodos: {
      handler: 'src/lambdas/getTodos.handler',
      layers: [
        {
          Ref: 'ModulesLambdaLayer',
        },
      ],
    },
    updateTodo: {
      handler: 'src/lambdas/updateTodo.handler',
      layers: [
        {
          Ref: 'ModulesLambdaLayer',
        },
      ],
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
