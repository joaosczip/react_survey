import axios, { AxiosResponse } from 'axios';

import { HttpPostClient, HttpResponse } from '@/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient {
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
}
