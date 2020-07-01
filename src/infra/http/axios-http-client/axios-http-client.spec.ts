import axios from 'axios';
import faker from 'faker';

import { AxiosHttpClient } from './axios-http-client';
import { HttpPostClient } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostClient.Params<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  it('should call axios with correct URL and verb', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
  });
  it('should call axios with correct body', async () => {
    const sut = makeSut();
    await sut.post(mockPostRequest());
  });
});
