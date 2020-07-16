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
  input[type="text"],
  input[type="email"] {
    border: none;
    outline: none;
  }

  button {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.white};
    line-height: 50px;
    border-radius: 8px;
    font-size: 16px;
    border: none;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      background-color: ${(props) => props.theme.colors.disabled};
    }
  }
`;
