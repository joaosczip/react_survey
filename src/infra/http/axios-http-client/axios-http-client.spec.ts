import axios from 'axios';
import faker from 'faker';

import { AxiosHttpClient } from './axios-http-client';
import { HttpPostClient } from '@/data/protocols/http';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosPostResponse = {
  data: faker.random.objectElement(),
  status: faker.random.number(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosPostResponse);

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostClient.Params<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe('AxiosHttpClient', () => {
  it('should call axios with correct values', async () => {
    const request = mockPostRequest();
    const sut = makeSut();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
  it('should returns the correct statusCode and body', async () => {
    const sut = makeSut();
    const response = await sut.post(mockPostRequest());
    expect(response).toEqual({
      statusCode: mockedAxiosPostResponse.status,
      body: mockedAxiosPostResponse.data,
    });
  });
});
