import { makeAuthorizeHttpGetClientDecorator } from '@/main/factories/decorators';
import { makeApiUrlFactory } from '@/main/factories/http/api-url-factory';
import { RemoteLoadSurveyList } from '@/data/usecases/load-survey-list/remote-load-survey-list';
import { LoadSurveyList } from '@/domain/usecases';

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(
    makeApiUrlFactory('/surveys'),
    makeAuthorizeHttpGetClientDecorator()
  );
};
