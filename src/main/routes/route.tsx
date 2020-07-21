import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ThemeProvider from '../../presentation/components/ThemeProvider';
import GlobalStyle from '@/main/global';
import { makeLogin } from '@/main/factories/pages/login/login-factory';
import { makeSignUp } from '@/main/factories/pages/signup/signup-factory';
import SurveyList from '../../presentation/pages/SurveyList';

const Router: React.FC = () => {
  return (
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
  );
};

export default Router;
