import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      background: string;
      primary: string;
      primaryDark: string;
      prmaryLigth: string;
    };
  }
}
