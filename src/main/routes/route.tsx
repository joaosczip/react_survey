import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ThemeProvider from '../../presentation/components/ThemeProvider';
import GlobalStyle from '@/main/global';
import { ApiContext } from '@/presentation/contexts/api/api-context';
import { makeLogin, makeSignUp, makeSurveyList } from '@/main/factories/pages';
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter';
import PrivateRoute from '@/presentation/components/PrivateRoute';

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter,
        getCurrentAccount: getCurrentAccountAdapter,
      }}
    >
      <ThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={makeLogin} />
            <Route path="/signup" exact component={makeSignUp} />
            <PrivateRoute path="/" exact component={makeSurveyList} />
          </Switch>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </ApiContext.Provider>
  );
};

export default Router;
