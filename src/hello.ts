import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  const { name } = event.queryStringParameters || {};
  return {
    statusCode: 200,
    body: `Hello ${name || 'stranger'}`,
  };
};
