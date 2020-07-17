export type SurveyModel = {
  id: string;
  question: string;
  answers: SurveyAnswerModel[];
  date: string;
  didAnswer: boolean;
};

type SurveyAnswerModel = {
  image?: string;
  answer: string;
};
