import { HttpResponse } from './http-reponse';

export interface HttpPostClient {
  post(params: HttpPostClient.Params): Promise<HttpResponse>;
}

export namespace HttpPostClient {
  export type Params = {
    url: string;
    body?: {};
  };
}
