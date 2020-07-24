import React from 'react';
import { render, screen } from '@testing-library/react';

import SurveyItem from '.';
import { mockSurveyModel } from '@/domain/test';
import { SurveyModel } from '@/domain/models';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import { IconName } from '@/presentation/components/Icon';

type SutTypes = {
  surveyModel: SurveyModel;
};

const makeSut = (): SutTypes => {
  const surveyModel = mockSurveyModel();
  surveyModel.didAnswer = true;
  surveyModel.date = new Date('2020-01-10T00:00:00');
  render(
    <ThemeProvider>
      <SurveyItem survey={surveyModel} />
    </ThemeProvider>
  );

  return {
    surveyModel,
  };
};

describe('SurveyItem', () => {
  it('should render with correct values', () => {
    const { surveyModel } = makeSut();
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(
      surveyModel.question
    );
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });
});
