import styled from 'styled-components';

export const Container = styled.li`
  height: 250px;
  width: 48%;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  margin-bottom: 24px;
  box-shadow: 0px 1px 3px -1px ${(props) => props.theme.colors.black};

  @media (max-width: 600px) {
    flex-basis: 100%;
    width: 100%;
  }
`;

export const BoxContent = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  background-repeat: no-repeat;
  background-image: linear-gradient(
      to right,
      rgba(${(props) => props.theme.colors.prmaryLigth}, 0.1),
      rgba(${(props) => props.theme.colors.prmaryLigth}, 0.1)
    ),
    linear-gradient(
      to right,
      ${(props) => props.theme.colors.white},
      ${(props) => props.theme.colors.white}
    );
  background-position: 0 0, 54 0;
  background-size: 50px 100%, 100% 100%;
  position: relative;

  time {
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.colors.prmaryLigth};
    color: ${(props) => props.theme.colors.white};
    border-radius: 8px;
    margin-left: 24px;
    align-self: center;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 100px;
    flex-shrink: 0;
  }

  p {
    font-size: 18px;
    color: ${(props) => props.theme.colors.black};
    margin: 24px;
    align-self: center;
    flex-grow: 1;
  }
`;

export const Day = styled.span`
  font-size: 40px;
  font-weight: bold;
`;

export const Month = styled.span`
  text-transform: lowercase;
  margin: 0 0 5px;
`;

export const Year = styled.span`
  font-size: 16px;
`;

export const BoxFooter = styled.footer`
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  line-height: 40px;
  text-transform: lowercase;
  text-align: center;
  cursor: pointer;
  border-radius: 0 0 8px 8px;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
`;
