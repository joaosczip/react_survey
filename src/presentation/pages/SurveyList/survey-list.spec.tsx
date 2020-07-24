import React from 'react';
import { render, screen } from '@testing-library/react';

import SurveyList from '.';
import ThemeProvider from '@/presentation/components/ThemeProvider';

const makeSut = () => {
  render(
    <ThemeProvider>
      <SurveyList />
    </ThemeProvider>
  );
};

describe('SurveyList', () => {
  it('should 4 empty items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
});
