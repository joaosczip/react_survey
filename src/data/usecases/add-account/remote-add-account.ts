import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { AddAccount } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { EmailAddressAlreadyInUseError } from '@/domain/errors';

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<
      AddAccount.Params,
      AccountModel
    >
  ) {}

  async add(params: AddAccount.Params): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (httpResponse.statusCode) {
      case HttpStatusCode.forbidden:
        throw new EmailAddressAlreadyInUseError();
      default:
        return null;
    }
  }
}
