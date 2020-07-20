import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 40px solid ${(props) => props.theme.colors.primaryDark};
  background-color: ${(props) => props.theme.colors.primary};

  img {
    margin-top: 40px;
  }

  h1 {
    color: ${(props) => props.theme.colors.white};
    margin: 16px 0 40px;
  }

  @media (max-width: 600px) {
    border-top-width: 20px;
  }
`;
