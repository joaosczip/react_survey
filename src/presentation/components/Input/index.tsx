import React from 'react';

import { Container } from './styles';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props) => {
  return (
    <Container>
      <input {...props} />
      <span>Error</span>
    </Container>
  );
};

export default Input;
