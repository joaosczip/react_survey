import axios, { AxiosResponse } from 'axios';

import {
  HttpPostClient,
  HttpResponse,
  HttpGetClient,
} from '@/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
  async post({ url, body }: HttpPostClient.Params): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.post(url, body);
    } catch (error) {
      axiosResponse = error.response;
    }

    return this.adaptResponse(axiosResponse);
  }

  async get({ url, headers }: HttpGetClient.Params): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse;
    try {
      axiosResponse = await axios.get(url, { headers });
    } catch (error) {
      axiosResponse = error.response;
    }

    return this.adaptResponse(axiosResponse);
  }

  private adaptResponse(axiosResponse: AxiosResponse): HttpResponse {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    };
  }
}
