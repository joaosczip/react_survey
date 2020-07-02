import React from 'react';

import Spinner from '../Spinner';
import { Container } from './styles';

const FormStatus: React.FC = () => {
  return (
    <Container>
      <Spinner />
      <span>Erro</span>
    </Container>
  );
};

export default FormStatus;
