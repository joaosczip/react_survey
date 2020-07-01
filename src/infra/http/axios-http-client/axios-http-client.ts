import axios from 'axios';

import { HttpPostClient } from '@/data/protocols/http';

export class AxiosHttpClient {
  async post(params: HttpPostClient.Params<any>): Promise<void> {
    await axios.post(params.url);
  }
}
