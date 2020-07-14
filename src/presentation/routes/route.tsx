import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ThemeProvider from '../components/ThemeProvider';
import GlobalStyle from '@/main/global';

type Factory = {
  makeLogin: React.FC;
  makeSignUp: React.FC;
};

const Router: React.FC<Factory> = (factory) => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={factory.makeLogin} />
          <Route path="/signup" exact component={factory.makeSignUp} />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default Router;
