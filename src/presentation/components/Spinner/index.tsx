import React from 'react';

import { Container } from './styles';

const Spinner: React.FC = () => {
  return (
    <Container data-testid="spinner">
      <div />
      <div />
      <div />
      <div />
    </Container>
  );
};

export default Spinner;
