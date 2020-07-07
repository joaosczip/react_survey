import axios from 'axios';

import { AxiosHttpClient } from './axios-http-client';
import { mockAxios, mockHttpResponse } from '@/infra/test';
import { mockPostRequest } from '@/data/test';

jest.mock('axios');

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
};

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
  it('should returns the correct statusCode and body', () => {
    const { sut, mockedAxios } = makeSut();

    const response = sut.post(mockPostRequest());
    expect(response).toEqual(mockedAxios.post.mock.results[0].value);
  });
  it('should returns the correct statusCode and body on failure', () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });
    const response = sut.post(mockPostRequest());
    expect(response).toEqual(mockedAxios.post.mock.results[0].value);
  });
});
