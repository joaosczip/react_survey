import faker from 'faker';

import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import { HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';
import { SurveyModel } from '@/domain/models';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return { sut, httpGetClientSpy };
};

describe('RemoteLoadSurveyList', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = makeSut(url);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });
  it('should throw UnexpectedError if HttpGetClient returns 403', () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };

    const result = sut.loadAll();
    expect(result).rejects.toThrow(new UnexpectedError());
  });
  it('should throw UnexpectedError if HttpGetClient returns 404', () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };

    const result = sut.loadAll();
    expect(result).rejects.toThrow(new UnexpectedError());
  });
  it('should throw UnexpectedError if HttpGetClient returns 500', () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };

    const result = sut.loadAll();
    expect(result).rejects.toThrow(new UnexpectedError());
  });
});
