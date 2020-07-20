import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  border-top: 40px solid ${(props) => props.theme.colors.primaryDark};

  @media (max-width: 600px) {
    border-top-width: 20px;
  }
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 800px;
  flex-grow: 1;
  padding: 24px 40px;

  img {
    width: 60px;
    align-self: center;
  }
`;

export const Logout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  align-items: flex-end;
  color: #fff;

  span {
    font-size: 16px;
    margin-bottom: 8px;
  }

  a {
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
