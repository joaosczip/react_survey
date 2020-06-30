import { HttpResponse } from './http-reponse';

export interface HttpPostClient<T, R> {
  post(params: HttpPostClient.Params<T>): Promise<HttpResponse<R>>;
}

export namespace HttpPostClient {
  export type Params<T> = {
    url: string;
    body?: T;
  };
}
