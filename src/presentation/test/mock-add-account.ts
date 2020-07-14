import { AddAccount } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccountModel } from '@/domain/test';

export class AddAccountSpy implements AddAccount {
  account = mockAccountModel();
  params: any;
  callsCount = 0;

  async add(params: AddAccount.Params): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return this.account;
  }
}
