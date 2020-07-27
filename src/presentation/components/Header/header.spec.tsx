import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import { Router } from 'react-router-dom';

import Header from '.';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import { ApiContext } from '@/presentation/contexts/api/api-context';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  history: History;
  setCurrentAccountMock: (account: AccountModel) => Promise<void>;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  const setCurrentAccountMock = jest.fn();

  render(
    <ThemeProvider>
      <Router history={history}>
        <ApiContext.Provider
          value={{ setCurrentAccount: setCurrentAccountMock }}
        >
          <Header />
        </ApiContext.Provider>
      </Router>
    </ThemeProvider>
  );

  return {
    history,
    setCurrentAccountMock,
  };
};

describe('Header', () => {
  it('should calls setCurrentAccount with null', () => {
    const { history, setCurrentAccountMock } = makeSut();
    const logoutButton = screen.getByTestId('logout');
    fireEvent.click(logoutButton);
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null);
    expect(history.location.pathname).toBe('/login');
  });
});
