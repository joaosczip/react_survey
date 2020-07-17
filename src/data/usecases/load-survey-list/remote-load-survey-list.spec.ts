import faker from 'faker';

import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyList } from './remote-load-survey-list';

describe('RemoteLoadSurveyList', () => {
  it('should call HttpGetClient with correct URL', async () => {
    const httpGetClientSpy = new HttpGetClientSpy();
    const url = faker.internet.url();
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
    await sut.loadAll();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
