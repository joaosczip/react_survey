import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import PrivateRoute from '.';

type SutTypes = {
  history: MemoryHistory;
};

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <Router history={history}>
      <PrivateRoute />
    </Router>
  );

  return {
    history,
  };
};

describe('PrivateRoute', () => {
  it('should redirect to /login if token is empty', () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe('/login');
  });
});
