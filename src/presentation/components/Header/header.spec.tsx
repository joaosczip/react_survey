import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import Header from '.';
import ThemeProvider from '@/presentation/components/ThemeProvider';
import { ApiContext } from '@/presentation/contexts/api/api-context';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  setCurrentAccountMock: (account: AccountModel) => Promise<void>;
};

const history = createMemoryHistory({ initialEntries: ['/'] });
const makeSut = (): SutTypes => {
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
    setCurrentAccountMock,
  };
};

describe('Header', () => {
  it('should calls setCurrentAccount with null', () => {
    const { setCurrentAccountMock } = makeSut();
    const logoutButton = screen.getByTestId('logout');
    fireEvent.click(logoutButton);
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null);
    expect(history.location.pathname).toBe('/login');
  });
});
