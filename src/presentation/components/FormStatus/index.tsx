import React, { useContext } from 'react';

import Spinner from '../Spinner';
import FormContext from '@/presentation/contexts/form/form-context';
import { Container } from './styles';

const FormStatus: React.FC = () => {
  const { state } = useContext(FormContext);

  return (
    <Container data-testid="error-container">
      {state.isLoading && <Spinner />}
      {state.mainError && (
        <span data-testid="main-error">{state.mainError}</span>
      )}
    </Container>
  );
};

export default FormStatus;
