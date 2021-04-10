# [code-challenge-4](https://github.com/serverless-guru/code-challenges/tree/master/code-challenge-4)
Serverless Guru - Code Challenge 4

Front demo app https://bayoudhi.github.io/code-challenge-4-front/


## Functionality "Todo App"
This serverless application will allow you to host a fully functional GraphQL API to serve a simple TODO APP with simple CRUD functionalities like fetching, creating, updating, and deleting TODO items. 
Demo of 

## Prerequisites

### Node.js and NPM

Before getting started, make sure Node.js is downloaded and installed. The latest version of Node.js can be downloaded from [nodejs.org](https://nodejs.com/en/download) and it's recommended to use the LTS version.

### Serverless Framework

Serverless Framework is used to build and deploy the application. Instructions for installing Serverless Framework can be found [here](https://serverless.com/framework/docs/getting-started/).

### Amazon Web Services (AWS)

An AWS account is required to deploy the application.

## Getting started
To build and deploy the application all of what you have to do is to run the following commands:

1. Install dependencies: `yarn install`

2. Deploy `yarn deploy:dev` or `yarn deploy:prod` 

> To deploy to a custom stage, run this command: `yarn run pre-deploy && sls deploy --stage 'stage_name'`

## CI/CD Setup
This solution uses GitHub Actions CI/CD pipeline to continuously build and deploys the serverless application to AWS
### Package.json scripts
![image](https://user-images.githubusercontent.com/3085156/114269474-35028580-99ff-11eb-9726-6eab4732660b.png)

### /scripts/pre-deploy.sh
![image](https://user-images.githubusercontent.com/3085156/114269900-4d739f80-9a01-11eb-806a-4bdf0f950208.png)

### Deploy to Dev
![image](https://user-images.githubusercontent.com/3085156/114269415-d3421b80-99fe-11eb-96d1-47afd93602b5.png)

### Deploy to Prod
![image](https://user-images.githubusercontent.com/3085156/114269458-18fee400-99ff-11eb-8473-8e95b9dbbe0c.png)


## Test
This solution is developed using the **TDD approach** and is tested using **jest** library. You can find the tests in the /src/__tests__ folder.

## Installed Serverless Framework Plugins
### [serverless-webpack](https://github.com/serverless-heaven/serverless-webpack)
### [serverless-appsync-plugin](https://github.com/sid88in/serverless-appsync-plugin)
### [serverless-prune-plugin](https://github.com/claygregory/serverless-prune-plugin)
### [serverless-stack-output](https://github.com/sbstjn/serverless-stack-output)


