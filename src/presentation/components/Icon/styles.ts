import styled from 'styled-components';

export const Container = styled.div`
  padding: 10px;
  border-radius: 100%;
  display: flex;
  box-shadow: 0px 1px 3px -1px ${(props) => props.theme.colors.black};
`;
