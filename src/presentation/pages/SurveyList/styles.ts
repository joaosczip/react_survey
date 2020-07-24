import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.disabled};
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  max-width: 800px;
  flex-grow: 1;
  align-items: flex-start;
  width: 100%;
  margin-top: 24px;

  @media (max-width: 600px) {
    padding: 0 24px;
  }

  h2 {
    color: ${(props) => props.theme.colors.primaryDark};
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }
`;
