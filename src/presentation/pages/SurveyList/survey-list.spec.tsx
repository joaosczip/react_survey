import React from 'react';
import { render, screen } from '@testing-library/react';

import SurveyList from '.';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return [];
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(
    <ThemeProvider>
      <SurveyList loadSurveyList={loadSurveyListSpy} />
    </ThemeProvider>
  );

  return { loadSurveyListSpy };
};

describe('SurveyList', () => {
  it('should 4 empty items on start', () => {
    makeSut();
    const surveyList = screen.getByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:empty').length).toBe(4);
  });
  it('should calls LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
