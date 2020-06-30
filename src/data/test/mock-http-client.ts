import { HttpPostClient } from '../protocols/http/http-post-client';
import { HttpResponse, HttpStatusCode } from '../protocols/http/http-reponse';

export class HttpPostClientSpy implements HttpPostClient {
  url?: string;
  body?: {};
  response: HttpResponse = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostClient.Params): Promise<HttpResponse> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}
