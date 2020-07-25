import axios from 'axios';

import { AxiosHttpClient } from './axios-http-client';
import { mockAxios, mockHttpResponse } from '@/infra/test';
import { mockPostRequest, mockGetRequest } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';

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
  describe('post', () => {
    it('should call axios.post with correct values', async () => {
      const { sut, mockedAxios } = makeSut();
      const request = mockPostRequest();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });
    it('should returns the correct response on axios.post', async () => {
      const { sut, mockedAxios } = makeSut();

      const response = await sut.post(mockPostRequest());
      const axiosResponse = await mockedAxios.post.mock.results[0].value;
      expect(response).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });
    it('should returns correct error response on axios.post', () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse(),
      });
      const response = sut.post(mockPostRequest());
      expect(response).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });
  describe('get', () => {
    it('should call axios.get with correct values', async () => {
      const { sut, mockedAxios } = makeSut();
      const request = mockGetRequest();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, {
        headers: request.headers,
      });
    });
    it('should return correct response on axios.get', async () => {
      const { sut, mockedAxios } = makeSut();

      const response = await sut.get(mockGetRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(response).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      });
    });
    it('should return correct response on axios.get', () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.get.mockRejectedValueOnce({
        response: {
          status: HttpStatusCode.badRequest,
        },
      });

      const result = sut.get(mockGetRequest());
      expect(result).toEqual(mockedAxios.get.mock.results[0].value);
    });
  });
});
