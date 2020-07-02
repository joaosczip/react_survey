import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  position: relative;
  align-items: center;

  input {
    flex: 1;
  }

  span {
    position: absolute;
    right: 8px;
    font-size: 12px;
    cursor: help;
  }
`;
