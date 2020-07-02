import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './global';
import Login from '@/presentation/pages/Login';

ReactDOM.render(
  <ThemeProvider
    theme={{
      colors: {
        white: '#FFF',
        black: '#000',
        background: '#F2F2F2',
        primary: '#880E4F',
        primaryDark: '#560027',
        prmaryLigth: '#BC477B',
      },
    }}
  >
    <Login />
    <GlobalStyle />
  </ThemeProvider>,
  document.getElementById('main')
);
