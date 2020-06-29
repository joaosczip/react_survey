import { HttpPostClient } from '../../protocols/http/http-post-client';
import { Authentication } from 'domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth({ email, password }: Authentication.Params): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: { email, password },
    });
  }
}
