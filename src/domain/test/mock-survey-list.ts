import faker, { fake } from 'faker';
import { SurveyModel } from '../models';

export const makeSurveyListModel = (): SurveyModel[] => [
  {
    id: faker.random.uuid(),
    question: faker.random.words(),
    answers: [
      {
        answer: faker.random.words(),
        image: faker.internet.url(),
      },
      {
        answer: faker.random.words(),
      },
    ],
    didAnswer: faker.random.boolean(),
    date: faker.date.recent(),
  },
  {
    id: faker.random.uuid(),
    question: faker.random.words(),
    answers: [
      {
        answer: faker.random.words(),
        image: faker.internet.url(),
      },
      {
        answer: faker.random.words(),
      },
    ],
    didAnswer: faker.random.boolean(),
    date: faker.date.recent(),
  },
];

export const mockSurveyModel = (): SurveyModel => ({
  id: faker.random.uuid(),
  question: faker.random.words(),
  answers: [
    {
      answer: faker.random.words(),
      image: faker.internet.url(),
    },
    {
      answer: faker.random.words(),
    },
  ],
  didAnswer: faker.random.boolean(),
  date: faker.date.recent(),
});
