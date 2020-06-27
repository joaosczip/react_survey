import { HttpPostClient } from '../../protocols/http/http-post-client';
import { RemoteAuthentication } from './remote-authentication';

class HttpPostClientSpy implements HttpPostClient {
  url?: string;

  post(url: string): Promise<void> {
    this.url = url;
    return Promise.resolve();
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const url = 'any_url';
    const httpPostClient = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClient);
    await sut.auth();
    expect(httpPostClient.url).toBe(url);
  });
});
