import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import ThemeProvider from '../components/ThemeProvider';
import GlobalStyle from '@/main/global';
import SignUp from '@/presentation/pages/SignUp';

type Props = {
  makeLogin: React.FC;
};

const Router: React.FC<Props> = ({ makeLogin }) => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact component={makeLogin} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default Router;
