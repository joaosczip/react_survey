import { HttpPostClient } from '@/data/protocols/http/http-post-client';
import { Authentication } from '@/domain/usecases/authentication';
import { HttpStatusCode } from '@/data/protocols/http/http-reponse';
import { InvalidCredentialsError } from '@/domain/errors/invalid-credentials-error';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth({ email, password }: Authentication.Params): Promise<void> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: { email, password },
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        return Promise.resolve();
    }
  }
}
