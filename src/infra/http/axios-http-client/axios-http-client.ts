import axios, { AxiosResponse } from 'axios';

import {
  HttpPostClient,
  HttpResponse,
  HttpGetClient,
} from '@/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post({ url, body }: HttpPostClient.Params): Promise<HttpResponse> {
    let axiosResponse: Partial<AxiosResponse>;
    try {
      axiosResponse = await axios.post(url, body);
    } catch (error) {
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }

  async get({ url }: HttpGetClient.Params): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.get(url);
    } catch (error) {
      axiosResponse = error.response;
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
