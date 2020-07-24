import React from 'react';

import SurveyList from '@/presentation/pages/SurveyList';
import { makeRemoteLoadSurveyList } from '../../usecases/load-survey-list/remote-load-survey-list';

export const makeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeRemoteLoadSurveyList()} />;
};
