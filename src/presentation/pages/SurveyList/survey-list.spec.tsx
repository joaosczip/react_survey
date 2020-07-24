import React from 'react';
import { render, screen } from '@testing-library/react';

import SurveyList from '.';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';
import { makeSurveyListModel } from '@/domain/test';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = makeSurveyListModel();
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return this.surveys;
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
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });
  it('should calls LoadSurveyList', () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
  it('should render SurveyItems on success', async () => {
    makeSut();
    const surveyList = await screen.findByTestId('survey-list');
    expect(surveyList.querySelectorAll('li:not(:empty)')).toHaveLength(2);
  });
});
