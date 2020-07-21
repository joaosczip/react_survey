import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ThemeProvider from '../../presentation/components/ThemeProvider';
import GlobalStyle from '@/main/global';
import { ApiContext } from '@/presentation/contexts/api/api-context';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter';
import SurveyList from '../../presentation/pages/SurveyList';

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
            <Route path="/" exact component={SurveyList} />
          </Switch>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </ApiContext.Provider>
  );
};

export default Router;
