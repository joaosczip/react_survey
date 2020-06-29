import { HttpPostClient } from '../protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  post(params: HttpPostClient.Params): Promise<void> {
    this.url = params.url;
    return Promise.resolve();
  }
}
