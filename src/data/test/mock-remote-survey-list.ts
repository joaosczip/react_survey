import faker from 'faker';

import { RemoteLoadSurveyList } from '../usecases/load-survey-list/remote-load-survey-list';

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  didAnswer: faker.random.boolean(),
  date: faker.date.recent().toISOString(),
});

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => [
  mockRemoteSurveyModel(),
  mockRemoteSurveyModel(),
];
