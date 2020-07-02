import React, { useCallback } from 'react';

import { Container } from './styles';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props) => {
  const handleEnableInput = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.target.readOnly = false;
    },
    []
  );

  return (
    <Container>
      <input {...props} readOnly onFocus={handleEnableInput} />
      <span>Error</span>
    </Container>
  );
};

export default Input;
