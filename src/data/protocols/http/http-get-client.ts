import { HttpResponse } from './http-reponse';

export interface HttpGetClient<R = any> {
  get: (params: HttpGetClient.Params) => Promise<HttpResponse<R>>;
}

export namespace HttpGetClient {
  export type Params = {
    url: string;
    headers?: {
      [key: string]: string;
    };
  };
}
