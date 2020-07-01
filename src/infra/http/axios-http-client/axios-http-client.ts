import axios from 'axios';

import { HttpPostClient, HttpResponse } from '@/data/protocols/http';

export class AxiosHttpClient implements HttpPostClient<any, any> {
  async post({
    url,
    body,
  }: HttpPostClient.Params<any>): Promise<HttpResponse<any>> {
    const httpResponse = await axios.post(url, body);
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}
