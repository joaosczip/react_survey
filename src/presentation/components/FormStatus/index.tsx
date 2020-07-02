import React, { useContext } from 'react';

import Spinner from '../Spinner';
import FormContext from '@/presentation/contexts/form/form-context';
import { Container } from './styles';

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext);
  return (
    <Container data-testid="error-container">
      {isLoading && <Spinner />}
      {errorMessage && <span>{errorMessage}</span>}
    </Container>
  );
};

export default FormStatus;
