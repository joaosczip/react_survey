import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import SurveyList from '.';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import { LoadSurveyList } from '@/domain/usecases';
import { makeSurveyListModel, mockAccountModel } from '@/domain/test';
import { UnexpectedError, AccessDeniedError } from '@/domain/errors';
import { ApiContext } from '@/presentation/contexts/api/api-context';
import { AccountModel } from '@/domain/models';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = makeSurveyListModel();
  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
  history: History;
  setCurrentAccountMock: (account: AccountModel) => Promise<void>;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const history = createMemoryHistory();
  const setCurrentAccountMock = jest.fn();
  render(
    <ThemeProvider>
      <Router history={history}>
        <ApiContext.Provider
          value={{
            setCurrentAccount: setCurrentAccountMock,
            getCurrentAccount: () => mockAccountModel(),
          }}
        >
          <SurveyList loadSurveyList={loadSurveyListSpy} />
        </ApiContext.Provider>
      </Router>
    </ThemeProvider>
  );

  return { loadSurveyListSpy, history, setCurrentAccountMock };
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
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  });
  it('should render error on UnexpectedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyListSpy);
    await waitFor(() =>
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    );
    expect(await screen.findByTestId('error')).toHaveTextContent(
      'Algo de errado aconteceu! Tente novamente.'
    );
  });
  it('should logout on AccessDeniedError', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new AccessDeniedError());
    const { history, setCurrentAccountMock } = makeSut(loadSurveyListSpy);
    await waitFor(() =>
      expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
    );
    expect(history.location.pathname).toBe('/login');
  });
  it('should calls LoadSurveyList on reload', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest
      .spyOn(loadSurveyListSpy, 'loadAll')
      .mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyListSpy);
    await waitFor(() =>
      expect(screen.queryByTestId('survey-list')).not.toBeInTheDocument()
    );
    fireEvent.click(await screen.findByTestId('reload-button'));
    await waitFor(() => expect(loadSurveyListSpy.callsCount).toBe(1));
  });
});
