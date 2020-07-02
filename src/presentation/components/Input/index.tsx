import React, { useCallback, useContext, useMemo } from 'react';

import { Container } from './styles';
import FormContext from '@/presentation/contexts/form/form-context';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Input: React.FC<InputProps> = (props) => {
  const { errorState } = useContext(FormContext);

  const error = useMemo(() => errorState[props.name], [errorState, props]);

  const handleEnableInput = useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      event.target.readOnly = false;
    },
    []
  );

  const getStatus = useCallback(() => {
    return 'Error';
  }, []);

  const getTitle = useCallback(() => {
    return error;
  }, []);

  return (
    <Container>
      <input {...props} readOnly onFocus={handleEnableInput} />
      <span data-testid={`${props.name}-status`} title={getTitle()}>
        {getStatus()}
      </span>
    </Container>
  );
};

export default Input;
