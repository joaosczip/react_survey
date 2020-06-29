import { HttpPostClient } from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: {};

  post(params: HttpPostClient.Params): Promise<void> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve();
  }
}
