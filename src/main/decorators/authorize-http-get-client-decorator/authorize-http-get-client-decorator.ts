import { HttpGetClient, HttpResponse } from '@/data/protocols/http';
import { GetStorage } from '@/data/protocols/cache/get-storage';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async get(params: HttpGetClient.Params): Promise<HttpResponse> {
    const account = this.getStorage.get('account');
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, {
          'x-access-token': account.accessToken,
        }),
      });
    }

    const httpResponse = await this.httpGetClient.get(params);
    return httpResponse;
  }
}
