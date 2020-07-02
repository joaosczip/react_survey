import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.colors.background};
  }

  input[type="password"],
  input[type="email"] {
    border: 1px solid ${(props) => props.theme.colors.prmaryLigth};
    line-height: 40px;
    border-radius: 4px;
    padding: 0 40px 0 8px;

    &:focus {
      outline-color: ${(props) => props.theme.colors.prmaryLigth};
    }
  }

  button {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    line-height: 60px;
    border-radius: 8px;
    font-size: 16px;
    border: none;

    &:hover {
      opacity: 0.8;
    }
  }
`;
