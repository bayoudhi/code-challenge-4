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
  },
  custom: {
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
  },
};

module.exports = serverlessConfiguration;
