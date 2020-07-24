import React from 'react';
import { render, screen } from '@testing-library/react';

import SurveyItem from '.';
import { mockSurveyModel } from '@/domain/test';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import { IconName } from '@/presentation/components/Icon';

const makeSut = (surveyModel = mockSurveyModel()): void => {
  render(
    <ThemeProvider>
      <SurveyItem survey={surveyModel} />
    </ThemeProvider>
  );
};

describe('SurveyItem', () => {
  it('should render with correct values', () => {
    const surveyModel = {
      ...mockSurveyModel(),
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00'),
    };
    makeSut(surveyModel);
    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp);
    expect(screen.getByTestId('question')).toHaveTextContent(
      surveyModel.question
    );
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('jan');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });
});
