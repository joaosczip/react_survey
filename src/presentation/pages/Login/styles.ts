import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: ${(props) => props.theme.colors.white};
  padding: 40px;
  border-radius: 8px;
  align-self: center;
  box-shadow: 0px 1px 3px -1px ${(props) => props.theme.colors.black};

  h2 {
    color: ${(props) => props.theme.colors.primaryDark};
    text-align: center;
    font-size: 20px;
    text-transform: uppercase;
  }

  > span {
    text-align: center;
    color: ${(props) => props.theme.colors.primary};
    text-transform: lowercase;
    margin-top: 16px;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
