import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.white};
  padding: 40px;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0px 1px 3px -1px ${(props) => props.theme.colors.black};

  span {
    font-size: 20px;
    margin-bottom: 24px;
  }
`;
