import { HttpGetClient, HttpResponse } from '@/data/protocols/http';
import { GetStorage } from '@/data/protocols/cache/get-storage';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(private readonly getStorage: GetStorage) {}

  async get(params: HttpGetClient.Params): Promise<HttpResponse> {
    this.getStorage.get('account');
    return null;
  }
}
