import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    margin-top: 30px;
  }

  span {
    margin-top: 30px;
    color: ${(props) => props.theme.colors.prmaryLigth};
  }
`;
