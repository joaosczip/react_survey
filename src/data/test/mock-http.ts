import faker from 'faker';

import {
  HttpPostClient,
  HttpResponse,
  HttpStatusCode,
  HttpGetClient,
} from '../protocols/http/';

export const mockPostRequest = (): HttpPostClient.Params => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

export const mockGetRequest = (): HttpGetClient.Params => ({
  url: faker.internet.url(),
  headers: {
    [faker.database.column()]: faker.random.objectElement(),
  },
});

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  url?: string;
  body?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostClient.Params): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<R = any> implements HttpGetClient<R> {
  url: string;
  headers: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetClient.Params): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.headers = params.headers;
    return this.response;
  }
}
