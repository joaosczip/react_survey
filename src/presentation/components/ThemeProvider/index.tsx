import React from 'react';
import { ThemeProvider as Provider } from 'styled-components';

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <Provider
      theme={{
        colors: {
          white: '#FFF',
          black: '#000',
          background: '#F2F2F2',
          primary: '#880E4F',
          primaryDark: '#560027',
          prmaryLigth: '#BC477B',
          disabled: '#CCC',
          valid: '#4CAF50',
          invalid: '#EF5350',
        },
      }}
    >
      {children}
    </Provider>
  );
};

export default ThemeProvider;
