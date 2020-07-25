import faker from 'faker';
import { LoadSurveyList } from '../usecases';

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  didAnswer: faker.random.boolean(),
  date: faker.date.recent(),
});

export const makeSurveyListModel = (): LoadSurveyList.Model[] => [
  mockSurveyModel(),
  mockSurveyModel(),
];
