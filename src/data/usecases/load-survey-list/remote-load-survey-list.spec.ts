import faker from 'faker';

import { HttpGetClientSpy, mockRemoteSurveyListModel } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';
import { HttpStatusCode } from '@/data/protocols/http';
import { UnexpectedError } from '@/domain/errors';

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
};

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
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
  it('should return a list of SurveyModels if HttpGetClient returns 200', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const surveyList = mockRemoteSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: surveyList,
    };
    const result = await sut.loadAll();
    expect(result).toEqual([
      {
        id: surveyList[0].id,
        question: surveyList[0].question,
        didAnswer: surveyList[0].didAnswer,
        date: new Date(surveyList[0].date),
      },
      {
        id: surveyList[1].id,
        question: surveyList[1].question,
        didAnswer: surveyList[1].didAnswer,
        date: new Date(surveyList[1].date),
      },
    ]);
  });
  it('should return a list of SurveyModels if HttpGetClient returns 204', async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const result = await sut.loadAll();
    expect(result).toEqual([]);
  });
});
