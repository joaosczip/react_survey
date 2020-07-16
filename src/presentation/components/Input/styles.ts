import styled, { css } from 'styled-components';

type ContainerProps = {
  isValid: boolean;
};

export const Container = styled.div<ContainerProps>`
  margin-top: 40px;
  position: relative;
  border-bottom: 2px dashed ${(props) => props.theme.colors.disabled};
  border-bottom-color: ${(props) => props.theme.colors.invalid};

  ${(props) =>
    props.isValid &&
    css`
      border-bottom-color: ${(props) => props.theme.colors.valid};

      &::after {
        background-color: ${(props) => props.theme.colors.valid};
      }
    `}

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: ${(props) => props.theme.colors.invalid};
    position: absolute;
    bottom: -2px;
    left: 0px;
    transform-origin: 0%;
    transform: scaleX(0);
    transition: transform 400ms ease;
  }

  &:focus-within {
    border-color: transparent;

    &::after {
      transform: scaleY(1);
    }

    label {
      transform: scale(0.9) translateY(-20px);
    }
  }

  input {
    width: 100%;
    line-height: 24px;
    padding: 0px 40px 0px 8px;
    &:not(:placeholder-shown) + label {
      transform: scale(0.9) translateY(-20px);
    }
  }

  label {
    position: absolute;
    left: 8px;
    color: ${(props) => props.theme.colors.disabled};
    cursor: text;
    transform-origin: 0%;
    transform: translateY(0);
    transition: transform 400ms ease;
  }

  span {
    position: absolute;
    right: 8px;
    font-size: 12px;
    cursor: help;
  }
`;
