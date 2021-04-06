import { handler } from './hello';

describe('When querystring "name" equals Jack', () => {
  const event: any = {
    queryStringParameters: {
      name: 'Jack',
    },
  };
  let response;
  beforeEach(async () => {
    response = await handler(event);
  });
  it('should returns 200 as statusCode', async () => {
    expect(response.statusCode).toBe(200);
  });
  it('should returns "Hello Jack"', async () => {
    expect(response.body).toBe('Hello Jack');
  });
});

describe('When querystring "name" is an empty string', () => {
  const event: any = {
    queryStringParameters: {
      name: '',
    },
  };
  let response;
  beforeEach(async () => {
    response = await handler(event);
  });
  it('should returns 200 as statusCode', async () => {
    expect(response.statusCode).toBe(200);
  });
  it('should returns "Hello stranger"', async () => {
    expect(response.body).toBe('Hello stranger');
  });
});

describe('When querystring "name" is undefined', () => {
  const event: any = {
    queryStringParameters: {},
  };
  let response;
  beforeEach(async () => {
    response = await handler(event);
  });
  it('should returns 200 as statusCode', async () => {
    expect(response.statusCode).toBe(200);
  });
  it('should returns "Hello stranger"', async () => {
    expect(response.body).toBe('Hello stranger');
  });
});

describe('When event.queryStringParameters is undefined', () => {
  const event: any = {};
  let response;
  beforeEach(async () => {
    response = await handler(event);
  });
  it('should returns 200 as statusCode', async () => {
    expect(response.statusCode).toBe(200);
  });
  it('should returns "Hello stranger"', async () => {
    expect(response.body).toBe('Hello stranger');
  });
});
