import styled from 'styled-components';

export const Container = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
