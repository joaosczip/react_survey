import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.disabled};
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.primary};
  border-top: 40px solid ${(props) => props.theme.colors.primaryDark};
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

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  max-width: 800px;
  flex-grow: 1;
  align-items: flex-start;
  width: 100%;
  margin-top: 24px;

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

    li {
      height: 250px;
      background-color: ${(props) => props.theme.colors.white};
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 8px;
      /* flex-basis: 48%; */
      margin-bottom: 24px;
      box-shadow: 0px 1px 3px -1px ${(props) => props.theme.colors.black};
    }
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
  }
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
