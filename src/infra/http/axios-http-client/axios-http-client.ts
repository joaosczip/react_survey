import axios, { AxiosResponse } from 'axios';

import { HttpPostClient, HttpResponse } from '@/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post({
    url,
    body,
  }: HttpPostClient.Params<any>): Promise<HttpResponse<any>> {
    let httpResponse: Partial<AxiosResponse<any>>;
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
