import axios, { AxiosResponse } from 'axios';

import { HttpPostClient, HttpResponse } from '@/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient {
  async post({ url, body }: HttpPostClient.Params): Promise<HttpResponse> {
    let httpResponse: Partial<AxiosResponse>;
    try {
      httpResponse = await axios.post(url, body);
    } catch (error) {
      httpResponse = error.response;
    }

    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
