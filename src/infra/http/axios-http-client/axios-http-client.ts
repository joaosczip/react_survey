import axios from 'axios';

import { HttpPostClient } from '@/data/protocols/http';

export class AxiosHttpClient {
  async post({ url, body }: HttpPostClient.Params<any>): Promise<void> {
    await axios.post(url, body);
  }
}
